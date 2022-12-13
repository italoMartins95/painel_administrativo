import { createContext , useState , useEffect} from "react"
import { useNavigate } from "react-router-dom"

export const ContextSales = createContext()

export const UseContextSales = ({children}) => {

    const [shoppingCart , setShoppingCart] = useState({itens: [], 
                                                       cliente: {}, 
                                                       somaItens: 0,
                                                       paymentForm: 'Dinheiro (A vista)',
                                                       discount: null,
                                                       comments: null})

    const [mensagem , setMensagem] = useState({})


    const navigate = useNavigate()

    function addItemInCart(item){

        shoppingCart.somaItens += item.price
        shoppingCart.itens.push(item)
        setShoppingCart(shoppingCart)
    
        localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart))
    }

    function removeItemCart(item){

        shoppingCart.itens.splice(shoppingCart.itens.indexOf(item) , 1)

        setShoppingCart(shoppingCart)

        localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart))
    }

    function addClienteInSale(client){

        shoppingCart.cliente = client
        setShoppingCart(shoppingCart)

        localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart))
    }

    function cleanSale(){

        localStorage.removeItem('shoppingCart');
        shoppingCart.itens = []
        shoppingCart.cliente = {}
        shoppingCart.somaItens = 0

        setShoppingCart(shoppingCart)
    }

    function discaunt(disconto){
        switch(disconto){
            case '5%':
                shoppingCart.somaItens = (shoppingCart.somaItens * 0.95)
                shoppingCart.discount = disconto
                setShoppingCart(shoppingCart)
                break
            case '10%':
                shoppingCart.somaItens = (shoppingCart.somaItens * 0.9)
                shoppingCart.discount = disconto
                setShoppingCart(shoppingCart)
                break
            case '15%':
                shoppingCart.somaItens = (shoppingCart.somaItens * 0.85)
                shoppingCart.discount = disconto
                setShoppingCart(shoppingCart)
                break
            case '0%' || 'Selecione':
                var soma = 0;
                shoppingCart.itens.map(item => {
                    soma += item.price
                })
                shoppingCart.somaItens = soma
                shoppingCart.discount = null
                setShoppingCart(shoppingCart)
                break
            default:
                var soma = 0;
                shoppingCart.itens.map(item => {
                    soma += item.price
                })
                shoppingCart.somaItens = soma
                shoppingCart.discount = null
                setShoppingCart(shoppingCart)              
        }
    }

    function fecharVenda(){

        console.log(shoppingCart)

        fetch(`http://localhost:3001/venda` , {
            method: 'POST',
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify(shoppingCart)
        }).then(response => response.json())
          .then((data) => {
                navigate('/vendas' , {state: data.msg})
          })
    }

    return(
        <ContextSales.Provider value={{addItemInCart , shoppingCart , setShoppingCart , removeItemCart , addClienteInSale , discaunt , cleanSale , fecharVenda , mensagem , setMensagem}}>
            {children}
        </ContextSales.Provider>
    )
}