import './Profile.css';
import ProfilePhoto from '../../images/profile_photo.jpg';
import LargeLink from '../LargeLink/LargeLink';

function Profile(props){
    return(
        <div className="profile__block">
            <img className="profile__photo" src={ProfilePhoto} alt="Фото" />
            <div className="profile__info">
                <div className="profile__info-text">
                  <h1 className="profile__title">{props.title}</h1>
                  <h2 className="profile__subtitle">{props.subtitle}</h2>
                  <div>
                    {props.children}
                  </div>
                  <div className="profile__icons">
                    <a href="mailto: fmkrom@yandex.ru">
                      <button className="profile__icon profile__icon_mail"></button>
                    </a>
                    <a href="https://api.whatsapp.com/send?phone=+79651658664">
                      <button className="profile__icon profile__icon_whatsapp"></button>
                    </a>
                    <a href="https://github.com/fmkrom">
                      <button className="profile__icon profile__icon_github"></button>
                    </a>
                  </div>
                </div>
                <div className="profile__info-buttons">
                <LargeLink
                  name={props.buttonText}
                  linkRoute={props.linkRoute}
                />
                </div>
            </div>
          </div>
    )
}

export default Profile;