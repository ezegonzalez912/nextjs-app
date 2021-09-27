import { createContext, useEffect, useState } from 'react'
import { firebaseConfig } from './config';
import { initializeApp } from 'firebase/app';
import FirebaseAuthTypes, { 
    getAuth, 
    createUserWithEmailAndPassword, 
    updateProfile, 
    onAuthStateChanged, 
    signInWithEmailAndPassword,
    signOut,
    signInWithPopup,
    GoogleAuthProvider
} from "firebase/auth";

interface ContextProps {
    user: FirebaseAuthTypes.User | null | undefined;
    userRegister: (name: string, email: string, password: string) => Promise<unknown>;
    loginUser: (email: string, password: string) => Promise<unknown>;
    logoutUser: () => void;
    loginUserWithGoogle: () => Promise<unknown>;
}

interface Props {
    children: JSX.Element;
}

export const firebaseContext = createContext({} as ContextProps)

export const FirebaseProvider: React.FC<Props> = ({children}) => {

    initializeApp(firebaseConfig);

    const [user, setUser] = useState<FirebaseAuthTypes.User | null | undefined>(undefined)

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user)
        } else {
            setUser(null)
        }
        });
    }, [])

    const userRegister = (name: string, email: string, password: string) => {
        const res = new Promise((resolve, reject) => {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                updateProfile(user, {displayName: name})
                setUser(user)
                return resolve("user registred")
            })
            .catch((error) => {
                const errorMessage = error.message;
                return reject(errorMessage)
            });
        })

        return res;
    }

    const loginUser = (email: string, password: string) => {
        const res = new Promise((resolve, reject) => {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setUser(user)
                return resolve("user logged")
            })
            .catch(() => {
                return reject("Invalid Email or Password")
            });
        })

        return res;
    }

    const logoutUser = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            setUser(null)
        }).catch((error) => {
        const errorMessage = error.message;
            console.log(errorMessage)
        });
    }

    const loginUserWithGoogle = () => {
        return new Promise((resolve, reject) => {
            const provider = new GoogleAuthProvider();
            const auth = getAuth();
            signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                setUser(user)
                return resolve("")
            }).catch(() => {
                return reject("Error connecting to google")
            });
        })
    }

    const data = {
        user,
        userRegister,
        loginUser,
        logoutUser,
        loginUserWithGoogle
    }

    return (
        <firebaseContext.Provider value={data}>
            {children}
        </firebaseContext.Provider>
    )
}
