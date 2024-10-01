import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";

const QuizComponent = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const question = {
    text: "A software company's annual revenue increased by 12% in 2023 from $300,000 in 2022. What was the revenue in 2023?",
    options: ["$312,000", "$336,000", "$360,000", "$400,000"],
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-5 max-h-screen">
      <div className="lg:w-1/1 hidden md:block">
        <img src="question.png" alt="" style={{ maxHeight: "100vh" }} />
      </div>
      <div className="w-full max-lg-md mx-auto px-4 lg:px-0 lg:w-1/2 lg:ml-10" style={{ padding: "40px 20px 0px" }}>
        <div className="block md:hidden">
          <img src="logos.png" alt="logos" className="w-40 h-auto" />
        </div>

        <div className="flex justify-end">
          <button className="bg-[#2F4858] text-white py-3 px-4 rounded-full hover:bg-[#2F4858] transition duration-300 font-medium">
            Quiz Time: 12:00 mins
          </button>
        </div>
        <div className="flex justify-between items-center mb-6">
          <span className="text-md text-gray-600">Question 1 out of 20</span>
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
        <button className="mt-8 w-full md:w-[200px] bg-orange-400 text-white text-lg py-3 px-4 rounded-full hover:bg-orange-500 transition duration-300 font-medium">
  Next
</button>

      </div>
    </div>
  );
};

export default QuizComponent;
