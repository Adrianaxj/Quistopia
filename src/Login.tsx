import { login, signUp } from './authApi.ts'
import { useState, useRef, useEffect } from 'react'

//import { getAllQuizzes, Quiz, Question, createQuiz, createQuestion, showQuestionsOnMap } from './quizApi.ts'
function Login() {

  let [username, setUsername] = useState<string>('');
  let [password, setPassword] = useState<string>('');
  let [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') !== null);

  async function handleLogin() {
    const response = await login(username, password);
    if(response)
        setIsLoggedIn(true)
  }
  
  function handleLogout() {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  }

    async function handleSignUp() {
        const response = await signUp(username, password);
        if(response) {
            handleLogin();
        }
    }
    
  return (
        <>
        <span>{isLoggedIn}</span>
        { !isLoggedIn ? (
            <div>
                <input type="text" onChange={ event => setUsername(event.target.value) } value={username} placeholder="username" />
                <input type="password" onChange={ event => setPassword(event.target.value)} placeholder="password" />
                <br />
                <button onClick={() => handleLogin() } >Login</button>
                <button onClick={() => handleSignUp(username, password) }>Sign up</button>
            </div>)
       :
            <div> 
                <button onClick={() => handleLogout() }>Logout</button>
            </div>
       } 
        </>
  );
}

export default Login
