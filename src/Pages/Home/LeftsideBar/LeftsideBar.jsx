import useAuth from "../../../hooks/useAuth";
import cover from "../../../assets/pics/profile-banner.webp";
import { PiShareNetwork } from "react-icons/pi";
import { HiBookmark } from "react-icons/hi";
import { Link } from "react-router-dom";
import { MdOutlinePostAdd } from "react-icons/md";
import useProfile from "../../../hooks/useProfile";

const LeftsideBar = () => {
    const { user } = useAuth();
    const [profile] = useProfile();
    const userProfile = profile && profile.length > 0 ? profile[0] : null;

    return (
        <div>
            <div className="hidden lg:block">
                <div className="card w-[250px] bg-white shadow-xl rounded-none">
                    <div>
                        <div className="relative h-40 overflow-hidden">
                            <img className="object-cover w-full h-full brightness-50" src={userProfile?.cover || cover} alt="Cover" />

                            <div className="absolute bottom-0 left-0 w-full flex justify-center">
                                <img className="rounded-full w-20 h-20 border-4 border-white"  src={user?.photoURL || userProfile?.profilePicture} alt="Profile Picture" />
                            </div>
                        </div>
                        <div className="profile-desc text-center pt-5">
                            <h6 className="author text-lg font-semibold"><Link to='/myProfile' className="text-blue-500 hover:underline">{user?.displayName}</Link></h6>
                            <p className="text-gray-600 mt-2 p-3">Any one can join with us if you want. Connect with us on
                                social
                                media!</p>
                        </div>
                    </div>
                    <div>
                        <ul className="p-4 menu">
                            <li>
                                <Link to="/PostActivity/all" className="text-gray-700 flex items-center space-x-2">
                                    <MdOutlinePostAdd className="w-5 h-5" />
                                    <span>Post & Activity</span>
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="text-gray-700 flex items-center space-x-2">
                                    <HiBookmark className="w-5 h-5" />
                                    <span>MY items</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-700 flex items-center space-x-2">
                                    <PiShareNetwork className="w-5 h-5" />
                                    <span>Connections</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeftsideBar;
