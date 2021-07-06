import {useState, useEffect} from 'react';

function useValidation(value, validationParameters){
        
    const [ isEmpty, setEmpty ] = useState(true);
    const [ minLength, setMinLengthEror ] = useState(true);
    const [ inputValid, setInputValid ] = useState(false);
    
    useEffect(()=>{
        for (const validation in validationParameters){
            switch (validation) {
                
                case 'minLength': 
                    // console.log('case minLengthError');
                    value.length < validationParameters[validation] ? setMinLengthEror(true) : setMinLengthEror(false)
                break;

                case 'isEmpty': 
                    // console.log('isEmpty');
                    value ? setEmpty(false) : setEmpty(true)
                break;

                default: 
                    console.log('Default case');
                break;
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    useEffect(()=>{
        if (isEmpty || minLength){
            setInputValid(false)
        } else {
            setInputValid(true)
        }

    }, [isEmpty, minLength, inputValid])

    return {
        isEmpty,
        minLength,
        inputValid
    }
}

function useInputValidation(initialValue, validationParameters){
    const [ value, setValue ] = useState(initialValue);
    const [ isDirty, setDirty ] = useState(false)

    const valid = useValidation(value, validationParameters);

    function onChange(e){
        // console.log('Value in onChange: ', e.target.value);
        setValue(e.target.value);
    }

    function onBlur(e){
        setDirty(true);
    }



    return {
        value,
        onChange,
        onBlur,
        isDirty,
        ...valid
    }
}

export default useInputValidation;