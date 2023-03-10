import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { setUser } = useContext(UserContext);

    async function handleLoginSubmit(ev) {
        ev.preventDefault();
        try {
            const { data } = await axios.post('/login', { email, password });
            setUser(data);
            alert('Login successful');
            setRedirect(true);
        } catch (e) {
            alert('Login failed');
            console.log(e)
        }
    }
    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className='-mt-64'>
                <h1 className='text-4xl text-center mb-4'>Login</h1>
                <form className='max-w-md mx-auto ' onSubmit={handleLoginSubmit}>
                    <input
                        type="email"
                        placeholder='your@email.com'
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                    <input
                        type="password"
                        placeholder='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                    <button type='submit' className='bg-[#FF395C] text-white w-full py-2 px-3 rounded-xl'>Login</button>
                    <div className='text-center py-2 text-gray-500'>
                        <span className='mr-1'>Dont have an account yet?</span>
                        <Link to='/register' className='underline text-black'>Register now</Link>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default LoginPage