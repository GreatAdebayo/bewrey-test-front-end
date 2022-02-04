import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import signUpAndAuthContext from '../../context/signup&auth/context'
import { useNavigate } from "react-router-dom";


const Login = () => {
  let navigate = useNavigate();
  const { login, setSubmitting, error, isAuthenticated } = useContext(signUpAndAuthContext)

  useEffect(() => {
    if (isAuthenticated)
    navigate('/dashboard');

    // eslint-disable-next-line
  }, [isAuthenticated])
  return <>
    {error ? <>
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
        initialValues={{ email: '', password: '' }}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = '*Email Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          } else if (!values.password) {
            errors.password = '*Password Required';
          }

          return errors;
        }}
        onSubmit={(values) => {
          setTimeout(() => {
            login(values)
          }, 400);
        }}
      >
        {() => (

          <Form>
            <div className="form-icon">
              <span><i className="icon icon-user"></i></span>
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
              <button type="submit" className="btn btn-block create-account" disabled={setSubmitting}>Login</button>
            </div>

          </Form>
        )}
      </Formik>
      <div className="social-media">
        <Link to='/' style={{ textDecoration: 'none' }}><h5>New? CREATE ACCOUNT</h5></Link>
      </div>
    </div>

  </>
    ;
};

export default Login;
