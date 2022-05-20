import { Link, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import { useAuth } from "../utils/auth";

const RegisterPage = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: ''
        },
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));
            auth.register(values.name, values.email, values.password, () => {
                navigate('/dashboard', { replace: false });
            });
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
                                                <h5 className="card-title text-center pb-0 fs-4">Create an Account</h5>
                                                <p className="text-center small">Enter your personal details to create account</p>
                                            </div>

                                            <form className="row g-3" onSubmit={formik.handleSubmit}>
                                                <div className="col-12">
                                                    <label htmlFor="yourName" className="form-label">Your Name</label>
                                                    <input 
                                                        type="text" 
                                                        name="name" 
                                                        className="form-control" 
                                                        id="yourName"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.name}
                                                        required 
                                                    />
                                                </div>

                                                <div className="col-12">
                                                    <label htmlFor="yourEmail" className="form-label">Your Email</label>
                                                    <input 
                                                        type="email" 
                                                        name="email" 
                                                        className="form-control" 
                                                        id="yourEmail"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.email}
                                                        required 
                                                    />
                                                </div>

                                                <div className="col-12">
                                                    <label htmlFor="yourPassword" className="form-label">Password</label>
                                                    <input 
                                                        type="password" 
                                                        name="password" 
                                                        className="form-control" 
                                                        id="yourPassword" 
                                                        onChange={formik.handleChange}
                                                        value={formik.values.password}
                                                        required 
                                                    />
                                                </div>

                                                <div className="col-12">
                                                    <button className="btn btn-primary w-100" type="submit">Create Account</button>
                                                </div>
                                                <div className="col-12">
                                                    <p className="small mb-0">Already have an account? <Link to='/'>Log in</Link></p>
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
        </>
    );
}

export default RegisterPage;