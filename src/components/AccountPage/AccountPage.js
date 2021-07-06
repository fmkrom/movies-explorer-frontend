import Header from "../Header/Header";
import OverlayMenu from "../OverlayMenu/OverlayMenu";
import Account from "../Account/Account";

function AccountPage(props){
    function editProfile(){
        props.updateUser();
    }

    function handleLogout(){
        props.logout();
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
            logout={handleLogout}
            errorMessageText={props.errorMessageText}
        />
    </>   
    )
}

export default AccountPage;