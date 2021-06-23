import '../NavTab/NavTab.css';

import IconLink from '../IconLink/IconLink';

function NavTab(){

return (
    <nav className="navtab">
        <IconLink name="О проекте" />
        <IconLink name="Технологии" />
        <IconLink name="Cтудент" />
    </nav>
    )
};
    
export default NavTab;