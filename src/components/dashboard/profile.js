import React, { useContext, useEffect} from 'react';
import signUpAndAuthContext from '../../context/signup&auth/context'
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { loadUser, user, loading} = useContext(signUpAndAuthContext)

  useEffect(() => {
    loadUser()
       // eslint-disable-next-line
       }, [])

  return <>
    {!loading ?   <div class="container d-flex justify-content-center align-items-center">
    <div class="card">
        <div class="upper"> <img src="https://i.imgur.com/Qtrsrk5.jpg" class="img-fluid"/> </div>
        <div class="user text-center">
            <div class="profile"> <img src="https://i.imgur.com/JgYD2nQ.jpg" class="rounded-circle" width="80"/> </div>
        </div>
        <div class="mt-5 text-center">
            <h4 class="mb-0">{user.firstname}</h4> <span class="text-muted d-block mb-2">{user.lastname}</span> <button class="btn btn-primary btn-sm follow">Upload</button>
            <div class="d-flex justify-content-between align-items-center mt-4 px-4">
                <div class="stats">
                    <h6 class="mb-0">{user.email}</h6>
                </div>
      
            </div>
        </div>
    </div>
</div>:''}
  </>;
};

export default Profile;
