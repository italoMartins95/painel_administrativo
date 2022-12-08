import { createContext , useState } from "react"
import { useNavigate } from 'react-router-dom'

export const ContextClients = createContext()

export const UseContextClients = ({children}) => {

    const [clients , setClients] = useState()
    const [newClient , setNewClient] = useState({})
    const [mensagem , setMensagem] = useState({})

    const navigate = useNavigate()  

    function actionClient(id , action){
        const operation = {id: id , action: action}

        if(action == 'trash'){
            fetch(`http://localhost:3001/clientes` , {
                method: 'DELETE',
                headers:{
                    'Content-type':'application/json'
                },
                body: JSON.stringify(operation)
            }).then(response => response.json())
              .then((data) => {
                    setClients(clients.filter(clients => clients.idClient != id))
                    setMensagem({...mensagem, tipo: 'sucess' , msg: 'Cliente deletado com sucesso'})
              })
        }
    }

    function submitNewClient(e){
        e.preventDefault()

        fetch(`http://localhost:3001/clientes` , {
            method: 'POST',
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify(newClient)
        }).then(response => response.json())
            .then(data => {
              if(data.result == 'Ops, ocorreu um ERRO'){
                  window.alert(data.msg)
              }else if(data.result == 'Operation successfull'){
                navigate('/clientes' , {state: 'Cliente cadastrado com sucesso!'})
              }else{
                  console.log(data)
            }
    })}

    return(
        <ContextClients.Provider value={{clients , setClients , actionClient , newClient , setNewClient, submitNewClient, mensagem , setMensagem}}>
            {children}
        </ContextClients.Provider>
    )
}