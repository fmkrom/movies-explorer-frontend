import '../PageWithForm/PageWithForm.css';

import useInput from '../../utils/inputValidation';

import PageWithForm from '../PageWithForm/PageWithForm';
import FormInput from '../FormInput/FormInput';

function Login(props){
    
    const email = useInput('', { isEmpty: true, minLengthError: 3 });
    const password = useInput('', { isEmpty: true, minLengthError: 8 });

    function handleLoginUserSubmit(e){
        e.preventDefault();
        props.onLoginUser(email.value, password.value);
    }

    return (
            <PageWithForm
                    formTitle={'Рады видеть!'}
                    formName='form__login'
                    onSubmit={handleLoginUserSubmit}
                    buttonText='Войти'
                    formSubtitleText='Еще не зарегистрированы? '
                    formSubtitleLinkRoute='/register'
                    formSubtitleLinkText='Регистрация'
                >
                    <FormInput
                        isHorizontal={false} 
                        inputTitle="E-mail"
                        inputValue={email.value} 
                        onChange={(e)=> email.onChange(e)}
                        onBlur={(e)=> email.onBlur(e)} 
                        placeholder="Введите Ваш e-mail"
                        type="text"
                        minLength="2"
                        maxLength="40"
                        isErrorShown={(email.isDirty) ? true : false}
                        errorMessage="Введите корректный e-mail"
                    />
                    { /* {(email.isDirty && email.isEmpty) && <div>ОШИБКА!</div>}*/ }
                    <FormInput 
                        isHorizontal={false} 
                        inputTitle="Пароль"
                        inputValue={password.value}
                        onChange={(e)=> password.onChange(e)} 
                        onBlur={(e)=> password.onBlur(e)}
                        placeholder="Введите пароль"
                        type="password"
                        minLength="2"
                        maxLength="200"
                        isErrorShown={(password.isDirty && password.isEmpty) ? true : false}
                        errorMessage="Введите корректный пароль"
                    />
            </PageWithForm>
    )
}

export default Login;

    /*
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [loginUserPassword, setLoginUserPassword] = useState('');

    function handleLoginUserEmailSubmit(e){
        setLoginUserEmail(targetValue);
    }

    function handleloginUserPasswordSubmit(e){
        // console.log(e.target.value);
        setLoginUserPassword(e.target.value);
    }    
    */