import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'


const RegisterPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const registerUser = async (e) => {
        e.preventDefault()
        try {
            await axios.post('/register', {
                name,
                email,
                password
            })
            alert('registration complete')
        } catch (error) {
            alert('Registration failed try again')
        }

    }
    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className='-mt-64'>
                <h1 className='text-4xl text-center mb-4'>Register</h1>
                <form className='max-w-md mx-auto' onSubmit={registerUser}>
                    <input
                        type="text"
                        placeholder='John Doe'
                        value={name}
                        onChange={e => setName(e.target.value)} />
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
                    <button
                        type='submit'
                        className='bg-[#FF395C] text-white w-full py-2 px-3 rounded-xl'>
                        Register
                    </button>
                    <div className='text-center py-2 text-gray-500'>
                        <span className='mr-1'>Already a member?</span>
                        <Link to='/login' className='underline text-black'>Login</Link>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default RegisterPage