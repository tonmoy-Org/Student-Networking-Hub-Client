import MyProfile from '../MyProfile/MyProfile';
import RightSideBar from '../Home/RightSideBar/RightSideBar';

const Profile = () => {
    return (
        <div className='flex lg:gap-5 items-start justify-center py-20'>
           <MyProfile></MyProfile> 
           <RightSideBar></RightSideBar>
        </div>
    );
};

export default Profile;