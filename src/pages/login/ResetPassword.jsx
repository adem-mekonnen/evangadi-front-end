import { useState } from "react";
import axios from "../../components/api/axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../components/images/Evangadi-Forum-BG.jpg";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5003/api/v1/resetPassword",
        { email }
      );

      setMessage(response.data.message);
    } catch (error) {
      console.error("Error requesting password reset:", error);
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <Container>
      <Wrap>
        <ResetByEmail>
          <h2>Reset your password</h2>
          <p>
            Fill in your e-mail address below and we will send you an email with
            further instructions.
          </p>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />
          <button onClick={handleReset}>Reset your password</button>
          <br />
          <br />

          <p>{message}</p>
        </ResetByEmail>
        <DescriptionStyle>
          <p>About</p>
          <h1>Evangadi Networks</h1>
          <p>
            No matter what stage of life you are in, whether you’re just
            starting elementary school or being promoted to CEO of a Fortune 500
            company, you have much to offer to those who are trying to follow in
            your footsteps.
          </p>
          <p>
            Wheather you are willing to share your knowledge or you are just
            looking to meet mentors of your own, please start by joining the
            network here.
          </p>
          <button>HOW IT WORKS</button>
        </DescriptionStyle>
      </Wrap>
    </Container>
  );
};

export default ResetPassword;

const Container = styled.section`
  background-image: url(${backgroundImage});
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  background-repeat: no-repeat;
  background-size: cover;
  margin: 0;
  padding: 0;
  z-index: -1;

  @media (max-width: 768px) {
    background-image: url(${backgroundImage});
    padding-top: 400px;
    overflow-x: hidden;
    overflow-y: hidden;
  }
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding-top: 50px;

  margin-left: 20px;
  margin-right: 20px;

  @media (max-width: 768px) {
    padding-top: 170px;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
`;

const ResetByEmail = styled.div`
  padding-top: 60px;
  padding-bottom: 150px;
  padding-left: 40px;
  padding-right: 20px;
  text-align: left;
  width: 500px;
  background: white;
  border-radius: 5px;
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.1);
  margin-right: 20px;
  p {
    font-family: "Roboto", sans-serif !important;
    &:hover {
      color: #4a90e2;
    }
  }
  input {
    width: 90%;
    text-align: left;
    padding-top: 15px;
    padding-bottom: 15px;
    font-size: 16px;
    font-weight: 500;
    padding-left: 15px;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.3);
  }

  button {
    width: 94%;
    padding-top: 15px;
    padding-bottom: 15px;
    color: #ffffff;
    background: #516cf0;
    border: none;
    border-radius: 5px;
    margin-bottom: 10px;
    &:hover {
      background-color: #fe8402;
    }
  }

  a {
    cursor: pointer;
    color: #ffb953;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 768px) {
    width: 400px;
    margin-right: 40px;
    margin-left: 0px;
    margin-bottom: 20px;
  }
`;

const DescriptionStyle = styled.div`
  width: 500px;
  margin-left: 10px;
  font-size: 14px;
  text-align: justify;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.6);

  small {
    color: #fe8402;
  }

  button {
    margin-top: 30px;
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 15px;
    padding-bottom: 15px;
    color: #ffffff;
    background: #fe8402;
    border: none;
    border-radius: 5px;
    margin-bottom: 10px;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    margin-bottom: 730px;
    padding-top: 20px;
    width: 450px;
    margin-left: 0px;
    margin-right: 40px;
  }
`;
