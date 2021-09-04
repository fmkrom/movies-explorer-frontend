import './LargeLink.css';

function LargeLink(props){

return (
        <a href={props.linkRoute} className="large_link">{props.name}</a>
    )
};
    
export default LargeLink;