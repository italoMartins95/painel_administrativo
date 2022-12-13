import styles from './Clients.module.css'

import { ContextClients } from '../contexts/ContextClients'
import { useEffect, useContext } from 'react'
import { Link , useLocation } from 'react-router-dom'

import { MdOutlineModeEditOutline } from 'react-icons/md'
import { BsTrash } from 'react-icons/bs'

import Button from '../forms/Button'
import Message from '../layouts/Message'

function Clients(){

    const {clients , setClients , actionClient , mensagem , setMensagem} = useContext(ContextClients)

    const location = useLocation()
    
    useEffect(() => {
        setMensagem({...mensagem, tipo: 'sucess' , msg: location.state})
    } , [location])

    useEffect(() => {
        fetch(`http://localhost:3001/clientes`)
        .then(response => response.json())
        .then(data => setClients(data))
    } , [])

    return(
        <section className={styles.clients}> 
            {mensagem && <Message type={mensagem.tipo} msg={mensagem.msg}/>}
            <div className={styles.clientsTop}>
                <h1>Clientes</h1>
                <Link to='/cadastro-cliente' className={styles.link}>
                    <Button txtButon='novo cliente' />
                </Link>
            </div>
            <table className={styles.tableClientes}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Cpf/Cnpj</th>
                        <th>Telefone</th>
                        <th>Email</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        clients &&
                        clients.map( (el , index) => 
                                <tr key={index}>
                                    <td>{el.idClient}</td>
                                    <td>{el.name}</td>
                                    <td>{el.cpf_cnpj}</td>
                                    <td>{el.phone}</td>
                                    <td>{el.email}</td>
                                    <td>
                                        <MdOutlineModeEditOutline />
                                        <BsTrash onClick={(e) => actionClient(el.idClient , 'trash')}/>
                                    </td>
                                </tr>
                            )
                    }
                </tbody>
            </table>
        </section>
    )
}

export default Clients