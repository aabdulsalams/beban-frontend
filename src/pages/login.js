import { Link, useNavigate } from "react-router-dom";
import { Formik } from 'formik';
import { useAuth } from "../utils/auth";
import { Helmet } from "react-helmet";
import * as Yup from 'yup';

const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required().min(5)
});

const LoginPage = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    return (
        <>
            <Helmet>
                <title>Jatim {process.env.REACT_APP_WEB_NAME} - Login</title>
            </Helmet>
            <main>
                <div className="container">

                    <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                                    <div className="d-flex justify-content-center py-4">
                                        <Link to='/' className="logo d-flex align-items-center w-auto">
                                            <img src="/img/logo-jatim.png" alt="" />
                                            <span className="d-none d-lg-block">{process.env.REACT_APP_WEB_NAME}</span>
                                        </Link>
                                    </div>

                                    <div className="card mb-3">

                                        <div className="card-body">

                                            <div className="pt-4 pb-2">
                                                <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                                                <p className="text-center small">Enter your email & password to login</p>
                                            </div>

                                            <Formik
                                                validationSchema={schema}
                                                validateOnChange={false}
                                                initialValues={{
                                                    email: '',
                                                    password: ''
                                                }}
                                                onSubmit={(values) => {
                                                    // alert(JSON.stringify(values, null, 2));
                                                    auth.login(values.email, values.password, () => {
                                                        navigate('/dashboard', { replace: true });
                                                    });
                                                }}
                                            >
                                                {({ handleSubmit, handleChange, values, errors }) => (
                                                    <form className="row g-3" onSubmit={handleSubmit}>

                                                        <div className="col-12">
                                                            <label htmlFor="email" className="form-label">Email</label>
                                                            <input
                                                                type="email"
                                                                name="email"
                                                                className={`form-control ${!!errors.email ? 'is-invalid' : ''}`}
                                                                id="email"
                                                                onChange={handleChange}
                                                                value={values.email}
                                                            />
                                                            <div className="invalid-feedback">{errors.email}</div>
                                                        </div>

                                                        <div className="col-12">
                                                            <label htmlFor="password" className="form-label">Password</label>
                                                            <input
                                                                type="password"
                                                                name="password"
                                                                className={`form-control ${!!errors.password ? 'is-invalid' : ''}`}
                                                                id="password"
                                                                onChange={handleChange}
                                                                value={values.password}
                                                            />
                                                            <div className="invalid-feedback">{errors.password}</div>
                                                        </div>
                                                        <div className="col-12">
                                                            <button className="btn btn-primary w-100" type="submit">Login</button>
                                                        </div>
                                                        <div className="col-12">
                                                            <p className="small mb-0">Don't have account? <Link to='/register'>Create an account</Link></p>
                                                        </div>
                                                    </form>
                                                )}
                                            </Formik>

                                        </div>
                                    </div>

                                    <div className="credits">
                                        Copyright © {process.env.REACT_APP_WEB_NAME} 2022
                                    </div>

                                </div>
                            </div>
                        </div>

                    </section>

                </div>
            </main>

            {/* <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a> */}

        </>
    );
}

export default LoginPage;