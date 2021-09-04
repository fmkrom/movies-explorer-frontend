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