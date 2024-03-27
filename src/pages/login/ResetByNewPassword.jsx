import { useState } from "react";
import axios from "axios"; // Assuming axios is installed as a dependency
import styled from "styled-components";
import backgroundImage from "../../components/images/Evangadi-Forum-BG.jpg";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Define ErrorMessage component
const ErrorMessage = ({ message }) => {
  return <p style={{ color: "red" }}>{message}</p>;
};

const ResetByNewPassword = () => {
  const { token } = useParams(); // Extract reset token from URL
  console.log("Token:", token); // Log token to check if it's defined
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(""); // Define error state
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5003/api/v1/resetPassword`, // Assuming this is your backend endpoint for resetting password
        {
          newPassword,
          token, // Send the reset token along with the new password
        }
      );

      if (response.data.success) {
        // Assuming the backend responds with a success message upon successful password reset
        setResetSuccess(true);
      } else {
        setError(response.data.message); // Assuming the backend provides a message for failed password reset
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setError("An error occurred while resetting the password");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((state) => !state);
  };

  return (
    <Container>
      <Wrap>
        <ResetByNew>
          {resetSuccess ? (
            <p>
              Password reset successful! You can now log in with your new
              password.
            </p>
          ) : (
            <div>
              <h2>Reset Password</h2>
              <InputContainer>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <EyeIcon onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </EyeIcon>
              </InputContainer>
              <br />
              <br />
              <InputContainer>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <EyeIcon onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </EyeIcon>
              </InputContainer>
              <br />
              <br />
              <button onClick={handleResetPassword}>Reset Password</button>
              {error && <ErrorMessage message={error} />}{" "}
              {/* Render ErrorMessage component */}
              <br />
              <br />
              <Link to="/">Already have an account?</Link>
              <br />
            </div>
          )}
        </ResetByNew>
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
            Whether you are willing to share your knowledge or you are just
            looking to meet mentors of your own, please start by joining the
            network here.
          </p>
          <button>HOW IT WORKS</button>
        </DescriptionStyle>
      </Wrap>
    </Container>
  );
};

export default ResetByNewPassword;

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

const ResetByNew = styled.div`
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
    cursor: pointer;
    &:hover {
      background-color: #fe8402;
    }

`;
const InputContainer = styled.div`
  position: relative;
`;
const EyeIcon = styled.small`
  cursor: pointer;
  position: relative;
  right: 30px;
  vertical-align: middle;
  margin-left: -12px;
  color: rgba(0, 0, 0, 0.4);
  &:hover {
    color: #ffb953;
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
