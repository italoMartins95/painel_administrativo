import styles from './ShoppingCart.module.css'

import { ContextSales } from '../contexts/ContextSales'
import { useState , useEffect , useContext } from 'react'

import { BsArrowLeftShort } from 'react-icons/bs'
import { FaOpencart } from 'react-icons/fa'
import { BsTrash } from 'react-icons/bs'

import Input from '../forms/Input'
import Button from '../forms/Button'

function ShoppingCart({continuar}){

    const [render , setRender] = useState(false)

    const [inputProduto , setInputProduto] = useState({})
    const [itens , setItens] = useState()
    const [itensShow, setItensShow] = useState(false)

    const {addItemInCart , shoppingCart , setShoppingCart , removeItemCart} = useContext(ContextSales)

    useEffect(() => {
        fetch(`http://localhost:3001/produtos`)
        .then(response => response.json())
        .then(data => setItens(data))

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

    return(
        <section className={styles.carrinho}>
            <div className={`${styles.btnCart} ${itensShow == false ? null : styles.openCart}`}>
                {
                    !itensShow && <span className={styles.qtdItens}>{shoppingCart.itens.length}</span>
                }
                {
                    itensShow ? <BsArrowLeftShort onClick={() => setItensShow(!itensShow)}/> : <FaOpencart onClick={() => setItensShow(!itensShow)}/>
                }  
                {
                    itensShow &&
                    <div>
                        {
                            shoppingCart.itens &&
                                shoppingCart.itens.map( (item , index) =>                                     
                                        <span key={index}>{item.nameProduct} - {item.model} <BsTrash onClick={() => { removeItemCart(item)
                                            setRender(!render)
                                        }}/> </span>
                                )
                        }
                        <Button txtButon='Continuar' handleSubmit={continuar}/>
                    </div>
                }
            </div>
            <h2>Adicione produtos no Carrinho: </h2>
            <div className={styles.buscarProduto}>
                <Input handlePlaceholder='bucar produto' handleOnChange={(e) => {
                       setInputProduto({...inputProduto, produto: e.target.value})
                       buscarProduto()
                }}/>
            </div>
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
    )
}

export default ShoppingCart