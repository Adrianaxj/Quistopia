import { useState, useRef, useEffect } from 'react'
import { getAllQuizzes, Quiz, Question, createQuiz, createQuestion, showQuestionsOnMap } from './quizApi.ts'
import Map from './Map'
import CreateQuiz from './CreateQuiz'

import 'mapbox-gl/dist/mapbox-gl.css';
function QuizGame() {
  let [quizname, setQuizName] = useState<string>('');
  let [quizzes, setQuizzes] = useState<string>('');


  let [questionName, setQuestionName] = useState<string>('');
  let [question, setQuestion] = useState<string>('');
  let [answer, setAnswer] = useState<string>('');

 
    let allQuizzes;
    let [currentQuiz, setCurrentQuiz] = useState(null);
     
     function showQuestions(quizId : string) {
        const quiz : Quiz = allQuizzes.find(q => q.quizId === quizId);  
       setCurrentQuiz(quiz);
        return;
        // if no long and lat error
        // else
        // render map and point
        // add popup with qustions / answer
        console.log(test);
    }
    localStorage.removeItem('activeQuiz');
    
    async function getAllQuiz() {
        const response : Quiz[] = await getAllQuizzes();
        if (response) {
            allQuizzes = response;
            const quizTable = response.map((quiz, index) =>
                <div className="quiz-item" onClick={() => showQuestions(quiz.quizId) } key={index}>
                    <div className="quiz-name">name: { quiz.quizId }</div>
                    <div className="quiz-author">author: { quiz.username }</div>
                </div>
            );
            setQuizzes(quizTable);
        }
    }


       
    return(
        <div>
            <CreateQuiz />
            <button onClick={() => getAllQuiz() } >Get all quizzes!</button>
            <Map selectedQuiz={currentQuiz} />
            <div className="quiz"> { quizzes } </div> 
        </div>
    );
}

export default QuizGame
