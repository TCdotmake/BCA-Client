import validator from "validator";
import { useEffect, useState } from "react";

const PASSMINLEN = 7;
const NAMEMINLEN = 3;
const URL = 'http://localhost:3000'
export default function Signup(){
const [email, setEmail] = useState<string>("");
const [name, setName] = useState<string>("");
const [password, setPassword] = useState<string>("");
const [confirmPass, setConfirmPass] = useState<string>("");
const [feedback, setFeedback] = useState<string>("");

const handleEmail = (e:React.ChangeEvent<HTMLInputElement>):void=>{setEmail(e.target.value)}
const handleName = (e:React.ChangeEvent<HTMLInputElement>):void=>{setName(e.target.value)}
const handlePass = (e:React.ChangeEvent<HTMLInputElement>):void=>{setPassword(e.target.value)}
const handleConfirmPass = (e:React.ChangeEvent<HTMLInputElement>):void=>{setConfirmPass(e.target.value)}

useEffect(()=>{
    setFeedback("")
    if(validator.isEmail(email) &&
       name.length >= NAMEMINLEN &&
       password.length >= PASSMINLEN &&
       confirmPass === password
){document.getElementById("signupSubmit")?.removeAttribute('disabled')}
else{document.getElementById("signupSubmit")?.setAttribute('disabled', "true")}
},[email, name, password, confirmPass])

const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    sendSignup({email,name, password}, URL)
}

function sendSignup(user:Usersignup, url:string){
    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify(user);

const requestOptions: RequestInit = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

setFeedback("Loading");
let msg = "";

fetch(`${url}/user`, requestOptions)
  .then((response) =>  {
    if(response.status != 201){
        return undefined
    }
    return response.json();
  })
  .then((result) => {if(!result){
    msg = "Account creation failed"
  }
  else(    msg = "Account created!"
  )
}

)
  .catch((error) => console.error(error))
  .finally(()=>setFeedback(msg))
}

return(
    <>
        <form onSubmit={handleSubmit}>
			<label>Email</label>
			<input type="email" onChange={handleEmail} />
            <label>User Name</label>
			<input onChange={handleName} />
			<label>Password</label>
			<input type="password" onChange={handlePass} />
            <label>Confirm Password</label>
			<input type="password" onChange={handleConfirmPass} />
			<input type='submit' value="Submit" id="signupSubmit"/>
			</form>
        <h2>{feedback}</h2>
    </>
)
}

interface Usersignup{
    email: string,
    name: string,
    password: string
}

