import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(false);
  const [loginActive, setLoginActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/todo");
    }

    if (email.includes("@") && password.length >= 8) {
      setLoginActive(true);
    }
  }, [navigate, email, password]);

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };

    if (newAccount) {
      axios
        .post("http://localhost:8000/auth/signup", JSON.stringify(data), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          localStorage.setItem("access_token", res.data.access_token);
          navigate("/todo");
        })
        .catch((err) => {
          // eslint-disable-next-line default-case
          switch (err.request.status) {
            case 400:
              window.alert("이미 존재하는 회원입니다.");
          }
        });
    } else {
      axios
        .post("http://localhost:8000/auth/signin", JSON.stringify(data), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          localStorage.setItem("access_token", res.data.access_token);
          navigate("/todo");
        })
        .catch((err) => {
          // eslint-disable-next-line default-case
          switch (err.request.status) {
            case 401:
              window.alert("비밀번호가 다릅니다.");
          }
        });
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <LoginArea>
      <ToggleBtn onClick={toggleAccount} style={{ cursor: "pointer" }}>
        {" "}
        {newAccount ? "로그인하러 가기" : "회원가입하러 가기"}
      </ToggleBtn>
      <LoginFormed onSubmit={onSubmit}>
        <LoginInput
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <LoginInput
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <SubmitBtn
          type="submit"
          disabled={!loginActive}
          value={newAccount ? "회원가입" : "로그인"}
        />
        {newAccount ? <Notice> 비밀번호는 8자 이상입니다.</Notice> : <></>}
      </LoginFormed>
    </LoginArea>
  );
}

const LoginArea = styled.div`
  width: 500px;
  height: 500px;
  margin: 20vh auto;
  background-color: #999;
  box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  position: relative;
`;

const LoginFormed = styled.form`
  padding: 20px;
`;
const LoginInput = styled.input`
  width: 100%;
  margin-bottom: 12px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  box-sizing: border-box;
  font-size: 14px;
`;

const SubmitBtn = styled(LoginInput)`
  cursor: pointer;
  box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.3);
`;

const Notice = styled.p`
  text-align: center;
`;

const ToggleBtn = styled.button`
  cursor: poiter;
  position: absolute;
  bottom: 16px;
  right: 16px;
  width: 180px;
  height: 30px;
`;
