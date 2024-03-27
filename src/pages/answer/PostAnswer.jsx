import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { BsFillPersonVcardFill, BsRecordFill } from "react-icons/bs";
import axios from "../../components/api/axios";
import { useAppData } from "../../App";

function PostAnswer() {
  const navigate = useNavigate();
  const { state, dispatch } = useAppData();
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const [inputValue, setInputValue] = useState("");
  const [answers, setAnswers] = useState([]);
  const [question, setQuestion] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetchQuestion();
    fetchAnswers();
  }, []);

  const fetchQuestion = async () => {
    try {
      const { data } = await axios.get(`/question/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuestion(data.question);
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  const fetchAnswers = async () => {
    try {
      const { data } = await axios.get(`/answer/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnswers(data.answers);
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  const handleErrorResponse = (error) => {
    console.log(error.response.data);
    localStorage.setItem("token", "");
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const postAnswer = async (e) => {
    e.preventDefault();
    const value = inputValue.trim();
    if (!value) {
      return;
    }
    try {
      setLoading(true);
      await axios.post(
        `/answer`,
        { questionid: id, answer: value },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLoading(false);
      setInputValue("");
      setMsg("Answer posted successfully");
      setTimeout(() => setMsg(""), 5000);
      fetchAnswers();
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  return (
    <Wrapper>
      <div className="container">
        <div className="question mb-5">
          <h2 className="mb-3">QUESTION</h2>
          <div className="title mb-2 text text-primary">
            <span>
              <BsRecordFill />
            </span>
            {question[0]?.title}
          </div>
          <div className="description w-75">
            <p>{question[0]?.description}</p>
          </div>
        </div>
        <hr />
        <h1>Answer From The Community</h1>
        <hr />
        <div className="answer-container my-5 w-md-75 mx-auto">
          {answers.map((val, i) => (
            <div key={i} className="row">
              <div className="col-3 col-md-2 col-lg-1 user">
                <div className="avatar">
                  <BsFillPersonVcardFill />
                </div>
                <div className="username">{val.username}</div>
              </div>
              <div className="col-md-9 col-8">
                <p className="answer">{val.answer}</p>
              </div>
              <hr className="w-75 mt-2" />
            </div>
          ))}
        </div>
        <div className="post mx-auto w-md-75 ">
          <p className="text-success">{msg}</p>
          <div className="text-center">
            <h3>Answer the Top Question</h3>
            <Link
              to="/"
              className=" text-decoration-none cursor-pointer text-center"
            >
              Go to question page
            </Link>
          </div>
          <form onSubmit={postAnswer}>
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              rows="5"
              placeholder="Your answer ..."
              name="answer"
              className="w-100 px-3 pt-3 d-block mb-3"
            />

            <button disabled={loading} className="btn btn-primary">
              Post Your Answer
            </button>
          </form>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  background-color: #fafafa;
  padding-top: 120px;
  padding-bottom: 50px;

  .question {
    .title {
      span {
        font-size: 2.2rem;
        margin-right: 5px;
        color: #516cf0;
      }
      color: #482602;
      font-weight: 900;
      font-family: cursive;
      font-size: 1.6rem;
      text-transform: capitalize;
    }
    .description {
      margin-left: 45px;
      font-family: monospace;
      font-size: 1.2rem;
      font-weight: 600;
    }
  }
  .answer-container {
    border-radius: 2px;
    box-shadow: inset 2px 1px 1px rgba(170, 174, 197, 0.2);
    background-color: #f5f5f5;
    padding-left: 25px;
    max-height: 300px;
    overflow-y: scroll;
    overflow-x: hidden;
    .avatar {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.5rem;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      color: white;
      background-color: #022553;
    }
    .username {
      font-size: 0.8rem;
    }
  }
  textarea {
    border: 0.5px solid #35355e;
    border-radius: 5px;
  }
`;

export default PostAnswer;
