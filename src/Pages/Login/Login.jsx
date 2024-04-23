import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import Loader from "../../component/Loader/Loader";
import SocialLogIn from "./SocialLogIn";
import side from '../../assets/logo/dxf91zhqd2z6b0bwg85ktm5s4.svg'

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/dashboard/dashboardHome";
    const adminDestination = "/dashboard";
    const student = "/"

    const [axiosSecure] = useAxios();
    const { signIn } = useAuth();

    const onSubmit = async (data) => {
        setError('');
        try {
            setLoading(true);
            if (data.password.length < 6) {
                setError('Password must be at least 6 characters long');
                return;
            }

            const { data: isAdmin } = await axiosSecure.get(`/users/admin/${data.email}`);
            const { data: isInstructor } = await axiosSecure.get(`/users/instructor/${data.email}`);

            if (isAdmin.admin) {
                // Redirect to admin dashboard
                const result = await signIn(data.email, data.password);
                console.log(result)
                navigate(adminDestination, { replace: true });
                // Show success message
            }
            else if (isInstructor.instructor) {
                const result = await signIn(data.email, data.password);
                console.log(result)
                navigate(from, { replace: true });
                // Show success message
            } else {
                const result = await signIn(data.email, data.password);
                console.log(result);
                navigate(student, { replace: true });
            }

        } catch (error) {
            setError('Wrong email/password, please try again');
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="lg:hero lg:pt-10 pt-28 lg:min-h-screen lg:px-3 bg-base-100">
            {loading ? (
                <div className="min-h-screen">
                    <Loader />
                </div>
            ) : (
                <div className="hero-content flex-col lg:gap-48 gap-10 lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <img className="w-[40rem]" src={side} alt="" />
                    </div>
                    <div className="flex-shrink-0 w-full max-w-sm lg:shadow-2xl bg-base-100">
                        <div className="lg:card-body p-4">
                            <div className="pb-3">
                                <h1 className="text-3xl font-bold">Login now</h1>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" {...register("email", { required: true })} name="email" placeholder="Email" className="p-2 border-2 border-base-300" />
                                    {errors.email && <span className="text-red-600">This field is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                        <small className="text-blue-600 font-semibold cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? "Hide" : "Show"}
                                        </small>
                                    </label>
                                    <input type={showPassword ? "text" : "password"} {...register("password", { required: true, maxLength: 20 })} name="password" placeholder="Password" className="p-2 border-2 border-base-300" />
                                    {errors.password && <span className="text-red-600">This field is required</span>}
                                </div>
                                <div className="form-control mt-6">
                                    <input className="bg-blue-600 py-3 border-none rounded-none text-white cursor-pointer" type="submit" value="Login" />
                                </div>
                            </form>
                            <div className="mt-5">
                                <SocialLogIn></SocialLogIn>
                            </div>
                            <div>
                                <p>Are you new ? <Link className="text-blue-600" to="/signUp">Register Now</Link></p>
                                <p className="text-red-600 py-3">{error}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
