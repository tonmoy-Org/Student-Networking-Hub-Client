import { useLoaderData } from 'react-router-dom';
import RightSideBar from '../Home/RightSideBar/RightSideBar';
import cover from '../../assets/pics/profile-banner.webp'
import useAuth from '../../hooks/useAuth';
import userDP from '../../assets/logo/user.png'

const UserDetails = () => {
    const userProfile = useLoaderData();
    const { user } = useAuth();

    return (
        <div className='flex lg:gap-5 items-start justify-center py-20'>
            <div className="p-4 space-y-4">
                <div className="bg-white rounded shadow-md overflow-hidden">
                    <div className="relative">
                        <img src={userProfile?.cover || cover} alt="Cover" className="w-[800px] h-48 object-cover" />
                        <img src={userDP || userProfile?.profilePicture} alt="Profile" className="h-40 w-40 rounded-full absolute -bottom-14 left-4 border-4 border-white" />
                    </div>
                    <div className="p-4 mt-16 space-y-1">
                        <h1 className="text-2xl font-semibold">{userProfile?.name}</h1>
                        <p className="text-gray-600">{userProfile?.jobTitle}</p>
                        <p className="text-gray-600">Location: {userProfile?.location}</p>
                        <p className="text-gray-600">Email: {userProfile?.email}</p>
                        <p className="text-gray-600">Phone: {userProfile?.phone}</p>
                    </div>
                </div>

                <div className="bg-white p-4 rounded shadow-md">
                    <h2 className="text-lg font-semibold">Experience</h2>
                    <div className="mt-4 space-y-2">
                        <div>
                            <h3 className="text-base font-semibold">{userProfile?.jobTitle}</h3>
                            <p className="text-gray-600">Company: {userProfile?.company}</p>
                            <p className="text-gray-600">Duration: {userProfile?.duration}</p>
                            <p className="text-gray-600">Description: {userProfile?.description}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded shadow-md">
                    <h2 className="text-lg font-semibold">Education</h2>
                    <div className="mt-4 space-y-2">
                        <div>
                            <h3 className="text-base font-semibold">{userProfile?.degree}</h3>
                            <p className="text-gray-600">University: {userProfile?.university}</p>
                            <p className="text-gray-600">School: {userProfile?.school}</p>
                            <p className="text-gray-600">Duration: {userProfile?.eduDuration}</p>
                            <p className="text-gray-600">Edu Description: {userProfile?.eduDescription}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded shadow-md">
                    <h2 className="text-lg font-semibold">Skills</h2>
                    <ul className="mt-4 space-y-2">
                        {userProfile?.skills?.map((skill, index) => (
                            <li key={index} className="inline-block bg-blue-500 text-white px-2 py-1 rounded-md mx-1">{skill}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div>
                <RightSideBar></RightSideBar>
            </div>
        </div>
    );
};

export default UserDetails;