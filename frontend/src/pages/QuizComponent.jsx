import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCheck } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import ApiConfig from "../apiConfig/ApiConfig";

const QuizComponent = () => {
  const navigate = useNavigate();

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [candidateId] = useState();

  const [questionId, setQuestionId] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(12 * 60);
  const [isTimeUpModalOpen, setIsTimeUpModalOpen] = useState(false);

  const location = useLocation();
  const { startTimer, candidateId } = location.state || {};

  const fetchQuestion = async (id) => {
    try {
      const response = await axios.get(
        `${ApiConfig.baseUrl}${ApiConfig.endpoints.getSingleQuestion(id)}`
      );

      if (response.data.status === "success") {
        const { question_text, A, B, C, D } = response.data.data;
        setQuestion({
          text: question_text,
          options: [
            { label: "A", value: A },
            { label: "B", value: B },
            { label: "C", value: C },
            { label: "D", value: D },
          ],
        });
        setQuestionId(response.data.data.id);
      } else {
        console.error("Error fetching question:", response.data.message);
      }
    } catch (error) {
      console.error("API error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (startTimer) {
      const timerInterval = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerInterval);
            setIsTimeUpModalOpen(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [startTimer]);

  useEffect(() => {
    fetchQuestion(questionId);
  }, [questionId]);

  const handleNext = async () => {
    if (!selectedAnswer) {
      return;
    }

    try {
      const response = await axios.post(
        `${ApiConfig.baseUrl}${ApiConfig.endpoints.submitAnswer}`,
        {
          question_id: questionId,
          candidate_id: candidateId,
          user_selected_answer: selectedAnswer.label,
        }
      );

      if (response.data.status === "success") {
        if (questionId > 19) {
          navigate("/submitted");
        } else {
          setQuestionId((prevId) => prevId + 1);
        }
        setSelectedAnswer(null);
      } else {
        console.error("Error submitting answer:", response.data.message);
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleClose = () => {
    navigate("/");
    window.history.pushState(null, "", window.location.href);
    setTimeout(() => {
      if (window.opener) {
        window.close();
      }
    }, 1000);
  };

  return (
    <div className="relative"
  >
     <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: "url('background.png')",
        }}
      ></div>
 <div className="flex flex-col md:flex-row items-center gap-5 max-h-screen">
      <div className="lg:w-1/1 hidden lg:block">
        <img src="online_test.png" alt="" style={{ maxHeight: "100vh" }} />
      </div>
      <div
        className="w-full max-lg-md mx-auto px-4 lg:px-0 lg:w-1/2 lg:ml-10"
        style={{ padding: "40px 20px 0px" }}
      >
        <div className="block lg:hidden mb-4">
          <img src="logos.png" alt="logos" className="w-40 h-auto" />
        </div>

        <div className="flex justify-end">
          <button className="bg-[#2F4858] text-white py-3 px-4 rounded-full hover:bg-[#2F4858] transition duration-300 font-medium">
            Quiz Time: {formatTime(timeRemaining)}
          </button>
        </div>

        <div className="flex justify-between items-center mb-6">
          <span className="text-md text-gray-600">
            Question {questionId} out of 20
          </span>
        </div>

        {/* <h2 className="text-lg font-semibold mb-6">{question.text}</h2> */}
        <h2 className="text-lg font-semibold mb-6">
      {question.type === "formatted-text" ? (
        <span dangerouslySetInnerHTML={{ __html: question.text }} />
      ) : (
        question.text
      )}
    </h2>
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <label
              key={index}
              className="flex items-center space-x-3 p-3 cursor-pointer"
              onClick={() => setSelectedAnswer(option)}
            >
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedAnswer === option
                    ? "border-blue-500 bg-blue-500"
                    : "border-gray-300"
                }`}
              >
                {selectedAnswer === option && (
                  <FaCheck className="text-white text-xs" />
                )}
              </div>
              <span
                className={
                  selectedAnswer === option
                    ? "text-blue-500 font-medium"
                    : "text-gray-700"
                }
              >
                {option.value}
              </span>
            </label>
          ))}
        </div>

        <button
          className="mt-8 w-full md:w-[200px] bg-orange-400 text-white text-lg py-3 px-4 rounded-full hover:bg-orange-500 transition duration-300 font-medium"
          onClick={handleNext}
        >
          {questionId >= 20 ? "Submit" : "Next"}
        </button>

        {isTimeUpModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-85 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-[400px]">
              <h1 className="text-[36px] text-center mb-4 font-bold">
                Time's Up!
              </h1>
              <h5 className="text-center mb-4">
                Your time to complete the test is over.
              </h5>
              <button
                className="w-full bg-red-500 text-white py-2 rounded"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
   
  );
};

export default QuizComponent;
