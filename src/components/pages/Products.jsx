import styles from './Products.module.css'

import { ContextProducts } from '../contexts/ContextProducts'
import { useEffect , useContext } from 'react'
import { Link , useLocation } from 'react-router-dom'

import { MdOutlineModeEditOutline } from 'react-icons/md'
import { BsTrash } from 'react-icons/bs'

import Button from '../forms/Button'
import Message from '../layouts/Message'

function Products(){

    const {products , setProducts , actionProduct , mensagem , setMensagem} = useContext(ContextProducts)
    const location = useLocation()

    useEffect(() => {
        setMensagem({...mensagem, tipo: 'sucess', msg: location.state})
    } , [location])

    useEffect(() => {
        fetch(`http://localhost:3001/produtos`)
        .then(response => response.json())
        .then(data => setProducts(data))
    } , [])

    return(
        <section className={styles.products}>
            {mensagem && <Message type={mensagem.tipo} msg={mensagem.msg}/>}
            <div className={styles.productsTop}>
                <h1>Produtos</h1>
                <Link to='/cadastro-produto' className={styles.link}>
                    <Button txtButon='novo produto' />
                </Link>
            </div>
            <table className={styles.tableProducts}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Preço</th>
                        <th>Qtd. estoque</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products ?
                            products.map( (el , index) => 
                                <tr key={index}>
                                    <td>{el.idProduct}</td>
                                    <td>{el.nameProduct}</td>
                                    <td>{el.brand}</td>
                                    <td>{el.model}</td>
                                    <td>{Number(el.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                    <td>{`${el.inventory} unidades`}</td>
                                    <td>
                                        <MdOutlineModeEditOutline />
                                        <BsTrash onClick={(e) => actionProduct(el.idProduct , 'trash')}/>
                                    </td>
                                </tr>
                            ) :
                            <>
                                Sem conexão com o servidor...
                            </>
                    }
                </tbody>
            </table>
        </section>
    )
}

export default Products