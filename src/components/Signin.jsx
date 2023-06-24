import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import './STsignin.css';

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleCheckboxChange = () => {
    setShowPassword(!showPassword);
  };




  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try {
      await signIn(email, password)
      navigate('/account')
    } catch (e) {
      setError(e.message)
      console.log(e.message)
    }
  };

  return (
    <div>
      <div>
        <h1 className='topic1'>Sign in to your account</h1>

      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label className='topic2'>Email Address</label>
          <input onChange={(e) => setEmail(e.target.value)} type='email'/>
        </div>
        <div>
          <label className='topic2'>Password</label>
          <input onChange={(e) => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'}/>
          <input type="checkbox" onChange={handleCheckboxChange} className='boxcheck'/>
          <label className='boxcheck'>Show Password</label>
        </div >

        <div className='buttondiv'>
        <button className='btnSignin'>
          Sign In
        </button>
        </div>

        <div className='texterror'>
          {error}
        </div>
      </form>
    </div>
  );
};

export default Signin;
