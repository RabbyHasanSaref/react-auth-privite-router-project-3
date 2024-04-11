import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../provider/Context";

const Forget = () => {
    const [successful, setSuccessful] = useState(null)

    const {forgetPassword} = useContext(AuthContext)
    const handleForget = (e) => {
         e.preventDefault();
        const email = e.target.email.value;
        // console.log(email)

        forgetPassword(email)
        .then(()=> {
            setSuccessful('Password reset email sent!')
        })
        .catch((error) => {
            console.error(error)
        })
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleForget} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <label className="label">
                            <button href="#" className="label-text-alt link link-hover text-green-500"><Link to="/login">Back</Link></button>
                        </label>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Forget</button>
                        </div>
                        {
                            successful && <p className="text-green-500 text-center">{successful}</p>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Forget;