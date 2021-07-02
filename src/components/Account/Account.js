import './Account.css';
// import ButtonSubmit from '../ButtonSubmit/ButtonSubmit';
import PageWithFormHorizontal from '../PageWithFormHorizontal/PageWithFormHorizontal';
import ContentBlockMain from '../ContentBlockMain/ContentBlockMain';
import FormInput from '../FormInput/FormInput';

import { useState } from 'react';

function Account(props){
  
  const [editProfileUserName, setEditProfileUserName] = useState('');
  const [editProfileUserEmail, setEditProfileUserEmail] = useState('');
  
  function handleEditProfileUserNameSubmit(e){
    setEditProfileUserName(e.target.value);
  }

  function handleEditProfileUserEmailSubmit(e){
    setEditProfileUserEmail(e.target.value);
  }    

  function handleEditProfileSubmit(e){
    e.preventDefault();
    props.onEditProfile(editProfileUserName, editProfileUserEmail)
  }

  function handleUserLogout(){
    props.logout()
  }
  
  return (
    <ContentBlockMain>
      <div className="account">
        <PageWithFormHorizontal 
          formTitle={`Привет, ${props.userName}!`}
          formName="form__edit-profile"
          onSubmit={handleEditProfileSubmit}
          buttonSaveProfileText="Редактировать профиль"
          buttonLogoutText="Выйти из аккаунта"
          handleLogout={handleUserLogout}
        >
          <FormInput
            isHorizontal={true} 
            inputTitle="Имя"
            inputValue={editProfileUserName} 
            handleSubmit={handleEditProfileUserNameSubmit} 
            placeholder={props.userName}
            type="text"
            minLength="2"
            maxLength="40"
            isErrorShown={false}
            errorMessage="Что-то пошло не так..."
          />
          <FormInput 
            isHorizontal={true} 
            inputTitle="E-mail"
            inputValue={editProfileUserEmail} 
            handleSubmit={handleEditProfileUserEmailSubmit} 
            placeholder={props.userEmail}
            type="email"
            minLength="2"
            maxLength="40"
            isErrorShown={false}
            errorMessage="Что-то пошло не так..."
          />
          </PageWithFormHorizontal>
        </div>
    </ContentBlockMain>
  )
} 

export default Account;
