import '../PageWithForm/PageWithForm.css';

import { useState } from 'react';

import PageWithForm from '../PageWithForm/PageWithForm';
import FormInput from '../FormInput/FormInput';

function Register(props){

    const [registerUserName, setRegisterUserName] = useState('');
    const [registerUserEmail, setRegisterUserEmail] = useState('');
    const [registerUserPassword, setRegisterUserPassword] = useState('');

    function handleRegisterUserNameSubmit(e){
        setRegisterUserName(e.target.value);
    }

    function handleRegisterUserEmailSubmit(e){
        setRegisterUserEmail(e.target.value);
    }

    function handleRegisterUserPasswordSubmit(e){
        setRegisterUserPassword(e.target.value);
    }    

    function handleRegisterUserSubmit(e){
        e.preventDefault();
        props.onRegisterUser(registerUserEmail, registerUserPassword, registerUserName)
    }
    
    return (
                <PageWithForm
                    formTitle='Добро пожаловать!'
                    formName='form__register'
                    onSubmit={handleRegisterUserSubmit}
                    buttonText='Зарегистрироваться'
                    formSubtitleText='Уже зарегистрированы?'
                    formSubtitleLinkRoute='/login'
                    formSubtitleLinkTetx='Войти'
                >
                    <FormInput
                        isHorizontal={false}
                        inputTitle="Имя"
                        inputValue={registerUserName} 
                        handleSubmit={handleRegisterUserNameSubmit} 
                        placeholder="Введите имя"
                        type="text"
                        minLength="2"
                        maxLength="40"
                        isErrorShown={false}
                        errorMessage="Что-то пошло не так..."
                    />
                    <FormInput 
                        isHorizontal={false}
                        inputTitle="E-mail"
                        inputValue={registerUserEmail} 
                        handleSubmit={handleRegisterUserEmailSubmit} 
                        placeholder="Введите e-mail"
                        type="email"
                        minLength="2"
                        maxLength="40"
                        isErrorShown={false}
                        errorMessage="Что-то пошло не так..."
                    />
                    <FormInput 
                        isHorizontal={false}
                        inputValue={registerUserPassword} 
                        handleSubmit={handleRegisterUserPasswordSubmit} 
                        placeholder="Введите пароль"
                        type="password"
                        minLength="2"
                        maxLength="200"
                        isErrorShown={false}
                        errorMessage="Что-то пошло не так..."
                    />
                </PageWithForm>
        )
}

export default Register;