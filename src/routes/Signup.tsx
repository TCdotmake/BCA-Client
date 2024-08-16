import validator from "validator";
import { useEffect, useState } from "react";

const PASSMINLEN = 7;
const NAMEMINLEN = 3;

function Signup(){
const [email, setEmail] = useState<string>("");
const [name, setName] = useState<string>("");
const [pass, setPass] = useState<string>("");
const [confirmPass, setConfirmPass] = useState<string>("");

const handleEmail = (e:React.ChangeEvent<HTMLInputElement>):void=>{setEmail(e.target.value)}
const handleName = (e:React.ChangeEvent<HTMLInputElement>):void=>{setName(e.target.value)}
const handlePass = (e:React.ChangeEvent<HTMLInputElement>):void=>{setPass(e.target.value)}
const handleConfirmPass = (e:React.ChangeEvent<HTMLInputElement>):void=>{setConfirmPass(e.target.value)}

useEffect(()=>{
    if(validator.isEmail(email) &&
       name.length >= NAMEMINLEN &&
       pass.length >= PASSMINLEN &&
       confirmPass === pass
){document.getElementById("signupSubmit")?.removeAttribute('disabled')}
else{document.getElementById("signupSubmit")?.setAttribute('disabled', "true")}
},[email, name, pass, confirmPass])

const handleSubmit = ()=>{console.log('Signup submit')}

return(
    <>
        <form>
			<label>Email</label>
			<input type="email" onChange={handleEmail} />
            <label>User Name</label>
			<input onChange={handleName} />
			<label>Password</label>
			<input type="password" onChange={handlePass} />
            <label>Confirm Password</label>
			<input type="password" onChange={handleConfirmPass} />
			<input type='submit' value="Submit" disabled onClick={handleSubmit} id="signupSubmit"/>
			</form>

    </>
)
}

export default Signup;