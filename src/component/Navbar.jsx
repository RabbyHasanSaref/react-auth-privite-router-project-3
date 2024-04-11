import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/Context";



const Navbar = () => {
    const {user, logOut} = useContext(AuthContext);
    // console.log(user)


    const handleLogOut = () => {
        logOut(logOut)
        .then(()=>{
           console.log('LogOut successful')
        })
        .catch((error) => {
            console.error(error)
        })
    }

    const navMenu = <>
        <li className="mr-5 text-base font-semibold"><Link to="/">Home</Link></li>
        <li className="mr-5 text-base font-semibold"><Link to="/about">About</Link></li>
        <li className="mr-5 text-base font-semibold"><Link to="/service">Service</Link></li>
        {
           user && <li className="mr-5 text-base font-semibold"><Link to="/blog">Blog</Link></li>
        }
        <li className="mr-5 text-base font-semibold"><Link to="/contact">Contact</Link></li>
    </>
    return (
        <div className="navbar bg-base-100 container lg:px-10 px-2 mx-auto shadow-lg">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {
                            navMenu
                        }
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">React Auth Privite Router</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {
                        navMenu
                    }
                </ul>
            </div>
            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            {
                                user ? <img className="bg-green-500" src={user.photoURL}></img> : <img className="bg-red-500"  src="./user.png" />
                            }
                        </div>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {/* {
                            user && <li><Link to="profile" className="justify-between">Profile</Link></li>
                        } */}
                        {
                            user ? <li onClick={handleLogOut}><a>Logout</a></li> : <li><Link to="/login">Login</Link></li>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;