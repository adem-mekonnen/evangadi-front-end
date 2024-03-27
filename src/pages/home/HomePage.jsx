import { useEffect, useState } from "react";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { FaAngleRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "../../components/api/axios";
import { useAppData } from "../../App";

function HomePage() {
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const { state, dispatch } = useAppData();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const { data } = await axios.get("/question", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuestions(data.questions);
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

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredQuestions = questions.filter((question) =>
    question.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Wrapper>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-8 mb-4">
            <Link to={"/ask"}>
              <button className="btn btn-primary">Ask Question</button>
            </Link>
          </div>
          <div className="col-12 col-md-4 pt-2 loged-user">
            Wellcome: <span>{state.user.split("@")[0]}</span>
          </div>
        </div>
        <div className="search-control">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search question"
          />
        </div>
        <div className="mt-4">
          {filteredQuestions.length === 0 ? (
            <p className="no-found">No questions found</p>
          ) : (
            filteredQuestions.map((question) => (
              <Link
                key={question.questionid}
                to={`/question/${question.questionid}`}
              >
                <div className="row question">
                  <hr />
                  <div className="col-12 col-md-2 user">
                    <div className="avatar">
                      <BsFillPersonVcardFill />
                    </div>
                    <div className="username">{question.username}</div>
                  </div>
                  <div className="col-10 col-md-9 my-md-4">
                    <p className="question-title">{question.title}</p>
                  </div>
                  <div className="col-2 col-md-1">
                    <div className="angle">
                      <FaAngleRight />
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  background-color: white;
  padding-top: 150px;
  padding-bottom: 50px;

  .search-control {
    margin: 15px auto;
    input {
      background-color: white;
      outline: none;
      width: 90%;
      padding: 10px;
      border: 0.3px solid #ccc;
      border-radius: 5px;
      color: #022553;
      font-family: monospace;
    }
    input::placeholder {
      color: #b0b0c3;
    }
    input:focus {
      border: 0.5px solid #7f7f99;
    }
  }
  .no-found {
    text-align: center;
    color: #022553;
    font-size: 25px;
    margin-top: 50px;
    text-transform: capitalize;
  }
  .loged-user {
    font-size: 1.1rem;
    font-family: cursive;
    span {
      color: #fe8082;
      font-weight: 900;
      font-size: 1.3rem;
      padding: 2px 5px;
      border-radius: 10px;
      background-color: #f9f8f7;
    }
  }
  .avatar {
    font-size: 3rem;
    color: #022553;
    border-radius: 50%;
    border: 0.5px solid #022553;
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s;
  }
  .username {
    font-family: cursive;
    margin: 10px 0 0 15px;
    letter-spacing: 2px;
    color: #012d66;
  }
  .question {
    position: relative;
  }
  .question-title {
    width: 95%;
    margin: 15px auto;
    font-family: cursive;
  }
  .question:hover {
    background-color: #f5f5f5;
    .avatar {
      background-color: #022553;
      color: #f9f8f7;
    }
    .angle {
      transform: translateX(15px);
    }
  }
  .angle {
    font-size: 1.5rem;
    position: absolute;
    top: 20%;
    transition: all 0.5s;
  }
  a {
    text-decoration: none;
    color: #012d66;
  }
`;

export default HomePage;
