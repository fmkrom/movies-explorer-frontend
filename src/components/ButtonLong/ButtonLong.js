import './ButtonLong.css';

function Buttonlong(props){
    return(
        <button 
            className={`button-long
                ${props.isShown ? 'button-long_shown' : 'button-long_hidden'}
            `}
            type="button"
            onClick={props.onClick}
        >{props.buttonText}</button>    
    )
}

export default Buttonlong;
