import "./PortfolioItem.css";
import BlockHeadline from "../../BlockHeadline/BlockHeadline";

function PortfolioItem(props){
    console.log(props);
    
    return (
            <div className="portfolio-item">
                <BlockHeadline
                    blockTitle={`Проект "${props.name}"`}
                />
                <div className="portfolio-item__intro-block">
                    <a className="portfolio__link" href={props.link}>
                        <img className="portfolio__image" src={props.image} alt="Фото проекта" />
                    </a>
                    <div className="portfolio-item__text">
                        <div className="portfolio-item__text-block">
                            <span className="portfolio-item__text-item">Тип: </span>
                            <span>{props.type}</span>
                        </div>
                        <div className="portfolio-item__text-block">
                            <span className="portfolio-item__text-item">Технологии: </span>
                            <span>{props.techs}</span>
                        </div>
                        <div className="portfolio-item__text-block">
                            <span className="portfolio-item__text-item">Код проекта на Github: </span>
                            <a className="portfolio-item__github-link portfolio-item__github-link_shown" href={props.githubFrontend}>Фронтэнд</a>
                            <span className={`${props.gotBackend ? 'portfolio-item__github-link_shown' : 'portfolio-item__github-link_hidden'}
                            `}>&nbsp;/&nbsp;</span>
                            <a href={props.githubBackend}
                                className={`portfolio-item__github-link
                                ${props.gotBackend ? 'portfolio-item__github-link_shown' : 'portfolio-item__github-link_hidden'}
                            `}> Бэкенд</a>
                        </div>
                    </div>
                </div>
                <p className="portfolio-item__description">{props.description}</p>
            </div>
        )
    };
    
export default PortfolioItem;
    
/*
function PortfolioItem(props){
    return (
            <div className="portfolio-item">
                <div className="portfolio-item__intro-block">
                    <img src={props.image} alt="Фото проекта" />
                    <div className="portfolio-item__text">
                        <div className="portfolio-item__text-block">
                            <span className="portfolio-item__text-item">Проект: </span>
                            <span className="portfolio-item__text-headline">{props.name}</span>
                        </div>
                        <div className="portfolio-item__text-block">
                            <span className="portfolio-item__text-item">Тип: </span>
                            <span>{props.type}</span>
                        </div>
                        <div className="portfolio-item__text-block">
                            <span className="portfolio-item__text-item">Технологии: </span>
                            <span>{props.techs}</span>
                        </div>
                        <div className="portfolio-item__text-block">
                            <a href={props.github}>Код проекта на Github</a>
                        </div>
                    </div>
                </div>
                <p className="portfolio-item__description">{props.description}</p>
            </div>
        )
    };
    
export default PortfolioItem;
*/
    