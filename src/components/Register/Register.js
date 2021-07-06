import '../PageWithForm/PageWithForm.css';

import { useState } from 'react';

import PageWithForm from '../PageWithForm/PageWithForm';
import FormInput from '../FormInput/FormInput';

import useInputValidation from '../../utils/customHooks/useInputValidation';

function Register(props){

    const name = useInputValidation('', { isEmpty: true, minLengthError: 2 });
    const email = useInputValidation('', { isEmpty: true, minLengthError: 5 });
    const password = useInputValidation('', { isEmpty: true, minLengthError: 8 });

    /*const [registerUserName, setRegisterUserName] = useState('');
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
    */

    function handleRegisterUserSubmit(e){
        e.preventDefault();
        props.onRegisterUser(name.value, email.value, password.value)
    }
    
    return (
                <PageWithForm
                    formTitle='Добро пожаловать!'
                    formName='form__register'
                    onSubmit={handleRegisterUserSubmit}
                    buttonText='Зарегистрироваться'
                    formSubtitleText='Уже зарегистрированы?'
                    formSubtitleLinkRoute='/login'
                    formSubtitleLinkText=' Войти'
                >
                    <FormInput
                        isHorizontal={false}
                        inputTitle="Имя"
                        inputValue={name.value} 
                        onChange={e=> name.onChange(e)}
                        onBlur={e=> name.onBlur(e)} 
                        // handleSubmit={handleRegisterUserNameSubmit} 
                        placeholder="Введите имя"
                        type="text"
                        minLength="2"
                        maxLength="40"
                        isErrorShown={(email.isDirty || name.isEmpty) ? true : false}
                        errorMessage="Введите корректное имя"
                    />
                    <FormInput 
                        isHorizontal={false}
                        inputTitle="E-mail"
                        inputValue={email.value} 
                        onChange={e=> email.onChange(e)}
                        onBlur={e=> email.onBlur(e)} 

                        //handleSubmit={handleRegisterUserEmailSubmit} 
                        placeholder="Введите e-mail"
                        type="email"
                        minLength="2"
                        maxLength="40"
                        isErrorShown={(email.isDirty || name.isEmpty) ? true : false}
                        errorMessage="Введите корректный e-mail"
                    />
                    <FormInput 
                        isHorizontal={false}
                        inputValue={password.value} 
                        onChange={((e)=> password.onChange(e))}
                        onBlur={(e)=> password.onBlur(e)} 
                        //handleSubmit={handleRegisterUserPasswordSubmit} 
                        placeholder="Введите пароль"
                        type="password"
                        minLength="2"
                        maxLength="200"
                        isErrorShown={(password.isDirty || password.isEmpty) ? true : false}
                        errorMessage="Введите корректный пароль"
                    />
                </PageWithForm>
        )
}

export default Register;