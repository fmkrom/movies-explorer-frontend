import './ButtonSubmitColored.css';

function ButtonSubmitColored(props){
    return(
        <button 
            className={`button button-submit-colored
                ${props.isDisabled ? 
                        'button-submit-colored_disabled' :
                        'button-submit-colored_enabled'
                    }    
                `}
            type="submit"
            disabled={props.isDisabled}
        >{props.buttonText}</button>    
    )
}

export default ButtonSubmitColored;
