import styles from './Select.module.css'

function Select({options , handleOnChange}){
    return(
        <select onChange={handleOnChange} className={styles.select}>
            <option>Selecione</option>
            {
                options &&
                    options.map((option , index) => {
                        return(
                            <option key={index} value={option.idCategory}>
                                {option.nameCategody}
                            </option>
                        )
                    })
            }
        </select>
    )
}

export default Select