import styles from './NewCadastro.module.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../forms/Button'
import Input from '../forms/Input'

function NewCadastro({itens , tipo}){
    
    const [cadastro , setCadastro] = useState({})
    
    const navigate = useNavigate()

    function submitForm(e){
        e.preventDefault()

        if(tipo == 'categoria'){
            fetch(`http://localhost:3001/categorias` , {
                method: 'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body: JSON.stringify(cadastro)
            }).then(response => response.json())
              .then(data => console.log(data))
            
            navigate('/cadastros' , {state: 'Categoria cadastrada com sucesso!'})
        }else{
            fetch(`http://localhost:3001/usuarios` , {
                method: 'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body: JSON.stringify(cadastro)
            }).then(response => response.json())
              .then(data => {
                  if(data.msg != 'Operation successfull' && data.erro.errno == 1265){
                    window.alert('Preencha o tipo com COMUM ou ADMINISTRADOR!')
                    console.log(data)
                  }else if(data.msg != 'Operation successfull'){
                    window.alert('Certifique-se de que os dados foram preenchidos corretamente!')
                    console.log(data)
                  }else{
                    navigate('/cadastros' , {state: 'Usuário cadastrado com sucesso!'})
                  }
              })
        }
    }

   return(    
        <form className={styles.newCadastros} onSubmit={submitForm}>
            {
                itens &&
                    itens.map((item , index) => {
                        return(
                            <div key={index}>
                                <Input handlePlaceholder={item}
                                       type={item == 'Senha' ? 'password' : 'text'}
                                       handleOnChange={(e) => setCadastro({...cadastro, [e.target.placeholder]: e.target.value})}/>
                            </div>
                        )
                    }) 
            }
            <Button txtButon='Cadastrar'/>
        </form>
   )
}

export default NewCadastro