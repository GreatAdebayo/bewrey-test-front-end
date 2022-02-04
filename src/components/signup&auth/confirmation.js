import React, { useContext, useEffect} from 'react';
import signUpAndAuthContext from '../../context/signup&auth/context'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useParams } from 'react-router';
import { useNavigate } from "react-router-dom";

const Confirmation = () => {
    const { setSubmitting, confirmEmail, error, isAutheticated} = useContext(signUpAndAuthContext)
    let navigate = useNavigate();
    let params = useParams();
    
    useEffect(()=>{
    if(isAutheticated)
     navigate('/dashboard');
     // eslint-disable-next-line
    }, [isAutheticated])
    
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
                initialValues={{ code: '', email: params.confirmation }}
                validate={values => {
                    const errors = {};
                    if (!values.code) {
                        errors.code = '*Code Required';
                    } else if (Math.ceil(Math.log10(values.code + 1)) > 4) {
                        errors.code = '*Code is 4-digit';
                    } else if (Math.ceil(Math.log10(values.code + 1)) < 4) {
                        errors.code = '*Code is 4-digit';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    return errors;
                }}
                onSubmit={(values) => {
                    setTimeout(() => {
                    confirmEmail(values)
                    }, 400);
                }}
            >
                {() => (
                    <Form>
                        <div className="form-icon">
                            <span><i className="icon icon-user"></i></span>
                        </div>
                        <div className="form-group">
                            <Field type="number" className="form-control item" name="code" placeholder="Enter verification code" />
                            <ErrorMessage name="code" component="small" className='text-danger' />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-block create-account" disabled={setSubmitting}>Submit</button>
                        </div>
                    </Form>
                )}
            </Formik>
            <div className="social-media">
                <h5>Resend Code</h5>
            </div>
        </div>
    </>
        ;
};

export default Confirmation;
