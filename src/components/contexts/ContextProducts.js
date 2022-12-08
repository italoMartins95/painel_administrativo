import { createContext, useState } from "react"
import { useNavigate } from 'react-router-dom'

export const ContextProducts = createContext()

export const UseContextProducts = ({children}) => {

    const [products , setProducts] = useState()
    const [newProduct , setNewProduct] = useState({})
    const [options , setOptions] = useState()
    const [mensagem , setMensagem] = useState({})

    const navigate = useNavigate()

    function actionProduct(id , action){
        const operation = {id: id , action: action}

        if(action == 'trash'){
            fetch(`http://localhost:3001/produtos` , {
                method: 'DELETE',
                headers:{
                    'Content-type':'application/json'
                },
                body: JSON.stringify(operation)
            }).then(response => response.json())
              .then(() => {
                  setProducts(products.filter(product => product.idProduct != id))
                  setMensagem({...mensagem, tipo: 'sucess' , msg: 'Produto deletado com sucesso'})
              })
        }        
    }

    function submitNewProduct(e){
        e.preventDefault()

        fetch(`http://localhost:3001/produtos` , {
            method: 'POST',
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify(newProduct)
        }).then(response => response.json())
          .then(data => {
              if(data.result == 'Ops, ocorreu um ERRO'){
                  window.alert(data.msg)
              }else if(data.result == 'Operation successfull'){
                navigate('/produtos' , {state: `Produto cadastrado com sucesso`})
              }
          })
    }

    return(
        <ContextProducts.Provider value={{products , setProducts , actionProduct , newProduct , setNewProduct , options , setOptions , submitNewProduct , mensagem , setMensagem}} >
            {children}
        </ContextProducts.Provider>
    )
}
