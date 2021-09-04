import './TableCells.css';

function TableCells(props){
    return(
        <tbody>
            <tr>
                <td className="table__cell-content table__cell-content_left">{props.name}</td>
                <td className="table__cell-content table__cell-content_left">{props.director}</td>
                <td className="table__cell-content">{props.year}</td>
                <td className="table__cell-content table__cell-content_left">{props.country}</td>
                <td className="table__cell-content">
                    <a className="table__cell-link" target="_blank" rel="noreferrer" href={props.trailer}> &#x2192; </a>
                </td>
            </tr>
        </tbody>
    )             
}

export default TableCells;