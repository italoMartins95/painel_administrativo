import styles from './Sales.module.css'

import { ContextSales } from '../contexts/ContextSales'
import { useContext , useState , useEffect} from 'react'

import ShoppingCart from './ShoppingCart'
import SalesClient from './SalesClient'
import Button from '../forms/Button'

function Sales(){

    const [modificarVenda , setModificarVenda] = useState(true)

    const [closeCart , setCloseCart] = useState(false)
    const {shoppingCart} = useContext(ContextSales)

    function openCloseCart(){
        if(shoppingCart.itens.length == 0){
            window.alert('Adicione itens no carrinho para continuar!')
        }else{
            setCloseCart(!closeCart)
        }
    }

    return(
        <section className={styles.vendas}>
            <h1>Vendas</h1>
            {
               modificarVenda == true ?
                    
                    !closeCart ? <ShoppingCart continuar={openCloseCart}/> : <SalesClient voltar={openCloseCart} render={() => setModificarVenda(false)}/>     
                
                :

                <div className={styles.revisaoPedido}>
                    <h2>Revizão Cliente</h2>
                    <div className={styles.caixaDadosCliente}>
                        <div className={styles.nameCliente}>
                            <span>Nome Cliente</span>
                            {shoppingCart.cliente.name}
                        </div>
                        <div className={styles.cpfCliente}>
                            <span>CPF/CNPJ</span>
                            {shoppingCart.cliente.cpf_cnpj}
                        </div>
                    </div>
                    <div className={styles.caixaDadosCliente}>
                        <div className={styles.telefoneCliente}>
                            <span>Telefone</span>
                            {shoppingCart.cliente.phone}
                        </div>
                        <div className={styles.emailCliente}>
                            <span>Email</span>
                            {shoppingCart.cliente.email}
                        </div>
                    </div>
                    <div className={styles.revisaoProdutos}>
                        <h2>Revisão Produtos</h2>
                        {
                            shoppingCart.itens.map((item , index) => 
                                <p key={index}>
                                    <span>
                                        {`${index+1} - ${item.nameProduct} ${item.brand} ${item.model}`}
                                    </span> 
                                    <span>
                                        {Number(item.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </span>
                                </p>
                            )
                        }
                        <p className={styles.somaItens}>
                            <span>
                                Total:
                            </span>
                            {Number(shoppingCart.somaItens).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </p>
                    </div>
                    <div className={styles.buttons}>
                        <Button txtButon='Alterar'
                                handleSubmit={() => {setModificarVenda(!modificarVenda)
                                                     openCloseCart()}}
                        />
                        <Button txtButon='Finalizar venda'
                                handleSubmit={() => console.log(shoppingCart)}
                        />
                    </div>
                </div>
            }
        </section>
    )
}

export default Sales