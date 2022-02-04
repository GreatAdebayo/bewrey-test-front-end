import React, { useContext, useEffect} from 'react';
import signUpAndAuthContext from '../../context/signup&auth/context'

const Profile = () => {
  const { loadUser, loading } = useContext(signUpAndAuthContext)
  useEffect(() => {
    loadUser();
   // eslint-disable-next-line
   }, [])
  return <div>
      sss
  </div>;
};

export default Profile;
