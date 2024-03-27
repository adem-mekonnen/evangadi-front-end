import styled from "styled-components";
import Auth from "../../components/auth/Auth";
import { useAppData } from "../../App";
import HomePage from "../home/HomePage";

function Dashboard() {
  const { state } = useAppData();
  const token = localStorage.getItem("token");

  if (token) {
    return <HomePage />;
  }

  return (
    <Wrapper>
      <div className="container px-md-5">
        <div className="row">
          <div className="col-12 col-md-5 shadow auth mx-md-4">
            <Alert>{state.alert}</Alert>
            <Auth />
          </div>
          <div className="col-12 col-md-6 explained">
            <AboutSection>
              <h1>Evangadi Networks</h1>
              <p>
                No matter what stage of life you are in, whether you’re just
                starting elementary school or being promoted to CEO of a Fortune
                500 company, you have much to offer to those who are trying to
                follow in your footsteps.
              </p>
              <p>
                Whether you are willing to share your knowledge or you are just
                looking to meet mentors of your own, please start by joining the
                network here.
              </p>
              <Button>HOW IT WORKS</Button>
            </AboutSection>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  background-repeat: no-repeat;
  background-size: cover;
  padding-top: 140px;
  margin-bottom: 50px;
  background-image: url("./bg-svg-f.svg");

  .auth {
    background-color: white;
    border-radius: 5px;
    height: auto;
    min-height: 450px;
    padding: 15px 30px 25px;
  }

  @media (max-width: 768px) {
    .auth {
      width: 90%;
      margin: 25px auto;
    }
  }
`;

const Alert = styled.p`
  text-align: center;
  color: red;
  font-family: monospace;
`;

const AboutSection = styled.div`
  padding-left: 25px;

  h1 {
    color: #4b456f;
    font-size: 2.5rem;
    margin-bottom: 25px;
  }
`;

const Button = styled.button`
  background-color: #fe8402;
  border: none;
  color: white;
  border-radius: 5px;
  padding: 5px 15px;
`;

export default Dashboard;
