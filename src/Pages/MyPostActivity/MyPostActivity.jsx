import LeftsideBar from '../Home/LeftsideBar/LeftsideBar';
import PostMedia from '../PostMedia/PostMedia';
import PostActivity from '../PostActivity/PostActivity';
import RightSideBar from '../Home/RightSideBar/RightSideBar';

const MyPostActivity = () => {
    return (
        <div className="lg:px-36 px-3 lg:flex justify-center pt-24 mb-28">
            <div className="flex lg:gap-5 items-start justify-center">
                <LeftsideBar></LeftsideBar>
                <div>
                    <PostMedia></PostMedia>
                    <PostActivity></PostActivity>
                </div>
                <RightSideBar></RightSideBar>
            </div >
        </div>
    );
};

export default MyPostActivity;