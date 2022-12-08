import styles from './Loggin.module.css'

import Input from '../forms/Input'
import Button from '../forms/Button'

import { useState , useEffect , useContext } from 'react'
import { ContextLoggin } from '../contexts/ContextLoggin'

function Loggin(){

    const [userLoggin , setUserLoggin] = useState({})
    const {loggin} = useContext(ContextLoggin)

    useEffect(() => {
        const getLocalStorage = localStorage.getItem('user')

        if(getLocalStorage){
            setUserLoggin(JSON.parse(getLocalStorage))
            loggin(userLoggin)
        }
    } , [])

    function submitLoggin(){
        fetch('http://localhost:3001/loggin' , {
            method: 'POST',
            headers:{
                'Content-type':'application/json'
            } ,
            body: JSON.stringify(userLoggin)
        }).then(response => response.json())
          .then(data => {
                    if(data.msg == 'Usuário não encontrado!'){
                        window.alert(data.msg)
                    }else{
                            loggin(userLoggin)
                    }            
            })
    }

    return(
        <div className={styles.loggin}>
            <h1>Loggin</h1>
            <div>
                <label>Email</label>
                <Input handlePlaceholder='your email'
                       handleOnChange={(e) => {setUserLoggin({...userLoggin, email: e.target.value})}}
                       type='email'
                />
            </div>
            <div>
                <label>Senha</label>
                <Input handlePlaceholder='your password'
                       handleOnChange={(e) => {setUserLoggin({...userLoggin, password: e.target.value})}}
                       type='password'
                />
            </div>
            <Button txtButon='Sing in'
                    handleSubmit={submitLoggin}
            />
        </div>
    )
}

export default Loggin