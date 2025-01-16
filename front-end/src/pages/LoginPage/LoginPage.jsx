import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

export default function LoginPage(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    async function logIn(){
        try{
            await signInWithEmailAndPassword(getAuth(), email, password);
            navigate('/articles');
        } catch(err){
            setError(err.message);
        }
    }

    return(
        <div className="back-drop">
            <div className="page-container">
                <h1>Login Page</h1>
                {error && <p>{error}</p>}
                <input
                    id="email" 
                    placeholder='Your email-address'
                    autoComplete='true'
                    type='text'
                    value = {email}
                    onChange={e => setEmail(e.target.value)} />
                <input 
                    placeholder='Your password'
                    id='password' 
                    type='password'
                    value = {password}
                    onChange={e => setPassword(e.target.value)} />
                <button onClick={logIn}>Log In</button>
                <Link to='/create-account'>Don't have a account? Create one here!</Link>
            </div>
        </div>
    )
}