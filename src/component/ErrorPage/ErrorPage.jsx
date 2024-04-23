import { Link, useRouteError } from "react-router-dom";


export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page" className="flex justify-center items-center min-h-screen font-bold text-center">
            <div>
                <h1 className="text-4xl">Oops!</h1>
                <p className="my-4">Sorry, an unexpected error has occurred.</p>
                <p>
                    <i>{error.statusText || error.message}</i>
                </p>
                <div>
                    <Link className="btn btn-link font-mono text-xl font-bold" to='/'>Back To Site</Link>
                </div>
            </div>
        </div>
    );
}