import styles from './Message.module.css'

import { useState , useEffect } from 'react'

function Message({msg , type}){

    const [visible , setVisible] = useState(false)

    useEffect(() => {

        if(!msg){
            setVisible(false)
            return
        }

        setVisible(true)
             

        const timer = setTimeout(() => {
            setVisible(false) 
        } , 2500)

    } , [msg])


    return(
        <>
            {visible &&
             <p className={`${styles.mensagem} ${styles[type]}`}>
                            {msg}
            </p> 
            }
        </>
    )
}

export default Message