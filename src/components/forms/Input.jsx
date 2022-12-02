import styles from './Input.module.css'

function Input({value , type , handleOnChange , handlePlaceholder}){
    return(
        <input value={value} 
               type={type}
               placeholder={handlePlaceholder}
               onChange={handleOnChange} 
               className={styles.input}
        />
    )
}

export default Input