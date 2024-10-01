const ApiConfig = {
    baseUrl: "https://hiringape.com/api/",
    endpoints: {
      createUser: "create_user",
      getSingleQuestion: (id) => `get_question/${id}`,
      submitAnswer: "submit_answer",
      getAllQuestions: "get_all_question",
    }
  };
  
  export default ApiConfig;
  