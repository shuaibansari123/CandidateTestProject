const ApiConfig = {
    baseUrl: "http://hiringape.com:8000/",
    endpoints: {
      createUser: "create_user",
      getSingleQuestion: (id) => `get_question/${id}`,
      submitAnswer: "submit_answer",
      getAllQuestions: "get_all_question",
    }
  };
  
  export default ApiConfig;
  