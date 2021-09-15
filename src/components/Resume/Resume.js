import '../Resume/Resume.css';
import ContentBlock from '../ContentBlock/ContentBlock';
import BlockHeadline from '../BlockHeadline/BlockHeadline';
import ResumeList from './ResumeList/ResumeList';
import ResumeItem from './ResumeItem/ResumeItem';
import Profile from '../Profile/Profile';
import LanguagesLinks from '../LanguagesLinks/LanguagesLinks';

function Resume(props){

return (
      <>
        <ContentBlock>
          <LanguagesLinks 
            languageLinkRus="../resume/ru"
            languageLinkEng="../resume/en"
          />
        </ContentBlock>
        <ContentBlock>
          <Profile
            title={props.data.header.title}
            subtitle={props.data.header.subtitle}
            buttonText={props.data.header.buttonText}
            linkRoute={props.data.header.buttonLink}
          >
            <p className="profile__item">{props.data.header.info.born}</p>
            <p className="profile__item">{props.data.header.info.nationality}</p>
            <p className="profile__item">{props.data.header.info.married}</p>
          </Profile>
        </ContentBlock>
        <ContentBlock>
          <div className="resume__block resume__block_skills">
              <BlockHeadline
                blockTitle={props.data.skills.headline}
              />
              <ResumeList 
                list={props.data.skills.list}
              />
          </div>
        </ContentBlock>
        <ContentBlock>
          <div className="resume__block resume__block_skills">
              <BlockHeadline
                blockTitle={props.data.languages.headline}
              />
              <ResumeList 
                list={props.data.languages.list}
              />
          </div>
        </ContentBlock>
        <ContentBlock>
          <div className="resume__block resume__block_education">
              <BlockHeadline
                blockTitle={props.data.courses.headline}
              />
              {
                props.data.courses.courses.map((item)=>{
                  return <ResumeItem 
                    key={item.key}
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
              blockTitle={props.data.career.headline}
            />
            {
              props.data.career.jobs.map((item)=>{
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
              blockTitle={props.data.education.headline}
            />
            {
              props.data.education.universities.map((item)=>{
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

    </>
    )
};

export default Resume;

/*
        <ContentBlock>
          <div className="resume__block resume__block_skills">
              <BlockHeadline
                blockTitle={props.info.skills.blockTitle}
              />
              <ResumeList 
                list={props.info.skills}
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
                  key={item.key}
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
              props.info.career.map((item)=>{
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
          list={props.info.qualities}
        />
      </ContentBlock>
      <ContentBlock>
        <div className="resume__block resume__block_misc">
            <BlockHeadline
              blockTitle="Дополнительные сведения"
            />
        </div>
        <ResumeList 
          list={props.info.misc}
        />
      </ContentBlock>
      </>
*/

