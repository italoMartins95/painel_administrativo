import styles from './Button.module.css'

function Button({ handleSubmit , txtButon , children}){
    return(
        <button onClick={handleSubmit} className={styles.button}>
            {txtButon}
            {children}
        </button>
    )
}

export default Button