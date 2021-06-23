import './ButtonSubmit.css';

function ButtonSubmit(props){
    return(
        <button 
            className={`button
                ${props.isColored ? "button_colored button_text-white" : "button_plain button_text-auto"}
            `}
            type="submit"
        >{props.buttonText}</button>    
    )
}

export default ButtonSubmit;
