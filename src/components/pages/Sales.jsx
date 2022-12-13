import styles from './Sales.module.css'

import { ContextSales } from '../contexts/ContextSales'
import { useState , useEffect, useContext } from 'react'
import { Link , useLocation } from 'react-router-dom'

import Button from '../forms/Button'
import Message from '../layouts/Message'

function Sales(){

    const {mensagem , setMensagem} = useContext(ContextSales)
    const location = useLocation()

    useEffect(() => {
        setMensagem({...mensagem, tipo: 'sucess' , msg: location.state})
    } , [location])

    return(
        <section className={styles.vendas}>
            {mensagem && <Message type={mensagem.tipo} msg={mensagem.msg}/>}
            <div className={styles.vendasTop}>
                <h1>Vendas</h1>
                <Link to='shoppingCart' className={styles.link}>
                    <Button txtButon='Nova venda' />
                </Link>
            </div>  
            <div>
                <table>
                    <thead>
                        <tr>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            
                        </tr>
                    </tbody>
                </table>
            </div>          
        </section>
    )
}

export default Sales