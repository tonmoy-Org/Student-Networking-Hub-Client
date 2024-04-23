import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const SignUp = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [error, setError] = useState('');

    const validatePassword = (value) => {
        // Check for password length
        if (value.length < 6) {
            return "Password must be at least 6 characters long";
        }

        // Check for capital letter
        if (!/[A-Z]/.test(value)) {
            return "Password must contain at least one capital letter";
        }

        // Check for special character
        if (!/[!@#$%^&*()]/.test(value)) {
            return "Password must contain at least one special character";
        }

        return true;
    };

    const onSubmit = (data) => {
        const passwordValidation = validatePassword(data.password);
        if (passwordValidation === true) {
            if (data.password === data.confirmPassword) {
                fetch("https://student-networking-server.vercel.app/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name: data.name, email: data.email }),
                })
                    .then((res) => {
                        if (!res.ok) {
                            throw new Error("Failed to create user.");
                        }
                        return res.json();
                    })
                    .then((userData) => {
                        createUser(userData.email, data.password);
                        updateUserProfile(userData.name, userData.photoURL);
                        reset();
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "User created successfully.",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        navigate("/");
                    })
                    .catch((error) => {
                        console.error("Error creating user:", error);
                        setError("Failed to create user.");
                    });
            } else {
                setError("Passwords didn't match, please try again.");
            }
        } else {
            setError(passwordValidation);
        }
    };


    return (
        <div>
            <div className="lg:hero lg:min-h-screen pt-20 bg-base-200">
                <div className="lg:hero-content">
                    <div className="card lg:w-[500px] flex-shrink-0 max-w-xl lg:shadow-2xl rounded-none bg-base-100">
                        <div className="card-body">
                            <h1 className="text-3xl font-bold">Register Now</h1>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        {...register("name", { required: true })}
                                        name="name"
                                        placeholder="Enter name"
                                        className="p-2 border-2 border-base-300"
                                    />
                                    {errors.name && <span className="text-red-600">This field is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        {...register("email", { required: true })}
                                        name="email"
                                        placeholder="Enter email"
                                        className="p-2 border-2 border-base-300"
                                    />
                                    {errors.email && <span className="text-red-600">This field is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Password</span>
                                        <small className="text-blue-600" onClick={() => setShow(!show)}>
                                            {show ? <span>Hide</span> : <span>Show</span>}
                                        </small>
                                    </label>
                                    <input
                                        type={show ? "text" : "password"}
                                        {...register("password", { required: true })}
                                        name="password"
                                        placeholder="Enter password"
                                        className="p-2 border-2 border-base-300"
                                    />
                                    {errors.password && <span className="text-red-600">This field is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Confirm Password</span>
                                    </label>
                                    <input
                                        type={show ? "text" : "password"}
                                        {...register("confirmPassword", { required: true })}
                                        name="confirmPassword"
                                        placeholder="Confirm password"
                                        className="p-2 border-2 border-base-300"
                                    />
                                    {errors.confirmPassword && <span className="text-red-600">This field is required</span>}
                                </div>
                                <div className="form-control mt-6">
                                    <input className="btn bg-blue-600 hover:bg-blue-600 text-white rounded-none" type="submit" value="Sign up" />
                                </div>
                            </form>
                            <div className="py-3">

                            </div>
                            <div>
                                <p>
                                    Already a member? <Link className="text-blue-600 font-semibold" to="/login">Login</Link>
                                </p>
                            </div>
                            <div className="text-warning">{error}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
