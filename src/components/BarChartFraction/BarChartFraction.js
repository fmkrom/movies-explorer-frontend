import './BarChartFraction.css';

function BarChartFraction(props){
    return (
        <div className={`bar-chart-fraction 
                        ${props.isSmall ? 'bar-chart-fraction_small' : 'bar-chart-fraction_large'}`}>
            <div className={`bar-chart-fraction__bar 
                        ${props.isSmall ? 'bar-chart-fraction__bar_highlighted' : 'bar-chart-fraction__bar_plain'}`}>
                <p className="bar-chart__text bar-chart__text_dark">{props.title}</p>
            </div>
                <p className="bar-chart__text bar-chart__text_light">{props.subtitle}</p>
        </div>
    )
}

export default BarChartFraction;