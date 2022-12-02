import styles from './Products.module.css'

import {useState , useEffect} from 'react'
import {Link , useLocation} from 'react-router-dom'

import {AiOutlinePlus} from 'react-icons/ai'
import {MdOutlineModeEditOutline} from 'react-icons/md'
import {BsTrash} from 'react-icons/bs'

import Button from '../forms/Button'
import Message from '../layouts/Message'

function Products(){

    const [products , setProducts] = useState()
    const [mensagem , setMensagem] = useState({})

    const location = useLocation()

    useEffect(() => {
        setMensagem({...mensagem, tipo: 'sucess', msg: location.state})
    } , [location])

    useEffect(() => {
        fetch(`http://localhost:3001/produtos`)
        .then(response => response.json())
        .then(data => setProducts(data))
    } , [])

    function actionProduct(id , action){
        const operation = {id: id , action: action}

        if(action == 'trash'){
            fetch(`http://localhost:3001/produtos` , {
                method: 'DELETE',
                headers:{
                    'Content-type':'application/json'
                },
                body: JSON.stringify(operation)
            }).then(response => response.json())
              .then(() => {
                  setProducts(products.filter(product => product.idProduct != id))
                  setMensagem({...mensagem, tipo: 'sucess' , msg: 'Produto deletado com sucesso'})
              })
        }        
    }

    return(
        <section className={styles.products}>
            {mensagem && <Message type={mensagem.tipo} msg={mensagem.msg}/>}
            <div className={styles.productsTop}>
                <h1>Produtos</h1>
                <Link to='/cadastro-produto' className={styles.link}>
                    <Button txtButon='novo'>
                        <AiOutlinePlus />
                    </Button>
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
                        products &&
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
                            )
                    }
                </tbody>
            </table>
        </section>
    )
}

export default Products