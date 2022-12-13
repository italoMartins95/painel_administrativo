import styles from './RevisaoSales.module.css'

import { ContextSales } from '../contexts/ContextSales'
import { useState , useContext } from 'react'

import Button from '../forms/Button'

function RevisaoSales({redefinirVenda}){

    const {shoppingCart , setShoppingCart , discaunt , cleanSale , fecharVenda} = useContext(ContextSales)
    const [desconto , setDesconto] = useState(false)
    const [render , setRender] = useState(false)

    function voltar(){
        redefinirVenda('stepOne')
    }

    return(
        <div className={styles.revisaoPedido}>
            <div className={styles.informacoesPrincipais}>
                <h1>Revizão do Pedido</h1>
                <div className={styles.caixaDadosCliente}>
                    <div className={styles.nameCliente}>
                        <span>Nome Cliente</span>
                        {shoppingCart.cliente.name}
                    </div>
                    <div className={styles.cpfCliente}>
                        <span>CPF/CNPJ</span>
                        {shoppingCart.cliente.cpf_cnpj}
                    </div>
                </div>
                <div className={styles.caixaDadosCliente}>
                    <div className={styles.telefoneCliente}>
                        <span>Telefone</span>
                        {shoppingCart.cliente.phone}
                    </div>
                    <div className={styles.emailCliente}>
                        <span>Email</span>
                        {shoppingCart.cliente.email}
                    </div>
                </div>
                <div className={styles.revisaoProdutos}>
                    <h2>Produtos</h2>
                    <div className={styles.listaProdutos}>
                        {
                            shoppingCart.itens.map((item , index) => 
                                <p key={index}>
                                    <span>
                                        {`${index+1} - ${item.nameProduct} ${item.brand} ${item.model}`}
                                    </span> 
                                    <span>
                                        {Number(item.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </span>
                                </p>
                            )
                        }
                        <p className={styles.somaItens}>
                            <span>
                                Total:
                            </span>
                            {Number(shoppingCart.somaItens).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </p>
                    </div>
                </div>
            </div>
            <div className={styles.informacoesAdicionais}>
                <div className={styles.formaPagamento}>
                    <h2>Forma de pagamento</h2>
                    <select onChange={(e) => setShoppingCart({...shoppingCart, paymentForm: e.target.value})}>
                        <option>Dinheiro (A vista)</option>   
                        <option>Debito (A vista)</option>
                        <option>Crédito (A vista)</option>
                        <option>Crédito (3X)</option>
                        <option>Crédito (6X)</option> 
                        <option>Crédito (9X)</option>
                    </select>
                </div>
                <div className={styles.desconto}>
                    <div>
                        <h2>Aplicar desconto?</h2>
                        <div>
                            <Button txtButon='sim' handleSubmit={() => setDesconto(true)}/>
                            <Button txtButon='Não' handleSubmit={() => {
                                                                setDesconto(false)
                                                                discaunt('0%')}
                            }/>
                        </div>
                    </div>                    
                    <div className={`${styles.valorDesconto} ${desconto ? styles.exibirValorDesconto : null}`}>
                        <p>Valor do desconto</p>
                        <select onChange={(e) => {discaunt(e.target.value)
                                                  setRender(!render)}}>
                            <option>Selecione   </option>
                            <option>5%</option>
                            <option>10%</option>
                            <option>15%</option>
                        </select>
                    </div>
                </div>
                <div className={styles.comentarioVenda}>
                    <h2>Informações Complementares</h2>
                    <textarea placeholder='Informações complementares da venda' 
                              onChange={(e) => setShoppingCart({...shoppingCart, comments: e.target.value})}
                    ></textarea>
                </div>
                <div className={styles.buttons}>
                    <Button txtButon='Alterar venda'
                            handleSubmit={() => {
                                                cleanSale()
                                                voltar()
                            }}/>
                    <Button txtButon='Finalizar venda'
                                handleSubmit={fecharVenda}
                    />
                </div>
            </div>
            
        </div>
    )
}

export default RevisaoSales