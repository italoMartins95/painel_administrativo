import styles from './NewClients.module.css'

import { useContext } from 'react'
import { ContextClients } from '../contexts/ContextClients'
import { Link } from 'react-router-dom'

import Input from '../forms/Input'
import Button from '../forms/Button'

function NewClients(){

    const {newClient , setNewClient , submitNewClient} = useContext(ContextClients)  

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
                    <h2>Endere??o</h2>  
                    <div>
                        <label>Cep: </label>
                        <Input type='number'
                               handlePlaceholder='digite seu cep para buscar o endere??o' 
                               handleOnChange={(e) => {buscarCep(e.target.value)}}
                        />
                    </div>
                    <div>
                        <label>Rua: </label>
                        <Input handlePlaceholder='nome da rua com n??mero'
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