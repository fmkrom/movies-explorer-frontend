import './FilterCheckbox.css';

import CheckboxLight from '../../images/checkbox_light.png';

function FilterCheckbox(){
    
 return (
      <div className="filter-checkbox">
          <p className="filter-checkbox__text">Короткометражки</p>
          <img className="filter-checkbox__toggle-button" src={CheckboxLight} alt="Чекбокс"/>
      </div>
  )
};

export default FilterCheckbox;