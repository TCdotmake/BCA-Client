import React, { useState, useEffect } from "react"
import validator from 'validator'

const PASSMINLEN = 7;


export default function Login(){
    const [email, setEmail] = useState<string> ("");
	const [pass, setPass] = useState<string>("")

	const handleEmail = (e:React.ChangeEvent<HTMLInputElement>)=>{setEmail(e.target.value)}
	const handlePass = (e:React.ChangeEvent<HTMLInputElement>)=>{setPass(e.target.value)}
    const handleSubmit = ()=>{console.log("submit clicked")}

    useEffect(()=>{
        if(validator.isEmail(email) && pass.length >= PASSMINLEN){
            document.getElementById("loginSubmit")?.removeAttribute("disabled");
        }
        else{
            document.getElementById('loginSubmit')?.setAttribute('disabled', "true")
        }
    },[email, pass])

    return(
        <>
			<form>
			<label>Email</label>
			<input type="email" onChange={handleEmail} />
			<label>Password</label>
			<input type="password" onChange={handlePass} />
			<input type="submit" value="Submit" disabled onClick={handleSubmit} id="loginSubmit"/>
			</form>
        </>
    )
}