import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const ForbiddenPage = () => {
    return (
        <main>
            <Helmet>
                <title>Oh no</title>
            </Helmet>
            <div className="container">
                <section className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
                    <h1>403</h1>
                    <h2>This is restricted access. You don't have permission to access this page.</h2>
                    <Link to='/' className="btn">Back to home</Link>
                </section>
            </div>
        </main>
    );
}

export default ForbiddenPage;