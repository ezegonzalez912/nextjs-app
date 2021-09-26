import { useContext } from 'react'
import { modalContext } from '../../context/Modal/modalContext'
import styles from '../../styles/Modal.module.scss'
import { ModalLogin } from './ModalLogin'
import { ModalRegister } from './ModalRegister'

export const Modal: React.FC = () => {

    const {isOpenModal, handleOpenModal, modal, setModal} = useContext(modalContext)

    const handleCloseModal = () => {
        setModal("login")
        handleOpenModal()
    }

    return (
        <div className={`${styles.main} ${isOpenModal && styles.modalOpen}`} onClick={handleCloseModal}>
            {modal === "login" && <ModalLogin />}
            {modal === "register" && <ModalRegister />}
        </div>
    )
}