import { Link, useLocation } from "react-router-dom";
import LeftsideBar from "../Home/LeftsideBar/LeftsideBar";
import RightSideBar from "../Home/RightSideBar/RightSideBar";
import userDP from '../../assets/logo/user.png'

const Search = () => {
    const location = useLocation();
    const searchResults = JSON.parse(decodeURIComponent(new URLSearchParams(location.search).get('results')));

    return (
        <div>
            <div className="lg:px-36 px-3 lg:flex justify-center pt-24 mb-28">
                <div className="flex lg:gap-8 items-start justify-center">
                    <LeftsideBar />
                    <div className="lg:w-[700px] shadow-lg">
                        {searchResults.map((result, index) => (
                            <>
                                <div key={index} className="flex items-center p-4 border-b border-gray-200">
                                    <Link title={result?.name} to={`/userDetails/${result?.email}}`}>
                                        <img src={result.profilePicture === null ? userDP : result.profilePicture[0]} alt="Profile Picture" className="w-12 h-12 rounded-full mr-4" />
                                    </Link>
                                    <div>
                                        <Link title={result?.name} to={`/userDetails/${result?.email}`}> <h2 className="font-semibold">{result.name}</h2></Link>
                                        <Link title={result?.name} to={`/userDetails/${result?.email}`}> <p className="text-gray-500">{result.email}</p></Link>
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>
                    <RightSideBar />
                </div>
            </div>
        </div>
    );
};

export default Search;
