import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCheck } from "react-icons/fa";
import ApiConfig from "../apiConfig/ApiConfig";

const QuizComponent = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [candidateId] = useState(2); 
  const [questionId, setQuestionId] = useState(1); 

  const fetchQuestion = async (id) => {
    try {
      const response = await axios.get(
        `${ApiConfig.baseUrl}${ApiConfig.endpoints.getSingleQuestion(id)}`
      );

      if (response.data.status === "success") {
        const { question_text, A, B, C, D } = response.data.data;
        setQuestion({
          text: question_text,
          options: [A, B, C, D],
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
    fetchQuestion(questionId);
  }, [questionId]);

  const handleNext = async () => {
    if (!selectedAnswer) {
      return; // Do nothing if no answer is selected
    }

    try {
      const response = await axios.post(
        `${ApiConfig.baseUrl}${ApiConfig.endpoints.submitAnswer}`,
        {
          question_id: questionId,
          candidate_id: candidateId,
          user_selected_answer: selectedAnswer,
        }
      );

      // Move to the next question regardless of API response
      setQuestionId((prevId) => prevId + 1);
      setSelectedAnswer(null);

      if (response.data.status !== "success") {
        console.error("Error submitting answer:", response.data.message);
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row items-center gap-5 max-h-screen">
      <div className="lg:w-1/1 hidden md:block">
        <img src="online_test.png" alt="" style={{ maxHeight: "100vh" }} />
      </div>
      <div
        className="w-full max-lg-md mx-auto px-4 lg:px-0 lg:w-1/2 lg:ml-10"
        style={{ padding: "40px 20px 0px" }}
      >
        <div className="block md:hidden">
          <img src="logos.png" alt="logos" className="w-40 h-auto" />
        </div>

        <div className="flex justify-end">
          <button className="bg-[#2F4858] text-white py-3 px-4 rounded-full hover:bg-[#2F4858] transition duration-300 font-medium">
            Quiz Time: 12:00 mins
          </button>
        </div>
        <div className="flex justify-between items-center mb-6">
          <span className="text-md text-gray-600">Question {questionId} out of 20</span>
        </div>
        <h2 className="text-lg font-semibold mb-6">{question.text}</h2>
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
                {option}
              </span>
            </label>
          ))}
        </div>
        <button
          className="mt-8 w-full md:w-[200px] bg-orange-400 text-white text-lg py-3 px-4 rounded-full hover:bg-orange-500 transition duration-300 font-medium"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuizComponent;
