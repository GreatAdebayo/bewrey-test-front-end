import React, { useContext, useEffect, useState } from 'react';
import signUpAndAuthContext from '../../context/signup&auth/context'
// import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { loadUser, user, loading, uploadPicture, setSubmitting } = useContext(signUpAndAuthContext)
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
