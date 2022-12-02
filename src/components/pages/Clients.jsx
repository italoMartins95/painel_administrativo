import styles from './Clients.module.css'

import {useState , useEffect} from 'react'
import {Link , useLocation} from 'react-router-dom'

import {AiOutlinePlus} from 'react-icons/ai'
import {MdOutlineModeEditOutline} from 'react-icons/md'
import {BsTrash} from 'react-icons/bs'

import Button from '../forms/Button'
import Message from '../layouts/Message'

function Clients(){

    const [clients , setClients] = useState()
    const [mensagem , setMensagem] = useState({})

    const location = useLocation()
    
    useEffect(() => {
        setMensagem({...mensagem, tipo: 'sucess' , msg: location.state})
    } , [location])

    useEffect(() => {
        fetch(`http://localhost:3001/clientes`)
        .then(response => response.json())
        .then(data => setClients(data))
    } , [])

    function actionClient(id , action){
        const operation = {id: id , action: action}
        setMensagem({})

        if(action == 'trash'){
            fetch(`http://localhost:3001/clientes` , {
                method: 'DELETE',
                headers:{
                    'Content-type':'application/json'
                },
                body: JSON.stringify(operation)
            }).then(response => response.json())
              .then((data) => {
                    setClients(clients.filter(clients => clients.idClient != id))
                    setMensagem({...mensagem, tipo: 'sucess' , msg: 'Cliente deletado com sucesso'})
              })
        }
    }

    return(
        <section className={styles.clients}> 
            {mensagem && <Message type={mensagem.tipo} msg={mensagem.msg}/>}
            <div className={styles.clientsTop}>
                <h1>Clientes</h1>
                <Link to='/cadastro-cliente' className={styles.link}>
                    <Button txtButon='novo'>
                        <AiOutlinePlus />
                    </Button>
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