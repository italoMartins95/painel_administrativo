import styles from './SalesClient.module.css'

import { ContextSales } from '../contexts/ContextSales'
import { useState , useEffect , useContext } from 'react'

import { FaOpencart } from 'react-icons/fa'
import { VscDebugStepBack } from 'react-icons/vsc'

import Input from '../forms/Input'

function SalesClient({voltar , render}){

    const {shoppingCart , addClienteInSale} = useContext(ContextSales)
    const [inputClient , setInputClient] = useState({})
    const [client , setClient] = useState()

    useEffect(() => {
        fetch(`http://localhost:3001/clientes`)
        .then(response => response.json())
        .then(data => setClient(data))
    } , [])

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

    return(
        <section className={styles.vendaClient}>
                <div className={styles.voltarCarrinho} onClick={voltar}>
                    <span className={styles.qtdItens}>{shoppingCart.itens.length}</span>
                    <VscDebugStepBack />
                </div>
                <h2>Selecione o cliente da venda:</h2>
                <Input handlePlaceholder='Buscar Clientes' handleOnChange={(e) => {
                        setInputClient({...inputClient, cliente: e.target.value})
                        buscarCliente()}}                           
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
                                            render()
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
    )
}

export default SalesClient