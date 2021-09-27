import { useContext } from 'react'
import { firebaseContext } from '../../../context/firebase/firebaseContext'
import styles from '../../../styles/NavBar.module.scss'

interface Props {
    setMenu: (state: boolean) => void;
}

export const MenuNavBar: React.FC<Props> = ({setMenu}) => {

    const { logoutUser } = useContext(firebaseContext);

    const handleLogout = () => {
        logoutUser()
        setMenu(false)
    }

    return (
        <div className={styles.menu}>
            <p onClick={handleLogout}>Logout</p>
        </div>
    )
}
