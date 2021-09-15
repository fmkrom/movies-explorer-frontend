import './LanguagesLinks.css';
import { Link } from 'react-router-dom';

function LanguagesLinks(props){
    return( 
        <div className="language-links">
            <Link className="language-link" to={props.languageLinkRus}>
                <button className="language__button language__button_russian"></button>
                <span className="language-link-text">Ru</span>
            </Link>
            <Link className="language-link" to={props.languageLinkEng}>
                <button className="language__button language__button_english"></button>
                <span className="language-link-text">En</span>
            </Link>
          </div>
    )
};

export default LanguagesLinks;