import styles from './NewProduct.module.css'

import { ContextProducts } from '../contexts/ContextProducts'
import { useEffect, useContext } from 'react'
import { Link , useNavigate } from 'react-router-dom'

import Input from '../forms/Input'
import Button from '../forms/Button'
import Select from '../forms//Select'

function NewProduct(){

    const {newProduct , setNewProduct , options , setOptions , submitNewProduct} = useContext(ContextProducts)
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:3001/categorias`)
        .then(response => response.json())
        .then(data => {
            if(data.result == 'Nenhuma categoria encontrada'){
                window.alert(data.msg)
            }else{
                setOptions(data)
            }
        })
    } , [])

    return(
        <form className={styles.newProduct} onSubmit={submitNewProduct} id='teste'>
            <section className={styles.topForm}>
                <div>
                    <h1>Cadastrar novo produto</h1>
                    <div>
                        <label>Nome: </label>
                        <Input handlePlaceholder='insira um nome para o produto'
                               handleOnChange={(e) => {setNewProduct({... newProduct, name: e.target.value})}}
                        />
                    </div> 
                    <div>
                        <label>Marca: </label>
                        <Input handlePlaceholder='insira a marca do produto'
                               handleOnChange={(e) => {setNewProduct({... newProduct, brand: e.target.value})}}
                        />
                    </div>
                    <div>
                        <label>Modelo: </label>
                        <Input handlePlaceholder='insira o modelo do produto'
                               handleOnChange={(e) => {setNewProduct({...newProduct, model: e.target.value})}}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <label>Preço: </label>
                        <Input handlePlaceholder='Preço'
                            type='number'
                            handleOnChange={(e) => {setNewProduct({...newProduct, price: e.target.value})}}
                        />
                    </div>
                    <div>
                        <label>Estoque: </label>
                        <Input handlePlaceholder='qtd estoque'
                               type='number'
                               handleOnChange={(e) => {setNewProduct({...newProduct, inventory: e.target.value})}}
                        />
                    </div>
                </div>       
            </section>
            <section className={styles.bottomForm}>                
                <div>
                    <label>Categoria:</label>
                    <Select options={options}
                            handleOnChange={(e) => {setNewProduct({...newProduct, category: e.target.value})}}        
                    />                    
                </div>
                <label>Descrição:</label>
                <textarea cols="30" rows="10" placeholder='Faça uma descrição breve do produto'
                            onChange={(e) => {setNewProduct({...newProduct, description: e.target.value})}}>
                </textarea>
            </section>
            <section className={styles.formButtons}>
                <Link to='/produtos' className={styles.link}>
                    <Button txtButon='voltar' />
                </Link>
                <Button txtButon='concluir'/>
            </section>
        </form>
    )
}

export default NewProduct