import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import github from '../../assets/logo/github.png'
import google from '../../assets/logo/google.png'
import { useLocation, useNavigate } from "react-router-dom";
import app from "../../firebase/firebase.config";

const SocialLogIn = () => {
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/";

    const handleGoogleLogin = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const newUser = result.user;
                console.log(newUser);
                const saveUser = { name: newUser.displayName, email: newUser.email, profilePicture: newUser.photoURL }
                fetch('https://student-networking-server.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(() => {
                        navigate(from, { replace: true });
                    })
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    const handleGitHubLogin = () => {
        signInWithPopup(auth, githubProvider)
            .then(result => {
                const user = result.user;
                console.log(user);
                const saveUser = { name: user.displayName, email: user.email, profilePicture: user.photoURL }
                fetch('https://student-networking-server.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(() => {
                        navigate(from, { replace: true });
                    })
                    .catch(error => {
                        console.log(error.message);
                    });
            });
    };

    return (
        <div className="mb-5">
            <div>
                <button onClick={handleGoogleLogin} className="flex items-center gap-4 justify-center border-2 px-28 py-2 border-gray-400 rounded-sm">
                    <img className="w-8 h-8 rounded-full" src={google} alt="" />
                    <p className="text-base">Google</p>
                </button>
            </div>
            <div className="mt-3">
                <button onClick={handleGitHubLogin} className="flex items-center gap-4 justify-center border-2 px-28 py-2 border-gray-400 rounded-sm">
                    <img className="w-8 h-8 rounded-full" src={github} alt="" />
                    <p className="text-base">Github</p>
                </button>
            </div>
        </div>

    );
};

export default SocialLogIn;