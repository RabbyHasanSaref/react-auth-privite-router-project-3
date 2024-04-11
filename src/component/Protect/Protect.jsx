import { useContext } from "react";
import { AuthContext } from "../../provider/Context";
import { Navigate } from "react-router-dom";

const Protect = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    // console.log(user)
    if(loading){
        return <span className="loading loading-bars loading-lg"></span>
    }
    
    if(user){
        return children;
    }
    return <Navigate to="/login"></Navigate>;
};

export default Protect;