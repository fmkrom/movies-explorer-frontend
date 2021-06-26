import './FilterCheckbox.css';

import CheckboxOff from '../../images/checkbox_off.png';
import CheckboxOn from '../../images/checkbox_on.png';

import { useState } from 'react';

function FilterCheckbox(){

    const [checkBoxState, setCheckBoxState] = useState(false);

    function toggleCheckoBoxState(){
        if (checkBoxState === false){
            setCheckBoxState(true)
        } else if (checkBoxState === true){
            setCheckBoxState(false)
        }
    }

 return (
      <div className="filter-checkbox">
          <p className="filter-checkbox__text">Короткометражки</p>
          <img 
            className="filter-checkbox__toggle-button" 
            onClick={toggleCheckoBoxState} 
            src={checkBoxState ? CheckboxOn : CheckboxOff} alt="Чекбокс"/>
      </div>
  )
};

export default FilterCheckbox;