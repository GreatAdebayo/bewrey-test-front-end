import React, { useContext, useEffect, useState } from 'react';
import signUpAndAuthContext from '../../context/signup&auth/context'
// import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { loadUser, user, loading, uploadPicture, setSubmitting, error } = useContext(signUpAndAuthContext)
  const [picture, setPicture] = useState(null)

  useEffect(() => {
    loadUser()
    // eslint-disable-next-line
  }, [])


  const handlePicture = (e) => {
    setPicture(e.target.files[0])
  }

  const upload = () => {
    uploadPicture(picture)
  }

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
    {!loading ? <div className="container d-flex justify-content-center align-items-center">
      <div className="card">
        <div className="upper"> <img src="https://i.imgur.com/Qtrsrk5.jpg" className="img-fluid" alt='' /> </div>
        <div className="user text-center">
          <div className="profile"> <img src={user.profilepicture.url} className="rounded-circle" width="80" alt='' /> </div>
        </div>
        <div className="mt-5 text-center">
          <input className="form-control form-control-sm mt-2" id="formFileSm" type="file"
            onChange={handlePicture} />

          <h4 className="mb-0">{user.firstname}</h4> <span className="text-muted d-block mb-2">{user.lastname}</span> <button className="btn btn-primary btn-sm follow" onClick={upload} disabled={setSubmitting}>Upload</button>
          <div className="d-flex justify-content-between align-items-center mt-4 px-4">
            <div className="stats">
              <h6 className="mb-0">{user.email}</h6>
            </div>

          </div>
        </div>
      </div>
    </div> : ''}
  </>;
};

export default Profile;
