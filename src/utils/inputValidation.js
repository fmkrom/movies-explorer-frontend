import {useState, useEffect} from 'react';

function useValidation(value, validations){
        
    const [ isEmpty, setEmpty ] = useState(true);
    const [ minLengthError, setMinLengthEror ] = useState(true);
    
    useEffect(()=>{
        for (const validation in validations){
            // eslint-disable-next-line default-case
            switch (validation) {
                case minLengthError: 
                    value.length < value.validations[validation] ? setMinLengthEror(true) : setMinLengthEror(false)
                break;

                case isEmpty:
                    value ? setEmpty(false) : setEmpty(true)
                break;
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    return {
        isEmpty,
        minLengthError
    }
}

function useInput(initialValue, validations){
    const [ value, setValue ] = useState(initialValue);
    const [ isDirty, setDirty ] = useState(false)

    const valid = useValidation(value, validations)

    function onChange(e){
        setValue(e.target.value);   
    }

    function onBlur(e){
        setDirty(true)
    }

    return {
        value,
        onChange,
        onBlur,
        isDirty,
        ...valid
    }
}

export default useInput;