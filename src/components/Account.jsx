import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

import './Account.css';


import Show from './show';

const Account = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      console.log('You are logged out')
    } catch (e) {
      console.log(e.message);
    }
  };


  return (
    <div>
      <div className='topic_acc'>
        <h1 className='text_acc'>Account</h1>
        <p className='text_acc'>User Email: {user && user.email}</p>

        <button className="btnlogout"onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div>
        <Show/>
      </div>


     

     




      
    </div>

    
  );
};

export default Account;
