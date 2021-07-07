import Header from "../Header/Header";
import OverlayMenu from "../OverlayMenu/OverlayMenu";
import Account from "../Account/Account";

function AccountPage(props){
    function editProfile(){
        props.updateUser();
    }

    return(
    <>
        <OverlayMenu 
            isOpen={props.isOverlayMenuOpen}
            isClosed={props.isOverlayMenuClosed}
        />
        <Header 
            isLoggedIn={props.loggedIn}
            onOpenOverlayMenu={props.openOverlayMenu}
        />
        <Account 
            userName={props.userName}
            userEmail={props.userEmail}
            onEditProfile={editProfile}
            logout={()=>{props.logout()}}
            errorMessageText={props.errorMessageText}
            editProfileButtonShown={props.editProfileButtonDisplayed}
            saveProfileButtonShown={props.saveProfileButtonDisplayed}
            showSaveProfileButton={()=>{props.showSaveProfileButton()}}
        />
    </>   
    )
}

export default AccountPage;