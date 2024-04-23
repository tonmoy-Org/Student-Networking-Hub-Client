import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import axios from "axios";


export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);

            if (currentUser) {
                // Persist user data in localStorage
                localStorage.setItem('user', JSON.stringify(currentUser));
                axios.post('https://student-networking-server.vercel.app/jwt', { email: currentUser.email })
                    .then(data => {
                        localStorage.setItem('access-token', data.data.token)
                        setLoading(false);
                    })
            }
            else {
                // Clear localStorage if user is null
                localStorage.removeItem('user');
                localStorage.removeItem('access-token');
            }
            setLoading(false); // Set loading to false after authentication state is updated
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        // Check if user data exists in localStorage on component mount
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false); // Set loading to false after checking localStorage
    }, []);
    const authInfo = {
        user,
        createUser,
        signIn,
        loading,
        logOut,
        updateUserProfile
    };
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;