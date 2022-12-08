import { createContext , useState } from "react"

export const ContextSales = createContext()

export const UseContextSales = ({children}) => {

    const [shoppingCart , setShoppingCart] = useState({itens: [] , cliente: {} , somaItens: 0})

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

    return(
        <ContextSales.Provider value={{addItemInCart , shoppingCart , setShoppingCart , removeItemCart , addClienteInSale}}>
            {children}
        </ContextSales.Provider>
    )
}