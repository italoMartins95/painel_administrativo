import './App.css';

import {BrowserRouter as Router, Routes, Route , Navigate} from 'react-router-dom'

import Loggin from './components/layouts/Loggin'
import NavBar from './components/layouts/NavBar'
import Conteiner from './components/layouts/Conteiner'
import Products from './components/pages/Products'
import NewProduct from './components/pages/NewProduct'
import Clients from './components/pages/Clients'
import NewClients from './components/pages/NewClients'
import Cadastros from './components/pages/Cadastros'
import Sales from './components/pages/Sales'

import { useContext } from 'react';
import { ContextLoggin } from './components/contexts/ContextLoggin'
import { UseContextSales } from './components/contexts/ContextSales'
import { UseContextClients } from './components/contexts/ContextClients'
import { UseContextProducts } from './components/contexts/ContextProducts'

function App() {

  const {isLogged} = useContext(ContextLoggin)

  return (
    <>
      {
        !isLogged ? (
          <>
            <Loggin />
          </>
        ):(
            <Router>
                <Conteiner>
                  <NavBar />
                  <UseContextSales>
                    <UseContextClients>
                      <UseContextProducts>
                        <Routes>
                          <Route path='/produtos' element={<Products />}/>
                          <Route path='/cadastro-produto' element={<NewProduct />} />
                          <Route path='/clientes' element={<Clients />} />
                          <Route path='/cadastro-cliente' element={<NewClients />} />
                          <Route path='/cadastros' element={<Cadastros />} />                    
                          <Route path='/vendas' element={<Sales />} />
                        </Routes>
                      </UseContextProducts>
                    </UseContextClients>
                  </UseContextSales>
                </Conteiner>
            </Router>
          )
      }
    </>
  );
}

export default App;
