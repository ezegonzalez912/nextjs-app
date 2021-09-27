import { createContext, useState } from "react"

interface Props {
    children: JSX.Element;
}

interface ContextProps {
    isOpenModal: Boolean,
    handleOpenModal: (value?: boolean) => void;
    modal: string,
    setModal: (value: string) => void;
}

export const modalContext = createContext({} as ContextProps);

export const ModalProvider: React.FC<Props> = ({children}) => {

    const [isOpenModal, setIsOpenModal] = useState(false)
    const [modal, setModal] = useState("login")

    const handleOpenModal = (value = false) => {
        setIsOpenModal(value ? value : !isOpenModal)
    }

    const data = {
        isOpenModal, 
        handleOpenModal, 
        modal, 
        setModal
    }

    return (
        <modalContext.Provider value={data}>
            {children}
        </modalContext.Provider>
    )
}
