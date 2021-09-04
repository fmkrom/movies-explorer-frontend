import './ResumeList.css';
import ResumeListItem from "../ResumeListItem/ResumeListItem";

function ResumeList(props){
    return(
    <ul className="resume__list">
        {
            props.list.map((item)=>{
               return <ResumeListItem key={item} text={item} />
            })
        }
    </ul>
    )
};

export default ResumeList;
