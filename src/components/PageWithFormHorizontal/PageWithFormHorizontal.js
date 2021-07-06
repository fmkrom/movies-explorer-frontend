import './PageWithFormHorizontal.css';
import FormTitle from '../FormTitle/FormTitle';
import ButtonSubmit from '../ButtonSubmit/ButtonSubmit';
import ButtonRegular from '../ButtonRegular/ButtonRegular';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

function PageWithFormHorizontal(props){
   
   function handleLogout(){
      props.handleLogout()
   }
  
  return (
     <section className="form-horizontal">
                     <FormTitle 
                        isWithLogo={false}
                        isTextAlignLeft={false}
                        formTitleText={props.formTitle}
                     /> 
                     <form className="form__inputs-block" 
                           name={props.formName} 
                           onSubmit={props.onSubmit} 
                           noValidate
                     >
                     {props.children}
                     <ErrorMessage
                        messageText={props.errorMessageText}
                     />
                     <ButtonSubmit 
                        isColored={false}
                        buttonText={props.buttonSaveProfileText}
                     />
                     </form>
                     <ButtonRegular 
                        isColored={false}
                        buttonText={props.buttonLogoutText}
                        onButtonClick={handleLogout}
                     />
      </section>
   )
} 

export default PageWithFormHorizontal;