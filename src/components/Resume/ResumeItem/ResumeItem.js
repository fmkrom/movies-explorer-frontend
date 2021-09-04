import './ResumeItem.css';
import ResumeList from "../ResumeList/ResumeList";

function ResumeItem(props){
    return (
        <div className="resume-item">
            <div className="resume-item__title-block">
                <span className="resume-item__title">{props.title}</span>
            </div>
            <span className="resume-item__subtitle">{props.subtitle}</span>
            <ResumeList 
                key={props.duties}
                list={props.duties}
            />
        </div>
    )
};

export default ResumeItem;

