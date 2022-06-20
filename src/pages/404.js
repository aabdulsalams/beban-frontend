import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const NotFoundPage = () => {
    return (
        <main>
            <Helmet>
                <title>Not Found</title>
            </Helmet>
            <div className="container">
                <section className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
                    <h1>404</h1>
                    <h2>The page you are looking for doesn't exist.</h2>
                    <Link to='/' className="btn">Back to home</Link>
                </section>
            </div>
        </main>
    );
}

export default NotFoundPage;