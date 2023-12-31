import { useState } from 'react'
import { createQuiz, createQuestion } from './quizApi'

function CreateQuiz() { 
    let [quizname, setQuizName] = useState('')
    let [quizId, setQuizId] = useState('')
    let [question, setQuestion] = useState('')
    let [answer, setAnswer] = useState('')

    async function handleCreateQuiz() {
        localStorage.removeItem('activeQuiz');
        let token = localStorage.getItem('token');
        if(!token) {
            alert('not logged in');
            return;
        }
        console.log(quizname);
        const response = await createQuiz(quizname, token); 
 
        if(response == "-1")
            alert("Quiz already exists")
        else
            setQuizId(response);
    }

    async function handleCreateQuestion() {
        let token = localStorage.getItem('token');
        if(!token) {
            alert('not logged in');
            return;
        }
        let markerPos = localStorage.getItem('markerPosition');
        if(!markerPos) return;

        var latlng = JSON.parse(markerPos);
        let long = latlng.lng;
        let lat = latlng.lat;
        let newQuestion : Question = { 
            name: quizId,
            question: question,
            answer : answer,
            location : { longitude : long, latitude : lat } 
        };

        const response = await createQuestion(newQuestion, token);
        if (!response)
            alert('Failed to create question.');
        else
        {
            alert('Question added');
        }
    }

    return(
         <div>    
            {    quizId ? (
                <div>
                    <input type="text" id="question" value={question} onChange={ event => setQuestion(event.target.value) } placeholder="Qustion" /> 
                    <input type="text" id="answer" value={answer} onChange={ event => setAnswer(event.target.value) } placeholder="Answer" /> 
                    <br />
                    <button onClick={() => handleCreateQuestion() }>Create Question</button>
                </div>
                ):(
            <div>
                <input type="text" id="quizname" value={quizname} onChange={ event => setQuizName(event.target.value) } placeholder="Quiz name" /> 
                <br />
                <button onClick={() => handleCreateQuiz() } >Create Quiz</button>
            </div>
           )}
        </div>
    )
}

export default CreateQuiz
