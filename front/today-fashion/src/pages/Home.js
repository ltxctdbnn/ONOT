import CustomSignIn from '../components/CustomSignIn';
import UserInfoForm from '../components/UserInfoForm';
import 'react-datepicker/dist/react-datepicker.css';
import { SERVER_URL } from '../config';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userNick } from '../states/state';
import React, { useCallback, useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { useLocalStorage } from '../customHooks/useLocalStorage';

const Home = ({ location, history }) => {
  const [user, setUser] = useRecoilState(userNick);
  const [token, setToken] = useLocalStorage('access_token', null);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);

  const { from } = location.state || { from: { pathname: '/main' } };

  const handleSignUp = useCallback(
    async (data) => {
      try {
        const res = await axios.post(SERVER_URL + '/sign-up', data);
        setToken(res.data.access_token);
        setUser(res.data.nickname);
        setOpenSignUp(false);
        history.push('/main');
        //로그인 시켜준 후 게임 화면으로 이동
      } catch (error) {
        if (error.response.data.errorCode === 'Alr_Signed_email') {
          alert(error.response.data.msg);
          setOpenSignUp(false);
          setOpenSignIn(true);
        } else if (error.response.data.errorCode === 'Alr_Signed_nickname') {
          alert(error.response.data.msg);
        } else if (error.response.data.errorCode === 'Invalid_pw') {
          alert(error.response.data.msg);
        } else {
          alert(error);
        }
      }
    },
    [history, setToken, setUser]
  );

  const handleCustomSignIn = useCallback(
    async (data) => {
      try {
        const res = await axios.post(SERVER_URL + '/sign-in', data);
        setToken(res.data.access_token);
        setUser(res.data.nickname);
        setOpenSignIn(false);
        history.push('/main');
      } catch (error) {
        if (error.response.data.errorCode === 'Not_Exists') {
          alert(error.response.data.msg);
        } else if (error.response.data.errorCode === 'Missing_email') {
          alert(error.response.data.msg);
        } else if (error.response.data.errorCode === 'Missing_pw') {
          alert(error.response.data.msg);
        } else {
          alert(error);
        }
      }
    },
    [history, setToken, setUser]
  );

  useEffect(() => {
    return () => {
      setOpenSignIn(false);
      setOpenSignUp(false);
      //unmount memory leak 에러 방지용
    };
  }, []);

  if (token) {
    return <Redirect to={from} />;
    //로그인 된 상태라면 직전에 있었던 페이지 혹은 main으로 redirect된다.
  }

  return (
    <div className="home-container">
      {!openSignIn && !openSignUp ? (
        <div className="home-button-group">
          <input
            type="button"
            value="Sign In"
            onClick={() => {
              setOpenSignIn(!openSignIn);
            }}
          />
          <input
            type="button"
            value="Sign Up"
            onClick={() => {
              setOpenSignUp(!openSignUp);
            }}
          />
        </div>
      ) : null}
      {openSignIn ? (
        <div className="signin-modal">
          <CustomSignIn handleCustomSignIn={handleCustomSignIn} />
          <button
            type="button"
            onClick={() => {
              setOpenSignIn(!openSignIn);
            }}
          >
            &#10006;
          </button>
        </div>
      ) : null}
      {openSignUp ? (
        <div className="signup-modal">
          <UserInfoForm handleUserInfoForm={handleSignUp} />
          <button
            type="button"
            onClick={() => {
              setOpenSignUp(!openSignUp);
            }}
          >
            &#10006;
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Home;