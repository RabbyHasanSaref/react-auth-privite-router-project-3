import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../provider/Context";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaGoogle } from "react-icons/fa6";

const Login = () => {
    const [successful, setSuccessful] = useState(null)
    const [errorInfo, setErrorInfo] = useState(null)
    const [showePassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const { loginUser, googleUser } = useContext(AuthContext)

    const handleLoginUser = (e) => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        const checkbox = e.target.checkbox.checked;
        // console.log(email, password, checkbox)

        // conditional 
        if (password.length < 6) {
            setErrorInfo('Password should be at least 6 characters ?');
            return;
        }
        if (!checkbox) {
            setErrorInfo('Please select Remember ?')
            return;
        }

        // reset state 
        setSuccessful('')
        setErrorInfo('')

        // login user 
        loginUser(email, password)
            .then((result) => {
                console.log(result.user)
                setSuccessful('Your Login Successful')
                navigate("/blog")
                // if(result.user.emailVerified){
                //     successful('currect password login sucess')
                // }
                // else{
                //     alert('please check your email verification')
                // }
            })
            .catch((error) => {
                console.error(error)
                setErrorInfo('Sorry, please check if your password or email is correct, something is wrong ?')
            })
    }

    const handleGoogle = () => {
        googleUser()
        .then(result => {
            console.log(result.user)
            navigate("/blog")
        })
        .catch(error => {
            console.error(error)
        })
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content w-full flex-col lg:flex-row-reverse">
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLoginUser} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type={showePassword ? 'text' : 'password'}
                                name="password"
                                placeholder="password"
                                className="input input-bordered"
                                required />
                            <div className="absolute top-12 right-2 cursor-pointer"><p onClick={() => setShowPassword(!showePassword)}>{showePassword ? 'Showe' : 'Hiden'}</p></div>
                            <label className="label">
                                <button href="#" className="label-text-alt link link-hover text-blue-500"><Link to="/forget">Forgot password?</Link></button>
                                <button href="#" className="label-text-alt link link-hover text-green-500"><Link to="/sign">Create a account</Link></button>
                            </label>
                        </div>
                        <div className="flex gap-2 items-center">
                            <input type="checkbox" name="checkbox" /> Remember
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                        {
                            successful && <p className="text-green-500 text-center">{successful}</p>
                        }
                        {
                            errorInfo && <p className="text-red-500 text-center">{errorInfo}</p>
                        }
                        <div className=" my-5 mx-auto flex gap-5">
                            <button onClick={handleGoogle}><Link><FaGoogle className="text-[30px] font-extrabold"></FaGoogle></Link></button>
                            <div className="border-r-2 border-black"></div>
                            <button><Link><FaGithub className="text-[30px] font-extrabold"></FaGithub></Link></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;