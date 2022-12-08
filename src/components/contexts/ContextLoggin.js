import { createContext, useState } from "react"

export const ContextLoggin = createContext()

export const UseContextLoggin = ({children}) => {

    const [isLogged , setIsLogged] = useState(false)

    function loggin(userLoggin){
        setIsLogged(true)

        const loggedUser = userLoggin

        if(userLoggin.email && userLoggin.password){
            localStorage.setItem("user" , JSON.stringify(loggedUser))
        }
    }

    return(
        <ContextLoggin.Provider value={{isLogged , loggin}} >
            {children}
        </ContextLoggin.Provider>
    )
}
