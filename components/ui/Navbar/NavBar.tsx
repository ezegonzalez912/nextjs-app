import { useContext, useState } from "react"
import { modalContext } from "../../../context/Modal/modalContext"
import { firebaseContext } from "../../../context/firebase/firebaseContext"
import { ThreePoints } from "../../../Assets/ThreePoints"
import { MenuNavBar } from "./MenuNavBar"
import styles from '../../../styles/NavBar.module.scss'

export const NavBar: React.FC = () => {

    const { user } = useContext(firebaseContext)
    const { handleOpenModal } = useContext(modalContext)

    const [ menu, setMenu ] = useState<Boolean>(false)

    return (
        <nav className={styles.nav}>
            <h1>MOVIENEXT</h1>
            <section>
                {menu && <MenuNavBar setMenu={setMenu} />}
                {user ?
                    <> 
                        <p>{user?.displayName?.toLocaleUpperCase()}</p>
                        <button onClick={() => setMenu(!menu)} style={{borderBottomRightRadius: menu ? "0" : "20px"}}>
                            <ThreePoints />
                        </button>
                    </>
                    :
                    <p onClick={() => handleOpenModal()}>Login</p>
                }
            </section>
        </nav>
    )
}
