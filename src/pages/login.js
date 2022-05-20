import { Link, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
// import api from "../utils/api";
import { useAuth } from "../utils/auth";

const LoginPage = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));
            auth.login(values.email, values.password, () => {
                navigate('/dashboard', { replace: true });
            });
            // const formData = new FormData();
            // formData.append('email', values.email);
            // formData.append('password', values.password);
            // api.get('/sanctum/csrf-cookie').then((response) => {
            //     api.post('/api/login', formData).then((response) => {
            //         console.log(response.data);
            //         navigate('/dashboard');
            //     })
            // })
            // navigate('/dashboard', { replace: true });
        },
    });
    return (
        <>
            <main>
                <div className="container">

                    <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                                    <div className="d-flex justify-content-center py-4">
                                        <a href="index.html" className="logo d-flex align-items-center w-auto">
                                            <img src="/img/logo.png" alt="" />
                                            <span className="d-none d-lg-block">TestGIS</span>
                                        </a>
                                    </div>

                                    <div className="card mb-3">

                                        <div className="card-body">

                                            <div className="pt-4 pb-2">
                                                <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                                                <p className="text-center small">Enter your email & password to login</p>
                                            </div>

                                            <form className="row g-3" onSubmit={formik.handleSubmit}>

                                                <div className="col-12">
                                                    <label htmlFor="email" className="form-label">Email</label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        className="form-control"
                                                        id="email"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.email}
                                                        required
                                                    />
                                                </div>

                                                <div className="col-12">
                                                    <label htmlFor="password" className="form-label">Password</label>
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        className="form-control"
                                                        id="password"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.password}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-12">
                                                    <button className="btn btn-primary w-100" type="submit">Login</button>
                                                </div>
                                                <div className="col-12">
                                                    <p className="small mb-0">Don't have account? <Link to='/register'>Create an account</Link></p>
                                                </div>
                                            </form>

                                        </div>
                                    </div>

                                    <div className="credits">
                                        Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
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