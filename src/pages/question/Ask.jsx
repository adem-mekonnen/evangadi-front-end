import { useState } from "react";
import styled from "styled-components";
import { BsFillArrowRightCircleFill, BsDot } from "react-icons/bs";
import axios from "../../components/api/axios";
import { useNavigate, Link } from "react-router-dom";
import { useAppData } from "../../App";

function Ask() {
  const navigate = useNavigate();
  const { dispatch } = useAppData();
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const inputAlert = () => {
    setMsg("Please fill in all the fields.");
  };

  const postQuestion = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      inputAlert();
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post(
        "/question",
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMsg("Question posted successfully. Redirecting to home page .....");
      setTitle("");
      setDescription("");

      setTimeout(() => {
        navigate("/home");
        setMsg("");
        setLoading(false);
      }, 5000);
    } catch (error) {
      setMsg("");
      setLoading(false);
      localStorage.setItem("token", "");
      dispatch({ type: "LOGOUT" });
      navigate("/");
      console.log(response.data);
    }
  };

  return (
    <Wrapper>
      <ContentWrapper>
        <div className="centered-text">
          <h3>Steps To Write A Good Question</h3>
          <div className="centered-steps">
            <div className="step">
              <span>
                <BsDot size={50} />
              </span>
              <span>Summerize your problems in a one-line-title.</span>
            </div>
            <div className="step">
              <span>
                <BsDot size={50} />
              </span>
              <span>Describe your problem in more detail.</span>
            </div>
            <div className="step">
              <span>
                <BsDot size={50} />
              </span>
              <span>
                Describe what you tried and what you expected to happen.
              </span>
            </div>
            <div className="step">
              <span>
                <BsDot size={50} />
              </span>
              <span>Review your question and post it here.</span>
            </div>
          </div>
        </div>
      </ContentWrapper>
      <div className="ask mt-5 text-center">
        <h3>Ask a public question</h3>
        <Link
          to="/"
          className=" text-decoration-none cursor-pointer text-center"
        >
          Go to question page
        </Link>
        <form onSubmit={postQuestion}>
          <p className="text-success text-center">{msg}</p>
          <div className="form-title w-75 w-md-50 mx-auto my-3">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Question title"
              type="text"
              className="w-100 py-2 px-3"
            />
          </div>
          <div className="form-desc w-75 w-md-50 mx-auto">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Question datail ..."
              rows="4"
              className="w-100 px-3 py-2"
            ></textarea>
          </div>
          <div className="w-75 mx-auto mt-4">
            <button disabled={loading} className="btn btn-primary ">
              Post Question
            </button>
          </div>
        </form>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  background-color: #fafafa;
  padding-top: 120px;
  padding-bottom: 50px;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export default Ask;
