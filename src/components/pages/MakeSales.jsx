import styles from './MakeSales.module.css'

import { ContextSales } from '../contexts/ContextSales'
import { useState , useEffect , useContext } from 'react'
import { Link , useNavigate} from 'react-router-dom'

import { BsArrowLeftShort } from 'react-icons/bs'
import { VscDebugStepBack } from 'react-icons/vsc'
import { FaOpencart } from 'react-icons/fa'
import { BsTrash } from 'react-icons/bs'

import Input from '../forms/Input'
import Button from '../forms/Button'
import RevisaoSales from './RevisaoSales'

function MakeSales(){

    const [render , setRender] = useState(false)

    const [client , setClient] = useState()

    const [inputProduto , setInputProduto] = useState({})
    const [inputClient , setInputClient] = useState({})

    const [itens , setItens] = useState()
    const [itensShow, setItensShow] = useState(false)
    const [stepsSales , setStepsSales] = useState('stepOne')

    const {shoppingCart , setShoppingCart , addItemInCart , addClienteInSale , removeItemCart , cleanSale} = useContext(ContextSales)

    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:3001/produtos`)
        .then(response => response.json())
        .then(data => setItens(data))

        fetch(`http://localhost:3001/clientes`)
        .then(response => response.json())
        .then(data => setClient(data))

        const getLocalStorage = localStorage.getItem('shoppingCart')

        if(getLocalStorage){
            setShoppingCart(JSON.parse(getLocalStorage))
        }
    } , [])

    function buscarProduto(){
        fetch('http://localhost:3001/buscarProdutos' , {
            method: 'POST',
            headers:{
                'Content-type':'application/json'
            } ,
            body: JSON.stringify(inputProduto)
        }).then(response => response.json())
          .then(data => {
              if(data.length > 0){
                setItens(data)
              }else if(data.msg == 'O produto não foi encontrado'){
                setItens(null)
              }
            })
    }

    function buscarCliente(){
        fetch('http://localhost:3001/buscarCliente' , {
            method: 'POST',
            headers:{
                'Content-type':'application/json'
            } ,
            body: JSON.stringify(inputClient)
        }).then(response => response.json())
          .then(data => {
                if(data.length > 0){
                    setClient(data)
                }else if(data.msg == 'O cliente não foi encontrado'){
                    setClient(null)
                }
            })
    }

    function revisao(){
        if(shoppingCart.itens.length == 0){
            window.alert('Adicione itens no carrinho para continuar!')
        }else{
            setStepsSales('stepThree')
        }
    }

    return(
        <section className={styles.carrinho}>
            <table className={styles.tableCarrinho}>
                <thead>
                    <tr>
                        <th className={stepsSales == 'stepOne' ? styles.stepOne : null}>Escolha o cliente</th>
                        <th className={stepsSales == 'stepTwo' ? styles.stepTwo : null}>Adicione produtos no carrinho</th>
                        <th className={stepsSales == 'stepThree' ? styles.stepThree : null}>Revisão e complementos</th>
                        <th>
                            <Link className={styles.voltarVendas} to='/vendas'>
                                <Button txtButon='Voltar' />
                            </Link>
                        </th>
                    </tr>
                </thead>
            </table>
            {
                stepsSales == 'stepOne' ?
                    <section className={styles.vendaClient}>
                        <Input handlePlaceholder='Buscar Clientes' 
                               handleOnChange={(e) => {
                                    setInputClient({...inputClient, cliente: e.target.value})
                                    buscarCliente()
                               }}                           
                        />
                        {
                            client &&
                            <table className={styles.tableClientes}>
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>CPF/CNPJ</th>
                                        <th>Telefone</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        client.map((item , index) => 
                                            <tr onClick={() => {
                                                addClienteInSale(item)
                                                setStepsSales('stepTwo')
                                            }} 
                                            key={index}>
                                                <td>{item.name}</td>
                                                <td>{item.cpf_cnpj}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.email}</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        }
                    </section>
                : stepsSales == 'stepTwo' ?
                    <section className={styles.addItens}>
                        <div className={`${styles.btnCart} ${itensShow == false ? null : styles.openCart}`}>
                            {!itensShow && <span>{shoppingCart.itens.length}</span>}
                            {itensShow ? <BsArrowLeftShort onClick={() => setItensShow(!itensShow)}/> : <FaOpencart onClick={() => setItensShow(!itensShow)}/>}  
                            {
                                itensShow &&
                                <div>
                                    {
                                        shoppingCart.itens &&
                                            shoppingCart.itens.map( (item , index) =>                                     
                                                    <span key={index}>
                                                        {item.nameProduct} - {item.model} <BsTrash onClick={() =>           {removeItemCart(item)
                                                        setRender(!render)}}/> 
                                                    </span>
                                            )
                                    }
                                        <Button txtButon='Continuar' handleSubmit={() => setStepsSales('stepThree')}/>
                                </div>
                            }
                        </div>
                        <VscDebugStepBack className={styles.backClient} onClick={() => {
                            setStepsSales('stepOne')
                            cleanSale()
                        }}/>
                        <Input handlePlaceholder='bucar produto' 
                                   handleOnChange={(e) => {
                                        setInputProduto({...inputProduto, produto: e.target.value})
                                        buscarProduto()}}
                            />
                        {
                            itens &&
                                <table className={styles.tableItens}>
                                    <thead>
                                        <tr>
                                            <th>Nome</th>
                                            <th>Marca</th>
                                            <th>Modelo</th>
                                            <th>Preço</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            itens.map((item , index) => 
                                                <tr onClick={() => {
                                                                    addItemInCart(item)
                                                                    setRender(!render)
                                                                }} 
                                                    key={index}
                                                >
                                                    <td>{item.nameProduct}</td>
                                                    <td>{item.brand}</td>
                                                    <td>{item.model}</td>
                                                    <td>{Number(item.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                        }
                    </section>
                    : 
                    <RevisaoSales />
            }        
        </section>
    )
}

export default MakeSales