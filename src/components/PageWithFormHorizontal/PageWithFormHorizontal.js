import './PageWithFormHorizontal.css';
import FormTitle from '../FormTitle/FormTitle';
import ButtonSubmit from '../ButtonSubmit/ButtonSubmit';
import ButtonRegular from '../ButtonRegular/ButtonRegular';

function PageWithFormHorizontal(props){
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
                     <ButtonSubmit 
                        isColored={false}
                        buttonText={props.buttonSaveProfileText}
                     />
                     </form>
                     <ButtonRegular 
                        isColored={false}
                        buttonText={props.buttonLogoutText}
                        onClick={props.handleLogout}
                     />
      </section>
   )
} 

export default PageWithFormHorizontal;