import './ButtonRegular.css';

function ButtonRegular(props){
    return(
        <button 
            className='button-regular button-regular_red'
            type="button"
            onClick={props.onButtonClick}
        >{props.buttonText}</button>    
    )
}

export default ButtonRegular;
