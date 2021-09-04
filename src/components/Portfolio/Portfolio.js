import './Portfolio.css';
import Profile from '../Profile/Profile';

import ContentBlock from "../ContentBlock/ContentBlock";
import PortfolioItem from "../Portfolio/PortfolioItem/PortfolioItem";

function Portfolio(props){
    return (
            <>
                <ContentBlock>
                <Profile 
                    title="Портфолио"
                    subtitle="Junior Web-Разработчика"
                    buttonText="Резюме"
                    linkRoute='./resume'
                >
                    <p className="portfolio__info">Ефим Романенко</p>
                </Profile>

                    {
                        props.projects.map((item)=>{
                            console.log(props.projects);
                            return <PortfolioItem
                                link={item.link}
                                key={item.order}
                                image={item.image}
                                name={item.name}
                                techs={item.techs}
                                type={item.type}
                                gotBackend={item.gotBackend}
                                description={item.description}
                                githubFrontend={item.githubFrontend}
                                githubBackend={item.githubBackend}
                            />
                        })
                    }
                </ContentBlock>
            </>
        )
    };
    
export default Portfolio;
    
    