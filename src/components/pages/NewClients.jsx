import styles from './NewClients.module.css'

import {useState , useEffect} from 'react'
import { Link , useNavigate } from 'react-router-dom'

import Input from '../forms/Input'
import Button from '../forms/Button'

function NewClients(){

    const [newClient , setNewClient] = useState({})

    const navigate = useNavigate()

    function submitNewClient(e){
        e.preventDefault()

        fetch(`http://localhost:3001/clientes` , {
            method: 'POST',
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify(newClient)
        }).then(response => response.json())
            .then(data => {
              if(data.result == 'Ops, ocorreu um ERRO'){
                  window.alert(data.msg)
              }else if(data.result == 'Operation successfull'){
                navigate('/clientes' , {state: 'Cliente cadastrado com sucesso!'})
              }else{
                  console.log(data)
            }
    })
    
    }

    function buscarCep(cep){  
        if(cep.length == 8){
            fetch(`http://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then((data) => setNewClient({...newClient, street: data.logradouro, 
                                                        destrict: data.bairro,
                                                        city: data.localidade,
                                                        state: data.uf,
                                                        cep: data.cep
            })
        )}
    }

    return(
        <form className={styles.newClients} onSubmit={submitNewClient}>
            <section className={styles.topForm}>
                <div>
                    <h1>Cadastrar novo cliente</h1>
                    <div>
                        <label>Nome: </label>
                        <Input handlePlaceholder='nome do cliente'
                               handleOnChange={(e) => {setNewClient({... newClient, name: e.target.value})}}
                        />
                    </div> 
                    <div>
                        <label>CPF/CNPJ: </label>
                        <Input handlePlaceholder='CPF ou  CNPJ'
                               handleOnChange={(e) => {setNewClient({... newClient, cpf_cnpj: e.target.value})}}
                        />
                    </div>
                </div> 
                <div>
                    <div>
                        <label>Telefone: </label>
                        <Input handlePlaceholder='Telefone para contato'
                               handleOnChange={(e) => {setNewClient({...newClient, phone: e.target.value})}}
                        />
                    </div>
                    <div>
                        <label>E-mail: </label>
                        <Input handlePlaceholder='e-mail'
                               type='email'
                               handleOnChange={(e) => {setNewClient({...newClient, email: e.target.value})}}
                        />
                    </div>
                </div>     
            </section>
            <section className={styles.bottomForm}>  
                <div>
                    <h2>Endereço</h2>  
                    <div>
                        <label>Cep: </label>
                        <Input type='number'
                               handlePlaceholder='digite seu cep para buscar o endereço' 
                               handleOnChange={(e) => {buscarCep(e.target.value)}}
                        />
                    </div>
                    <div>
                        <label>Rua: </label>
                        <Input handlePlaceholder='nome da rua com número'
                                type='text'
                                handleOnChange={(e) => {setNewClient({...newClient, street: e.target.value})}}
                                value={newClient.street ? newClient.street : '' }
                        />
                    </div>
                    <div>
                        <label>Bairro: </label>
                        <Input handlePlaceholder='nome do bairro'
                               type='text'
                               handleOnChange={(e) => {setNewClient({...newClient, destrict: e.target.value})}}
                               value={newClient.destrict ? newClient.destrict : '' }
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <label>Cidade: </label>
                        <Input handlePlaceholder='nome da cidade'
                                type='text'
                                handleOnChange={(e) => {setNewClient({...newClient, city: e.target.value})}}
                                value={newClient.city ? newClient.city : '' }
                        />
                    </div>
                    <div>
                        <label>Estado: </label>
                        <Input handlePlaceholder='nome da cidade'
                                type='text'
                                handleOnChange={(e) => {setNewClient({...newClient, state: e.target.value})}}
                                value={newClient.state ? newClient.state: '' }
                        />
                    </div>
                </div>        
            </section> 
            <section className={styles.formButtons}>
                <Link to='/clientes' className={styles.link}>
                    <Button txtButon='voltar' />
                </Link>
                <Button txtButon='concluir'/>
            </section>
        </form>
    )
}

export default NewClients