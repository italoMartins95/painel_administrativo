import styles from './Cadastros.module.css'

import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import {AiOutlinePlus} from 'react-icons/ai'
import {MdOutlineModeEditOutline} from 'react-icons/md'
import {BsTrash} from 'react-icons/bs'

import Message from '../layouts/Message'
import Button from '../forms/Button'
import NewCadastro from './NewCadastro'

function Cadastros(){

    const [cadastroCategoria , setCadastroCategoria] = useState(true)
    const [categorias , setCategorias] = useState()
    const [usuarios , setUsuarios] = useState()

    const [mensagem , setMensagem] = useState({})
    const [telaCadastro , setTelaCadastro] = useState(false)

    const location = useLocation()

    useEffect(() => {
        fetch(`http://localhost:3001/categorias`)
        .then(response => response.json())
        .then(data => setCategorias(data))

        fetch(`http://localhost:3001/usuarios`)
        .then(response => response.json())
        .then(data => setUsuarios(data))
    } , [telaCadastro])

    useEffect(() => {
        setTelaCadastro(false)
        setMensagem({...mensagem, tipo: 'sucess' , msg: location.state})
    } , [location])

    function actionCategorys(id , action){

        const operation = {id: id , action: action}
        setMensagem({})

        if(action == 'trash'){
                fetch(`http://localhost:3001/categorias` , {
                    method: 'DELETE',
                    headers:{
                        'Content-type':'application/json'
                    },
                    body: JSON.stringify(operation)
                }).then(response => response.json())
                .then((data) => {
                    if(data.msg == 'Operation successfull'){
                        setMensagem({...mensagem, tipo: 'sucess', msg: 'Categoria excluída com sucesso!'})
                        setCategorias(categorias.filter(categoria => categoria.idCategory != id))
                    }else if(data.erro.errno == 1451){
                        setMensagem({...mensagem, tipo: 'error', msg: 'Não foi possível excluir a categoria pois ela está em uso!'})
                    }
              })
        }
    }

    function actionUsuarios(id , action){

        const operation = {id: id , action: action}
        setMensagem({})

        if(action == 'trash'){
                fetch(`http://localhost:3001/usuarios` , {
                    method: 'DELETE',
                    headers:{
                        'Content-type':'application/json'
                    },
                    body: JSON.stringify(operation)
                }).then(response => response.json())
                .then((data) => {
                    if(data.msg == 'Operation successfull'){
                        setMensagem({...mensagem, tipo: 'sucess', msg: 'Usuário excluído com sucesso!'})
                        setUsuarios(usuarios.filter(usuarios => usuarios.idUsers != id))
                    }else{
                        console.log(data)
                    }
              })
        }
    }

    return(
        <section className={styles.cadastros}>
            {mensagem && <Message type={mensagem.tipo} msg={mensagem.msg}/>}
            <h1>Cadastros</h1>
           <ul>
               <li onClick={(e) => {setCadastroCategoria(true)
                                    setTelaCadastro(false)
                                    }}>categorias</li>
               <li onClick={(e) => {setCadastroCategoria(false) 
                                    setTelaCadastro(false)}}>usuários</li>
               <li>
                   entrada material
               </li>
           </ul>
           <div className={styles.contentCadastros}>
            {
                cadastroCategoria ? 
                    <> 
                        <div>
                            <h3>Categorias</h3>
                            <Button txtButon={telaCadastro ? 'voltar' : 'cadastrar nova'} 
                                    handleSubmit={(e) => setTelaCadastro(!telaCadastro)}>
                            </Button>
                        </div>
                        {
                            telaCadastro ? 
                                <NewCadastro itens={['Nome']}
                                             tipo='categoria'
                                /> 
                            :
                            <table>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Categoria</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        categorias &&
                                        categorias.map( (el , index) => 
                                                <tr key={index}>
                                                    <td>{el.idCategory}</td>
                                                    <td>{el.nameCategody}</td>
                                                    <td>
                                                        <MdOutlineModeEditOutline />
                                                        <BsTrash onClick={(e) => {actionCategorys(el.idCategory , 'trash')}}/>
                                                    </td>
                                                </tr>
                                        )
                                    }
                                </tbody>
                            </table> 
                        }
                    </> : 
                    <>
                        <div>
                            <h3>Usuários</h3>
                            <Button txtButon={telaCadastro ? 'voltar' : 'cadastrar novo'}
                                    handleSubmit={(e) => setTelaCadastro(!telaCadastro)}>
                            </Button>
                        </div>    
                        {
                            telaCadastro ? 
                                <NewCadastro itens={['Nome' , 'Email' , 'Senha' , 'Tipo']}
                                             tipo='usuarios'            
                                /> 
                            :
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Nome</th>
                                            <th>Email</th>
                                            <th>Senha</th>
                                            <th>Tipo</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            usuarios.length > 0 &&
                                            usuarios.map( (el , index) => 
                                                    <tr key={index}>
                                                        <td>{el.idUsers}</td>
                                                        <td>{el.name}</td>
                                                        <td>{el.email}</td>
                                                        <td>*****</td>
                                                        <td>{el.type}</td>
                                                        <td>
                                                            <MdOutlineModeEditOutline />
                                                            <BsTrash onClick={(e) => {actionUsuarios(el.idUsers , 'trash')}}/>
                                                        </td>
                                                    </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                        }                    
                    </>
            }
           </div>
        </section>
    )
}

export default Cadastros