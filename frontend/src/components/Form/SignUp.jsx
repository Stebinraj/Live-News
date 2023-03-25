import React, { useState } from 'react';
import * as EmailValidator from 'email-validator';
import passwordValidator from 'password-validator';
import { Link, useNavigate } from 'react-router-dom';
import 'axios';
import './signup.css';
import axios from 'axios';

const SignUp = () => {

    const [name, setName] = useState({
        name: '',
        class: '',
        feedback: ''
    });

    const [email, setEmail] = useState({
        email: '',
        class: '',
        feedback: ''
    });

    const [password, setPassword] = useState({
        password: '',
        class: '',
        feedback: ''
    });

    const [clicked, setClicked] = useState(false);

    const nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;
    const navigate = useNavigate();

    const validateName = () => {
        if (name.name === "") {
            setName({ name: name.name, feedback: 'Fields cannot be empty !!!', class: 'is-invalid' });
            return false;
        }
        else if (nameRegex.test(name.name)) {
            setName({ name: name.name, feedback: 'Name is valid !!!', class: 'is-valid' });
            return true;
        }
        else {
            setName({ name: name.name, feedback: 'Name is invalid !!!', class: 'is-invalid' });
            return false;
        }
    }

    const validateEmail = () => {
        if (email.email === "") {
            setEmail({ email: email.email, feedback: 'Fields cannot be empty !!!', class: 'is-invalid' });
            return false;
        }
        else if (EmailValidator.validate(email.email)) {
            setEmail({ email: email.email, feedback: 'Email is valid !!!', class: 'is-valid' })
            return true;
        }
        else {
            setEmail({ email: email.email, feedback: 'Email is invalid !!!', class: 'is-invalid' })
            return false;
        }
    };

    const createPasswordSchema = (min, max, uppercase, lowercase, digits, symbols) => {

        const schema = new passwordValidator();

        schema
            .is().min(min)
            .is().max(max)
            .has().uppercase(uppercase)
            .has().lowercase(lowercase)
            .has().digits(digits)
            .has().not().spaces()
        if (symbols) {
            schema.has().symbols(symbols)
        }

        return schema;
    }

    const passwordSchema1 = createPasswordSchema(8, 20, 1, 1, 1);
    const passwordSchema2 = createPasswordSchema(8, 20, 1, 1, 1, 1);
    const passwordSchema3 = createPasswordSchema(10, 20, 1, 1, 1, 1);

    const validatePassword = () => {
        if (password.password === "") {
            setPassword({ password: password.password, feedback: 'Fields cannot be empty !!!', class: 'is-invalid' })
            return false;
        }
        else if (passwordSchema1.validate(password.password) || passwordSchema2.validate(password.password) || passwordSchema3.validate(password.password)) {
            setPassword({ password: password.password, feedback: 'Password is valid !!!', class: 'is-valid' });
            return true;
        }
        else if (password.password.length > 20) {
            setPassword({ password: password.password.length, feedback: 'Password must be less than or equal to 20 characters', class: 'is-invalid' })
            return false;
        }
        else if ((!passwordSchema1.validate(password.password)) && (!passwordSchema2.validate(password.password)) && (!passwordSchema3.validate(password.password))) {
            setPassword({ password: password.password, feedback: 'Password is invalid !!!', class: 'is-invalid' })
            return false;
        }
        else {
            alert('else');
        }
    }

    const authenticateSignup = async (e) => {
        try {
            e.preventDefault();
            if (validateName() & validateEmail() & validatePassword()) {
                const response = await axios.post('/api/register', { name: name.name, email: email.email, password: password.password });
                if (response && response.data.success.data && response.data.success.token) {
                    alert('Registered Sucessfully')
                    navigate('/', { replace: true });
                }
            }
        } catch (error) {
            if (error.response.data.errors.field === 'name') {
                setName({ name: name.name, class: 'is-invalid', feedback: error.response.data.errors.message });
            } else if (error.response.data.errors.field === 'email') {
                setEmail({ email: email.email, class: 'is-invalid', feedback: error.response.data.errors.message });
            } else if (error.response.data.errors.field === 'password') {
                setPassword({ password: password.password, class: 'is-invalid', feedback: error.response.data.errors.message });
            }
            else {
                console.log(error);
            }
        }
    };

    return (
        <>
            <div className="container">
                <div className="row justify-content-center vh-100 align-items-center">
                    <div className="col-lg-6 col-md-8">
                        <div className="card shadow-lg">
                            <div className="card-body">
                                <h3 className="card-title text-center mb-4">Signup</h3>
                                <form>
                                    <div className="form-group mb-1">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" className={name.class ? (`form-control ${name.class}`) : ('form-control')} id="name" aria-describedby="nameHelp" placeholder="Enter Your Name" onChange={(e) => { setName({ name: e.target.value.trim(), feedback: '', class: '' }); setClicked(false) }} required />
                                        {name.feedback && (
                                            <>
                                                <small className="valid-feedback">{name.feedback}</small>
                                                <small className="invalid-feedback">{name.feedback}</small>
                                            </>
                                        )}
                                    </div>
                                    <div className="form-group mb-1">
                                        <label htmlFor="email">Email address</label>
                                        <input type="email" className={email.class ? (`form-control ${email.class}`) : ('form-control')} id="email" aria-describedby="emailHelp" placeholder="Enter Your Email" onChange={(e) => { setEmail({ email: e.target.value.trim().toLowerCase(), feedback: '', class: '' }); setClicked(false) }} required />
                                        {email.feedback && (
                                            <>
                                                <small className="valid-feedback">{email.feedback}</small>
                                                <small className="invalid-feedback">{email.feedback}</small>
                                            </>
                                        )}
                                    </div>
                                    <div className="form-group mb-2">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" className={password.class ? (`form-control ${password.class}`) : ('form-control')} id="password" aria-describedby="PasswordHelp" placeholder="Enter Your Password" onChange={(e) => { setPassword({ password: e.target.value.trim(), feedback: '', class: '' }); setClicked(false) }} required />
                                        {password.feedback && (
                                            <>
                                                <small className="valid-feedback">{password.feedback}</small>
                                                <small className="invalid-feedback">{password.feedback}</small>
                                            </>
                                        )}
                                    </div>
                                    {clicked ? (
                                        <>
                                            <button onClick={(e) => { e.preventDefault() }} className="btn btn-primary btn-block w-100">Signup</button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="btn btn-primary btn-block w-100" onClick={(e) => { authenticateSignup(e); setClicked(true) }}>Signup</button>
                                        </>
                                    )}
                                </form>
                                <br />
                                <div className="form-link" style={{ textAlign: 'center' }}>
                                    <span>Aready have an account? <Link to={'/'} replace={true} className='link login-link'>Login</Link> </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp