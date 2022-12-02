import styles from './NavBar.module.css'

import {useState} from 'react'
import {Link} from 'react-router-dom'

import {TbGridDots} from 'react-icons/tb'
import {RiDashboardFill} from 'react-icons/ri'
import {BsBoxArrowLeft} from 'react-icons/bs'
import {FaUsers , FaRegHandshake} from 'react-icons/fa'
import {HiShoppingBag} from  'react-icons/hi'
import {AiFillCreditCard} from 'react-icons/ai'
import {MdOutlineAddToPhotos} from 'react-icons/md'

function NavBar(){

    const [openCloseNav , setOpenCloseNav] = useState(false)
    const [openCloseDetails , setOpenCloseDetails] = useState(false)

    return(
        <nav className={`${!openCloseNav ? styles.navBar : styles.navBarOpen }`}>
            {
                !openCloseNav ? (
                    <TbGridDots className={styles.dots} onClick={(e) => {setOpenCloseNav(!openCloseNav)}}/>
                ):(
                    <BsBoxArrowLeft className={styles.arrowLeft} onClick={(e) => {setOpenCloseNav(!openCloseNav)}}/>
                )
            }
            <ul className={`${ !openCloseNav ? styles.listItens : styles.listItensOpen} `}>
                <li>
                    <Link to='/' className={styles.link}>
                        {
                            !openCloseNav ? (
                                <abbr title='inicio'>
                                    <RiDashboardFill />
                                </abbr>
                            ):(
                                <>
                                    <RiDashboardFill />
                                    <span>inicio</span>
                                </>
                            )
                        }
                    </Link>
                </li>
                <li>
                    <Link to='produtos' className={styles.link}>
                        {
                            !openCloseNav ? (
                                <abbr title='produtos'>
                                    <HiShoppingBag />
                                </abbr>
                            ):(
                                <>
                                    <HiShoppingBag />
                                    <span>produtos</span>
                                </>
                            )
                        }  
                    </Link>
                </li>
                <li>
                    <Link to='clientes' className={styles.link}>
                        {
                            !openCloseNav ? (
                                <abbr title='clientes'>
                                    <FaUsers />
                                </abbr>
                            ):(
                                <>
                                    <FaUsers />
                                    <span>clientes</span>
                                </>
                            )
                        }  
                    </Link> 
                </li>
                <li>
                    <Link to='cadastros' className={styles.link} onClick={(e) => {setOpenCloseDetails(!openCloseDetails)}}>
                        {
                            !openCloseNav ? (
                                <abbr title='cadastros'>
                                    <MdOutlineAddToPhotos />
                                </abbr>
                            ):(
                                <>
                                    <MdOutlineAddToPhotos />
                                    <span>cadastros</span>
                                </>
                            )
                        }  
                    </Link> 
                </li>
                <li>
                    <Link to='vendas' className={styles.link}>
                        {
                            !openCloseNav ? (
                                <abbr title='vendas'>
                                    <AiFillCreditCard />
                                </abbr>
                            ):(
                                <>
                                    <AiFillCreditCard />
                                    <span>vendas</span>
                                </>
                            )
                        }  
                    </Link> 
                </li>
            </ul>
        </nav>
    )
}

export default NavBar