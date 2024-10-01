import React from "react";
import { useNavigate } from "react-router-dom";

const SubmittedPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row items-center gap-5 max-h-screen">
      <div className="lg:w-1/1 hidden lg:block">
        <img src="online_test.png" alt="" style={{ maxHeight: "100vh" }} />
      </div>
      <div
        className="w-full max-lg-md mx-auto px-4 lg:px-0 lg:w-1/2 lg:ml-10"
        style={{ padding: "40px 20px 0px" }}
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#009813]">Success !!!</h1>
          <p className="mt-4 text-lg">
            Thank you for having your interview with us. One of our team members
            will contact you shortly if you are selected.
          </p>
        </div>
        <div className="flex justify-center">
          <button
            className="mt-4 w-full md:w-[300px] bg-orange-400 text-white text-lg py-3 px-4 rounded-md hover:bg-orange-500 transition duration-300 font-medium"
            onClick={() => navigate("/")}
          >
            Go Back to home page
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmittedPage;
