import './SearchForm.css';

import FilterCheckbox from '../FilterCheckBox/FilterCheckbox';
import ContentBlockMain from '../ContentBlockMain/ContentBlockMain';
import FormError from '../FormError/FormError';
import useInputValidation from '../../utils/customHooks/useInputValidation';
import functions from '../../utils/utils';

function SearchForm(props){

  const search = useInputValidation('', { isEmpty: true, minLength: 2 });
  const buttonDisabled = Boolean(functions.validateSearchInput(search));
    
  function handleSearchRequestSubmit(e){
    e.preventDefault();
    props.onSubmitSearchForm(search.value);
  }

 return (
      <ContentBlockMain>
        <form 
          className="form search-form"
          onSubmit={handleSearchRequestSubmit}
        >
              <div className="search-from-content-block">
                <div className="search-form__search-bar">
                    <input 
                      value={search.value}
                      onChange={e=> search.onChange(e)}
                      onBlur={e=> search.onBlur(e)}
                      required 
                      className="search-form__input" 
                      placeholder="Введите название фильма..."
                      type="text" 
                      minLength="2" 
                      maxlenght="40"
                    /> 
                    <button 
                    className="search-form__button"
                    disabled={buttonDisabled}
                    ></button>
                </div>
                  <FilterCheckbox 
                    filterShortFilms={()=>{props.filterShortFilms()}}
                    filterShortFilmsOn={props.filterShortFilmsOn}
                  />
              </div>
              <FormError
                isShown={functions.validateSearchInput(search)}
                message="Введите корретное название фильма!"
              />
        </form>
      </ContentBlockMain>
  )
};

export default SearchForm;