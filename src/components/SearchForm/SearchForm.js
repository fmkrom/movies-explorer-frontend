import './SearchForm.css';

import FilterCheckbox from '../FilterCheckBox/FilterCheckbox';
import ContentBlockMain from '../ContentBlockMain/ContentBlockMain';

function SearchForm(){
    
 return (
      <ContentBlockMain>
        <section className="search-form">
                <div className="search-form__search-bar">
                    <input required className="search-form__input" placeholder="Фильм" type="text" minLength="2" maxlenght="40"/> 
                    <div className="search-form__button"></div>
                </div>
                <FilterCheckbox />
        </section>
      </ContentBlockMain>  
  )
};

export default SearchForm;