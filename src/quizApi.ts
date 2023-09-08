interface Question {
    name : string,
    qustion : string,
    answer : string, 
    location : { Location : { longitude : string, latitude : string }}
} 

interface Quiz {
    questions: Question[],
    quizId : string,
    userId : string,
    username : string
}

interface QuizResponse {
    success : boolean,
    quizzes : Quiz[]
}

interface CreateQuizResponse {
    success : boolean,
    quizId : string,
    error : string
}

interface CreateQuestionResponse {
    success : boolean,
    error   : string
}

const Mapbox_API_KEY = 'pk.eyJ1IjoiYWRyaWFuYWoiLCJhIjoiY2xtN3RlMXVpMDRoajNwbG02cnZ4emJ5YiJ9.T8mtopEM4R2WcIXWX9983w';

  const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com';  

      async function showQuestionsOnMap(quizId : string) { 
        try {
        const response = await fetch(url + '/quiz/question', 
            { method : "POST",
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              },
              body: JSON.stringify(question)
        });
        console.log(data);
        if (data.success) {
            return true;
        } else {
            alert(data.error);
        }

        } catch (e) {
            console.log("failed to get map" + e);
        }
  }
      async function createQuestion(question : Question, token : string) { 
        try {
        const response = await fetch(url + '/quiz/question', 
            { method : "POST",
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              },
              body: JSON.stringify(question)
        });
        console.log(token);
        console.log(JSON.stringify(question));

        const data : CreateQuestionResponse = await response.json();
        console.log(data);
        if (data.success) {
            return true;
        } else {
            alert(data.error);
        }

        } catch (e) {
            console.log("failed to create quzzies" + e);
        }
  }
      async function createQuiz(name : string, token : string) { 
        try {
        const response = await fetch(url + '/quiz', 
            { method : "POST",
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              },
              body: JSON.stringify({ name: name })
        });

        const data : CreateQuizResponse = await response.json();

         //console.log(data);
        
        if (data.success) {
            return data.quizId;
        } else {
            return '-1';
        }

        } catch (e) {
            console.log("failed to create quzzies" + e);
        }
  }

    async function getAllQuizzes() {
    
        try {
        const response = await fetch(url + '/quiz', 
            { method : "GET",
              headers: {
                'Accept': 'application/json'
              },
        });

        const data : QuizResponse = await response.json();

        if (data.success) {
            return data.quizzes;
        } else {
            alert(data.message);
        }

        } catch (e) {
            console.log("failed to get quzzies" + e);
        }
    }


    async function signUp(username : string, password : string) {
        try {
        const response = await fetch(url + '/auth/signup', 
            { method : "POST",
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ username: username, password : password }) 
            });

        const data : SignUpResponse = await response.json();
        console.log(data);
        if (!data.success) {
            alert(data.message);
        } else {

        } 
        } catch(e) {
            console.log("no" + e);
        }
    }

export { getAllQuizzes, createQuiz, createQuestion, Question, Quiz, showQuestionsOnMap }
