import '../Resume/Resume.css';
import ContentBlock from '../ContentBlock/ContentBlock';
import BlockHeadline from '../BlockHeadline/BlockHeadline';
import ResumeList from './ResumeList/ResumeList';
import ResumeItem from './ResumeItem/ResumeItem';
import Profile from '../Profile/Profile';

function Resume(props){

return (
        <>
        <ContentBlock>
          <Profile
            title="Ефим Романенко"
            subtitle="Junior Web-Разработчик"
            buttonText="Портфолио"
            linkRoute='./portfolio'
          >
            <p className="profile__item">Год рождения: 1985</p>
            <p className="profile__item">Место жительства: Россия, Москва</p>
            <p className="profile__item">Гражданство: Россия</p>
          </Profile>
        </ContentBlock>
        <ContentBlock>
          <div className="resume__block resume__block_skills">
              <BlockHeadline
                blockTitle="Ключевые навыки"
              />
              <ResumeList 
                list={props.info.skills.main}
              />
          </div>
        </ContentBlock>
        <ContentBlock>
          <div className="resume__block resume__block_skills">
              <BlockHeadline
                blockTitle="Дополнительные навыки"
              />
              <ResumeList 
                list={props.info.skills.additional}
              />
          </div>
        </ContentBlock>
        <ContentBlock>
          <div className="resume__block resume__block_skills">
              <BlockHeadline
                blockTitle="Владение иностранными языками"
              />
              <ResumeList 
                list={props.info.skills.languages}
              />
          </div>
        </ContentBlock>
        <ContentBlock>
        <div className="resume__block resume__block_education">
            <BlockHeadline
              blockTitle="Образовательные курсы"
            />
            {
              props.info.courses.map((item)=>{
                return <ResumeItem 
                  dates={item.dates}
                  title={item.title}
                  subtitle={item.subtitle}
                  duties={item.duties}
                />
              })
            }
        </div>
      </ContentBlock>
      <ContentBlock>
        <div className="resume__block resume__block_career">
            <BlockHeadline
              blockTitle="Карьера"
            />
            {
              props.info.jobs.map((item)=>{
                return <ResumeItem 
                  dates={item.dates}
                  title={item.title}
                  subtitle={item.subtitle}
                  duties={item.duties}
                />
              })
            }
        </div>
      </ContentBlock>
      <ContentBlock>
        <div className="resume__block resume__block_education">
            <BlockHeadline
              blockTitle="Образование"
            />
            {
              props.info.education.map((item)=>{
                return <ResumeItem 
                  dates={item.dates}
                  title={item.title}
                  subtitle={item.subtitle}
                  duties={item.duties}
                />
              })
            }
        </div>
      </ContentBlock>
      <ContentBlock>
        <div className="resume__block resume__block_misc">
            <BlockHeadline
              blockTitle="Личные качества"
            />
        </div>
        <ResumeList 
          list={props.info.otherInfo.qualities}
        />
      </ContentBlock>
      <ContentBlock>
        <div className="resume__block resume__block_misc">
            <BlockHeadline
              blockTitle="Дополнительные сведения"
            />
        </div>
        <ResumeList 
          list={props.info.otherInfo.miscellanea}
        />
      </ContentBlock>
      </>
      )
};

export default Resume;

