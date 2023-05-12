//js imports
import React from 'react';
import ReactDOM from 'react-dom/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { faDiscord, faLinkedin } from '@fortawesome/free-brands-svg-icons'

//css imports
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/index.css'

//component imports
import Heading from './components/Heading'
import Card from './components/Card'
import Navbar from './components/Navbar'

// misc imports
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root'));

//libraries for FontAwesome. Hopeful to integrate dynamic addition in the future, but for now this is working
library.add(faArrowDown);
library.add(faDiscord, faLinkedin);

//the app
root.render(
  <React.StrictMode>
    <Heading id="Heading" datanav={false}/>
    <Navbar  id="Navbar"/>
    <div className="spacer">
      <p className="text-center">Scroll <FontAwesomeIcon icon={["fas", "arrow-down"]} size="2x" beatFade={true} style={{'--fa-animation-duration':'2s'}}/></p>
    </div>
    <Card id="About" cardType="text" cardBody="aboutMe" datanav={true} btnLink="https://github.com/madaley1" btnText="My Github"/>
    <article className="my-5" id="pastProjects" datanav="true">
      <h2 className="h2">Past Projects</h2>
      <p>Finished projects or projects that I am no longer participating in actively.</p>
      <Card cardType='logo'     projTitle="The College Drupal Distribution" datanav={false} btnLink="https://drupal.thecollege.asu.edu"           btnText="The College Distribution Site"/>
      <Card cardType='carousel' projTitle='Stock Comparison API'            datanav={false} btnLink="https://jsfiddle.net/madaley/r2Lpeg3j/"      btnText="jsFiddle Link"/>
      <Card cardType='carousel' projTitle='TheMovieDB API'                  datanav={false}/>
      <Card cardType="logo"     projTitle="Web Portfolio"                   datanav={false} btnLink='https://github.com/madaley1/React-Portfolio' btnText="GitHub Repo" secLink="./old-site/" secLinkText="Check out the old site" />
    </article>
    <article className="my-5" id="currentProjects" datanav="true">
      <h2 className="h2">Current Projects</h2>
      <p>Projects I am actively working on, and either are being updated or are in the works for a future first release.</p>
      <Card cardType="logo" projTitle="SleepyNova"   datanav={false} btnLink="https://sleepynova.blog" btnText="Blog Site" />
      <Card cardType="logo" projTitle="The KenpoNet" datanav={false} />
    </article>
    <Card cardType="contact" id="contact" datanav={true}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
