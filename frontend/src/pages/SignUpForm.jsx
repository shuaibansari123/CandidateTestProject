import React from "react";

export default function SignUpForm() {
  return (
    <div className="">
      <div className="flex flex-col md:flex-row items-center gap-8 min-h-screen">
        <div className="lg:w-1/2">
          <img
            src="question.png"
            alt="Hand marking checkboxes"
            // className="w-full"
            style={{ maxHeight: "100vh" }}
          />
        </div>
        <div className="lg:w-1/3">
          <h1 className="text-3xl font-bold mb-6">
            Please Sign up for the test!
          </h1>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Enter Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name here..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="+91"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Enter Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your Email here..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="testType"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Enter Test Type
              </label>
              <input
                type="text"
                id="testType"
                name="testType"
                placeholder="Aptitude Test"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="ctc"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Expected CTC
              </label>
              <input
                type="text"
                id="ctc"
                name="ctc"
                placeholder="For Ex. 35000"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <button
                type="submit"
                className="py-2 px-4 mt-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-400 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Get Started
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
