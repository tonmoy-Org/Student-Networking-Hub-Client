import PostMedia from "../../PostMedia/PostMedia";
import CenterContent from "../CenterContent/CenterContent";
import LeftsideBar from "../LeftsideBar/LeftsideBar";
import RightSideBar from "../RightSideBar/RightSideBar";


const Home = () => {
    return (
        <div>
            <div className="lg:px-36 px-3 lg:flex justify-center pt-24 mb-28">
                <div className="flex lg:gap-5 items-start justify-center">
                    <LeftsideBar></LeftsideBar>
                    <div>
                        <PostMedia></PostMedia>
                        <CenterContent></CenterContent>
                    </div>
                    <RightSideBar></RightSideBar>
                </div >
            </div >
        </div >
    );
};

export default Home;