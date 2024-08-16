function Signup(){
return(
    <>
        <form>
            <label>Email</label>
            <input type="email"></input>
            <label>Password</label>
            <input type='password'></input>
            <label>Confirm Password</label>
            <input type='password'></input>
            <button type='submit'>Sign Up</button>
        </form>
    </>
)
}

export default Signup;