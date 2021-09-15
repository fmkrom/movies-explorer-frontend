import './Portfolio.css';
import Profile from '../Profile/Profile';

import ContentBlock from "../ContentBlock/ContentBlock";
import PortfolioItem from "../Portfolio/PortfolioItem/PortfolioItem";
import LanguagesLinks from '../LanguagesLinks/LanguagesLinks';

function Portfolio(props){
    return (
            <>
                <ContentBlock>
                <LanguagesLinks 
                    languageLinkRus="../portfolio/ru"
                    languageLinkEng="../portfolio/en"
                />
                </ContentBlock>
                <ContentBlock>
                <Profile 
                    title={props.portfolioTitle}
                    subtitle={props.portfolioSubtitle}
                    buttonText={props.buttonText}
                    linkRoute={props.linkRoute}
                >
                    <p className="portfolio__info">{props.portfolioName}</p>
                </Profile>

                    {
                        props.projects.map((item)=>{
                            return <PortfolioItem
                                typeTitle={props.typeTitle}
                                technologiesTitle={props.technologiesTitle}
                                githubTitle={props.githubTitle}
                                frontendTitle={props.frontendTitle}
                                backendTitle={props.backendTitle}
                                link={item.link}
                                key={item.order}
                                image={item.image}
                                name={item.name}
                                techs={item.techs}
                                type={item.type}
                                gotBackend={item.gotBackend}
                                description={item.description}
                                features={item.features}
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
    
    