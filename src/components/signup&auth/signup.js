import React, { useContext, useEffect} from 'react';
import { Link } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import signUpAndAuthContext from '../../context/signup&auth/context'
import { useNavigate } from "react-router-dom";


const Signup = () => {
    const { signup, setSubmitting, error, confirmation} = useContext(signUpAndAuthContext)
    let navigate = useNavigate();

    useEffect(()=>{
    if(confirmation){
    navigate(`/confirmation/${confirmation}`);
    }
    // eslint-disable-next-line
    }, [confirmation])

    return <>
        {error  ? <>
            <div className="col-auto container">
                <div className="alert bg-success" role="alert">
                    <div className="d-flex"> <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-check-circle">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                        <div className="px-3">
                            <h5 className="alert-heading">Error!</h5>
                            <p className="text-capitalize">{error.msg}</p>
                        </div>
                    </div>
                </div>
            </div></> : null}
        <div className="registration-form">
            <Formik
                initialValues={{ firstname: '', lastname: '', email: '', password: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.firstname) {
                        errors.firstname = '*Firstname Required';
                    }
                    else if (!values.lastname) {
                        errors.lastname = '*Lastname Required';
                    }
                    else if (!values.email) {
                        errors.email = '*Email Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    } else if (!values.password) {
                        errors.password = '*Password Required';
                    }
                    else if (values.password.length < 8) {
                        errors.password = '*Password Should be 8 characters';
                    }

                    return errors;
                }}
                onSubmit={(values) => {
                    setTimeout(() => {
                        signup(values)
                    }, 400);
                }}
            >
                {() => (
                    <Form>
                        <div className="form-icon">
                            <span><i className="icon icon-user"></i></span>
                        </div>
                        <div className="form-group">
                            <Field type="text" className="form-control item" name="firstname" placeholder="Firstname" />
                            <ErrorMessage name="firstname" component="small" className='text-danger' />
                        </div>
                        <div className="form-group">
                            <Field type="text" className="form-control item" name="lastname" placeholder="Lastname" />
                            <ErrorMessage name="lastname" component="small" className='text-danger' />
                        </div>
                        <div className="form-group">
                            <Field type="email" className="form-control item" name="email" placeholder="Email" />
                            <ErrorMessage name="email" component="small" className='text-danger' />
                        </div>
                        <div className="form-group">
                            <Field type="password" className="form-control item" name="password" placeholder="Password" />
                            <ErrorMessage name="password" component="small" className='text-danger' />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-block create-account" disabled={setSubmitting}>Create Account</button>
                        </div>
                    </Form>
                )}
            </Formik>


            <div className="social-media">
                <Link to='/login' style={{ textDecoration: 'none' }}><h5>Already have an account? LOGIN</h5></Link>
            </div>
        </div>
    </>

};

export default Signup;
