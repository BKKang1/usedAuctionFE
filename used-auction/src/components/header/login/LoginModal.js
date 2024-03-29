import { Button, Modal } from "antd";
import { useState, useEffect } from "react";
import Login from "./LoginForm";
import { API } from "../../../config";

import { useRecoilState } from "recoil";
import { accessToken } from "../../../recoil/accessToken";
import { refreshToken } from "../../../recoil/refreshToken";
import { loginId, nicknameKey } from "../../../recoil/loginId";
import { useQuery } from "react-query";
import { redirect } from "react-router-dom";
import req from "../../../axios/req";
const LoginModal = () => {
  const [token, setToken] = useRecoilState(accessToken);
  const [refToken, setRefToken] = useRecoilState(refreshToken);
  const [id, setId] = useRecoilState(loginId);
  const [name, setName] = useRecoilState(nicknameKey);
  const reIssue = () => {
   
    if (token) {
      req
        .post(API.REISSUE, {
          accessToken: token,
          refreshToken: refToken,
        })
        .then((res) => {
          setToken(res.data.result.accessToken);
          setRefToken(res.data.result.refreshToken);
        })
        .catch(() => {
          setToken(null);
          setRefToken(null);
          setName(null);
          setId(null);
        });
    }
  };
  const isLoginState = () =>
    req
      .get(API.ISLOGIN)
      .then((response) => {
     
        if (response.data.result.status === true) {
      
          setName(response.data.result.name);
          setId(response.data.result.loginId);
        } else if (response.data.result.status === false) {
          setToken(null);
          setRefToken(null);
          setName(null);
          setId(null);
        }
      })
      .catch(() => {
        setToken(null);
        setRefToken(null);
        setName(null);
        setId(null);
      });

  useQuery(["refresh_token"], reIssue, {
    refetchInterval: 60 * 25 * 1000, //25분마다 refresh하여 access토큰 재발급
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: false,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    isLoginState();
  }, [token]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const logout = () => {

    req
      .post(API.LOGOUT, token)
      .then((response) => {

        setToken(null);
        setRefToken(null);
        setName(null);
        setId(null);
      })
      .catch(() => {
        setToken(null);
        setRefToken(null);
        setName(null);
        setId(null);
      });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const LoginModalStyle = {
    backgroundColor: "black",
  };

  return (
    <>
      <Button
        type="primary"
        style={LoginModalStyle}
        onClick={name === null ? showModal : logout}
      >
        {name === null ? "로그인/회원가입" : `${name}님 로그아웃`}
      </Button>
      <Modal
        title="로그인"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
        destroyOnClose="true"
      >
        <Login onCancel={handleCancel} setName={setName}></Login>
      </Modal>
    </>
  );
};
export default LoginModal;
