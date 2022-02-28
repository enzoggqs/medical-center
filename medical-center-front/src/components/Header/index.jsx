import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";

const Header = () => {
    const { logout, user } = useContext(AuthContext)
    const [userType, setUserType] = useState('')

    useEffect(() => {
        if(user.userType == 2)
        {
            setUserType('Secretária')
        }
        else if(user.userType == 1) 
        {
            setUserType('Doutor')
        }
        console.log(user.userType, userType)
    }, [user])

    const handleLogout = () => {
        logout();
    }
    
    return(
        <div className="my-3 flex w-full">
            <div className="ml-6 mr-auto text-left font-bold w-1/3">
            <span className="text-red-400">Medical</span>Center
            </div>
            <div className="mx-auto text-left  text-2xl font-bold w-1/3">
            <span className="text-red-400">Página </span>{userType}
            </div>
            <button 
                className="ml-auto border-2
                    bg-white 
                    border-red-500
                    text-red-500
                    rounded-full 
                    px-12 py-2 
                    inline-block 
                    font-semibold 
                    mr-6
                    hover:bg-red-500 
                    hover:text-white" 
                onClick={handleLogout}
            >
                Sair
            </button>
        </div>
    )
}

export default Header;