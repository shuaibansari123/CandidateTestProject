import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import ApiConfig from "../apiConfig/ApiConfig";

function Modal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-85 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-[400px] w-full h-[220px]">
        <h2 className="text-lg mb-4 text-center">
          This test consists of <span className="font-bold">12 Minutes!!</span>{" "}
          Good luck for the test and click on the start test when you are ready
        </h2>

        <div className="flex justify-between px-10 mt-8">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition-colors"
          >
            No, Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Yes, Start
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SignUpForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        `${ApiConfig.baseUrl}${ApiConfig.endpoints.createUser}`,
        {
          name: values.name,
          email: values.email,
          phone: values.phone,
          ctc: values.ctc,
          role: values.testType,
        }
      );

      console.log("API response:", response.data);

      if (response.data.status === "success") {
        setIsModalOpen(true);
        toast.success("User created successfully!");
      } else {
        console.error("Error creating user:", response.data.message);
        toast.error(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error("API error:", error);
      toast.error("An error occurred while creating the user.");
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    navigate("/test-start");
    console.log("Starting the test...");
  };

  return (
    <div className="">
      <div className="flex flex-col lg:flex-row items-center gap-8 max-h-screen">
        <div className="md:w-1/2 hidden md:block ">
          <img src="online_test.png" alt="" style={{ maxHeight: "100vh" }} />
        </div>
        <div
          className="w-full max-w-md mx-auto px-4 lg:px-0 lg:w-1/4 lg:ml-10"
          style={{ padding: "40px 20px 0px" }}
        >
          <div className="block md:hidden">
            <img src="logos.png" alt="logos" className="w-40 h-auto" />
          </div>
          <h1 className="text-3xl font-bold mb-6">
            Please Sign up for the test!
          </h1>

          <Formik
            initialValues={{
              name: "",
              phone: "",
              email: "",
              testType: "Aptitude",
              ctc: "",
            }}
            onSubmit={handleSubmit}
          >
            {({ isValid, dirty }) => (
              <Form className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Enter Name
                  </label>
                  <Field
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
                  <Field
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
                  <Field
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
                    className="block text-sm font-medium text-gray-700 mb-1 flex items-center"
                  >
                    Select Test Type
                  </label>
                  <div className="relative">
                    <Field
                      as="select"
                      id="testType"
                      name="testType"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 appearance-none"
                    >
                      <option value="Aptitude">Aptitude</option>
                    </Field>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="ctc"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Expected CTC
                  </label>
                  <Field
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
                    className="py-2 px-4 mt-3  w-[200px] border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-orange-400 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    disabled={!(isValid && dirty)}
                  >
                    Get Started
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
      />
      <Toaster position="top-right" />
    </div>
  );
}
