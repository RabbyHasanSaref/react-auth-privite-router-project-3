import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../provider/Context";
import {  updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
// import auth from "../../firebase/firebase.config";
// import { sendEmailVerification } from "firebase/auth";
// import auth from "../../firebase/firebase.config";

const Register = () => {
    const [successful, setSuccessful] = useState(null)
    const [errorInfo, setErrorInfo] = useState(null)
    const [showPassword, setShowePassword] = useState(false)
    const navigate = useNavigate();

    const { createUser } = useContext(AuthContext)
    // console.log(createUser)

    const handleCreateUser = (e) => {
        e.preventDefault()
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const checkbox = e.target.checkbox.checked;
        // console.log(name, email, password, checkbox);

        // conditonal functionality 
        if (password.length < 6) {
            setErrorInfo('Password should be at least 6 characters');
            return;
        }
        if (!checkbox) {
            setErrorInfo('Please Trems And Condition Selected');
            return;
        }


        // reset state
        setSuccessful('') 
        setErrorInfo('')

        // creat user 
        createUser(email, password)
            .then((reuslt) => {
                console.log(reuslt.user)
                setSuccessful('Your Sign-up Successful')

                navigate("/")

                // sendEmailVerification(auth.currentUser)
                // .then(()=> {
                //     alert('Chack Your email verification')
                // })

                updateProfile(reuslt.user,{
                    displayName: name
                })
                .then(()=>{
                    console.log('profile update')
                })
                .catch((error)=>{
                    console.log(error.message)
                })
            })
            .catch((error) => {
                console.error(error)
                setErrorInfo('Email Already Use')
            })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content w-full flex-col lg:flex-row-reverse">
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleCreateUser} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="name" placeholder="Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="password"
                                className="input input-bordered"
                                required />
                            <div className="absolute top-12 right-2 cursor-pointer">
                                <p onClick={() => setShowePassword(!showPassword)}>{showPassword ? 'Showe' : 'Hiden'}</p>
                            </div>
                            <label className="label">
                                <button href="#" className="label-text-alt link link-hover text-green-500"><Link to="/login">already account create</Link></button>
                            </label>
                        </div>
                        <div className="flex gap-2 items-center">
                            <input type="checkbox" name="checkbox" /> Accept terms and condition
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Sign-up</button>
                        </div>

                        {
                            successful && <p className="text-green-500 text-center">{successful}</p>
                        }
                        {
                            errorInfo && <p className="text-red-500 text-center">{errorInfo}</p>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;