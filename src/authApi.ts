
interface LoginResponse {
    success : boolean,
    message : string,
    token : string,
}

interface SignUpResponse {
    success : boolean,
    message : string
}

  const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com';  
    async function login(username : string , password : string) {//, setToken : React.Dispatch<React.SetStateAction<string>>) {
    
        try {
        const response = await fetch(url + '/auth/login', 
            { method : "POST",
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
        },
              body: JSON.stringify( { username: username, password : password })
        });

        const data : LoginResponse = await response.json();
        console.log(data);
        if (data.success) {
            //setToken(data.token);
            localStorage.setItem("token", data.token);
            return data.token;
        } else {
            alert(data.message);
        }
        } catch (e) {
            console.log("fail" + e);
        }
        return "";
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
            return false;
        } else {
            return true;
        } 
        } catch(e) {
            console.log("no" + e);
        }
    }

export { login, signUp }
