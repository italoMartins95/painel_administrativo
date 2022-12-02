import './App.css';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import NavBar from './components/layouts/NavBar'
import Conteiner from './components/layouts/Conteiner'
import Products from './components/pages/Products'
import NewProduct from './components/pages/NewProduct'
import Clients from './components/pages/Clients'
import NewClients from './components/pages/NewClients'
import Cadastros from './components/pages/Cadastros'
import Vendas from './components/pages/Vendas'

function App() {
  return (
    <>
      <Router>
        <Conteiner>
          <NavBar />
          <Routes>
            <Route path='/produtos' element={<Products />}/>
            <Route path='/cadastro-produto' element={<NewProduct />} />
            <Route path='/clientes' element={<Clients />} />
            <Route path='/cadastro-cliente' element={<NewClients />} />
            <Route path='/cadastros' element={<Cadastros />} />
            <Route path='/vendas' element={<Vendas />} />
          </Routes>
        </Conteiner>
      </Router>
    </>
  );
}

export default App;
