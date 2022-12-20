import styles from './Sales.module.css'

import { ContextSales } from '../contexts/ContextSales'
import { useState , useEffect, useContext } from 'react'
import { Link , useLocation } from 'react-router-dom'

import Button from '../forms/Button'
import Message from '../layouts/Message'

function Sales(){

    const [vendas , setVendas] = useState()

    const {mensagem , setMensagem} = useContext(ContextSales)
    const location = useLocation()

    useEffect(() => {
        setMensagem({...mensagem, tipo: 'sucess' , msg: location.state})

        fetch('http://localhost:3001/venda')
        .then(response => response.json())
        .then(data => setVendas(data))
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
            <table className={styles.tabelaVendas}>
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Forma de pagamento</th>
                        <th>Cliente</th>
                        <th>Valor</th>
                        <th>Itens</th>
                    </tr>
                </thead>
                <tbody>
                {
                    vendas ?
                    vendas.map((venda , index) => 
                        <tr key={index}>
                            <td>{venda.date}</td>
                            <td>{venda.paymentForm}</td>
                            <td>{venda.name}</td>
                            <td>{venda.price}</td>
                            <td>itens</td>
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

export default Sales