import './Table.css';

import TableCells from './TableCells/TableCells';

function Table(props){

    console.log(props.data);
    
    return(
        <div className="data">
            <div>
                <table className="data-table">
                <caption className="table__title">Полный список фильмов BeatFilm</caption>
                    <thead>
                        <tr>
                            <th className="table__cell-header">Название</th>
                            <th className="table__cell-header">Режисер</th>
                            <th className="table__cell-header">Год</th>
                            <th className="table__cell-header">Страна</th>
                            <th className="table__cell-header">Трейлер</th>
                        </tr>
                    </thead>
                        {
                           props.data.map((item)=>{
                            return(
                                <TableCells
                                    key={item.id}
                                    name={item.nameRU}
                                    director={item.director}
                                    year={item.year}
                                    country={item.country}
                                    trailer={item.trailerLink}
                                />
                            )         
                           })
                        }
                </table>
            </div>
        </div>            
    )
}

export default Table;