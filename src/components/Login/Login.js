import '../PageWithForm/PageWithForm.css';

import { useState } from 'react';

import PageWithForm from '../PageWithForm/PageWithForm';
import FormInput from '../FormInput/FormInput';

function Login(props){

    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [loginUserPassword, setLoginUserPassword] = useState('');

    function handleLoginUserEmailSubmit(e){
        // console.log(e.target.value);
        setLoginUserEmail(e.target.value);
    }

    function handleloginUserPasswordSubmit(e){
        // console.log(e.target.value);
        setLoginUserPassword(e.target.value);
    }    

    function handleLoginUserSubmit(e){
        // console.log(e);
        e.preventDefault();
        props.onLoginUser(loginUserEmail, loginUserPassword)
    }
    
    return (
            <PageWithForm
                    formTitle={'Рады видеть!'}
                    formName='form__login'
                    onSubmit={handleLoginUserSubmit}
                    buttonText='Войти'
                    formSubtitleText='Еще не зарегистрированы?'
                    formSubtitleLinkRoute='/register'
                    formSubtitleLinkTetx='Регистрация'
                >
                    <FormInput
                        isHorizontal={false} 
                        inputTitle="E-mail"
                        inputValue={loginUserEmail} 
                        handleSubmit={handleLoginUserEmailSubmit} 
                        placeholder="Введите Ваш e-mail"
                        type="text"
                        minLength="2"
                        maxLength="40"
                        isErrorShown={false}
                        errorMessage="Что-то пошло не так..."
                    />
                    <FormInput 
                        isHorizontal={false} 
                        inputTitle="Пароль"
                        inputValue={loginUserPassword} 
                        handleSubmit={handleloginUserPasswordSubmit} 
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

export default Login;