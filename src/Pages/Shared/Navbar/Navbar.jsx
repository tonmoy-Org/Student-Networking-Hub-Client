import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo/graduation-cap.png'
import ActiveLink from '../../../component/ActiveLink/ActiveLink';
import useAuth from '../../../hooks/useAuth';
import { IoCloseSharp } from "react-icons/io5";
import { FaHome, FaEnvelope, FaBell, FaBlog, FaSignOutAlt, FaUser } from 'react-icons/fa';
import man from '../../../assets/logo/man.png'

const Navbar = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => {
                console.log(error.message);
            })
    }


    const handleSearch = (event) => {
        event.preventDefault();
        const searchValue = event.target.search.value;
        console.log(searchValue)
        fetch(`https://student-networking-server.vercel.app/profiles?name=${searchValue}`)
            .then((res) => res.json())
            .then((data) => {
                navigate(`/search?results=${encodeURIComponent(JSON.stringify(data))}`);

            });
    };

    return (
        <div>
            <div className="navbar bg-white shadow-lg fixed z-10 lg:px-20 px-5">
                <div className="navbar-start">
                    <Link to='/'>
                        <div className="lg:flex items-center">
                            <img className="lg:w-10 w-8 rounded-full lg:me-3" src={logo} alt="" />
                            <p className="text-lg font-bold hidden lg:block">Student Networking Hub</p>
                        </div>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="px-1 lg:flex justify-center gap-6">
                        <li> <ActiveLink to='/' className="">Home</ActiveLink></li>
                        <li> <ActiveLink to='/message' className="">Message</ActiveLink></li>
                        <li><ActiveLink to='/notification' className="">Notification</ActiveLink></li>
                        <li> <ActiveLink to='/blog' className="">Blog</ActiveLink></li>
                    </ul>
                </div>
                <div className="navbar-end pe-3">
                    <form onSubmit={handleSearch}>
                        <div className='me-2'>
                            <label className="flex border-2 border-gray-300 px-2 items-center gap-2">
                                <input
                                    type="text"
                                    name="search"
                                    className="py-1 w-28 lg:w-52 focus:border-none focus:outline-none lg:focus:w-72 focus:w-64 transition-all duration-300 focus:delay-300 transform-gpu"
                                    placeholder="Search"
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                            </label>
                        </div>
                    </form>
                    <div className='pe-3'>
                        <div className="drawer drawer-end">
                            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                            <div className="drawer-content">
                                {user ? (
                                    <label htmlFor="my-drawer-4" className="drawer-button btn btn-sm btn-circle">
                                        <div className="avatar">
                                            <div className="lg:w-10 w-8 rounded-full">
                                                <img
                                                    src={user?.photoURL || man}
                                                    alt="User Avatar"
                                                    onError={(e) => {
                                                        e.target.src = man;
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </label>
                                ) : (
                                    <Link to="/login" className="font-bold">
                                        Login
                                    </Link>
                                )}

                            </div>
                            <div className="drawer-side">
                                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-black">
                                    <div className="flex justify-between items-center pe-5">
                                        <h1 className="text-xl font-semibold">Settings</h1>
                                        <IoCloseSharp onClick={() => { document.getElementById('my-drawer-4').checked = false; }} className="w-6 h-6 btn btn-circle btn-sm" />
                                    </div>
                                    <div className="divider"></div>
                                    <li>
                                        <Link to='/' onClick={() => document.getElementById('my-drawer-4').checked = false}>
                                            <FaHome /> Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/myProfile' onClick={() => document.getElementById('my-drawer-4').checked = false}>
                                            <FaUser /> My Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/' onClick={() => document.getElementById('my-drawer-4').checked = false}>
                                            <FaEnvelope /> Message
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/' onClick={() => document.getElementById('my-drawer-4').checked = false}>
                                            <FaBell /> Notification
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/' onClick={() => document.getElementById('my-drawer-4').checked = false}>
                                            <FaBlog /> Blog
                                        </Link>
                                    </li>
                                    <li>
                                        <Link onClick={() => { handleLogOut(); document.getElementById('my-drawer-4').checked = false; }}>
                                            <FaSignOutAlt /> Logout
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;