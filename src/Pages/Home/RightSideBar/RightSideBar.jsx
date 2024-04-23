import ad from "../../../assets/pics/add-2.jpg"
import p1 from "../../../assets/pics/profile-35x35-4.webp"
import p2 from "../../../assets/pics/profile-35x35-6.webp"
import p3 from "../../../assets/pics/profile-35x35-7 (1).webp"
import p4 from "../../../assets/pics/profile-35x35-7.webp"
import p5 from "../../../assets/pics/profile-35x35-8.webp"



const RightSideBar = () => {
    return (
        <div>
            <div className="hidden lg:block">
                <div className="card lg:w-[270px] w-80 bg-white shadow-xl flex flex-col rounded-none">
                    <h1 className="text-xl p-3 ps-5 font-bold">Recent Notifications</h1>
                    <div className="px-2">
                        <div className="flex items-center p-4">
                            <img src={p1} alt="Profile Picture"
                                className="w-10 h-10 rounded-full mr-4" />
                            <div>
                                <h2 className="font-semibold">Any one can join with us if you want</h2>
                                <p className="text-gray-500">2 hours ago</p>
                            </div>
                        </div>
                        <div className="flex items-center p-4">
                            <img src={p2} alt="Profile Picture"
                                className="w-10 h-10 rounded-full mr-4" />
                            <div>
                                <h2 className="font-semibold">Any one can join with us if you want</h2>
                                <p className="text-gray-500">2 hours ago</p>
                            </div>
                        </div>
                        <div className="flex items-center p-4">
                            <img src={p3} alt="Profile Picture"
                                className="w-10 h-10 rounded-full mr-4" />
                            <div>
                                <h2 className="font-semibold">Any one can join with us if you want</h2>
                                <p className="text-gray-500">2 hours ago</p>
                            </div>
                        </div>
                        <div className="flex items-center p-4">
                            <img src={p4} alt="Profile Picture"
                                className="w-10 h-10 rounded-full mr-4" />
                            <div>
                                <h2 className="font-semibold">Any one can join with us if you want</h2>
                                <p className="text-gray-500">2 hours ago</p>
                            </div>
                        </div>
                        <div className="flex items-center p-4">
                            <img src={p5} alt="Profile Picture"
                                className="w-10 h-10 rounded-full mr-4" />
                            <div>
                                <h2 className="font-semibold">Any one can join with us if you want</h2>
                                <p className="text-gray-500">2 hours ago</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white lg:w-[270px]  shadow-lg p-6 my-8">
                    <h4 className="text-lg font-bold mb-4">Advertizement</h4>
                    <div className="mt-4">
                        <a href="#" className="block">
                            <img src={ad} alt="advertisement" className="w-full h-auto rounded" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RightSideBar;