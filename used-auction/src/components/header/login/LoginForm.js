import { Button, Form, Input } from "antd";
import SignUpModal from "../Signup/SignUpModal";

import { API } from "../../../config";
import { useRecoilState } from "recoil";
import { accessToken } from "../../../recoil/accessToken";
import { refreshToken } from "../../../recoil/refreshToken";
import { useEffect } from "react";
import req from "../../../axios/req";
import axios from "axios";

const btnBoxstyle = {
  display: "flex",
  flexDirection: "row-reverse",
  margin: "0 1rem",
};
const btnStyle = {
  margin: "0 1rem",
  backgroundColor: "green",
};
const formStyle = {
  marginTop: "2rem",
  marginRight: "2rem",
};
const LoginForm = ({ onCancel, setName }) => {
  const [token, setToken] = useRecoilState(accessToken);
  const [refToken, setRefToken] = useRecoilState(refreshToken);

  const onFinish = (values) => {
    const json = JSON.stringify(values);
   

    axios
      .post(API.LOGIN, json)
      .then((response) => {
       
        setToken(response.data.result.accessToken);
        setRefToken(response.data.result.refreshToken);
      })

      .then(() => onCancel())
      .catch(()=>{alert("잘못된 아이디나 비밀번호입니다!")})
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      labelCol={{
        span: 7,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        style={formStyle}
        label="아이디"
        name="loginId"
        rules={[
          {
            required: true,
            message: "아이디를 입력하세요",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        style={formStyle}
        label="비밀번호"
        name="password"
        rules={[
          {
            required: true,
            message: "비밀번호를 입력하세요",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <div style={btnBoxstyle}>
        <Form.Item wrapperCol={{ offset: 2, span: 16 }} style={formStyle}>
          <Button style={btnStyle} type="primary" htmlType="submit">
            로그인
          </Button>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }} style={formStyle}>
          <SignUpModal></SignUpModal>
        </Form.Item>
      </div>
    </Form>
  );
};
export default LoginForm;
