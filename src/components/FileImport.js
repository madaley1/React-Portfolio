import PropTypes from 'prop-types';
import React, { useState, useEffect } from "react";

import 'bootstrap/js/dist/carousel'
import 'bootstrap/js/dist/carousel.js.map'

const get_text_file = async (filepath) => {
  //fetches data and waits for its return, uses public url
  const res = await fetch(`${process.env.PUBLIC_URL}/${filepath}`);
  
  //checking for errors. var.ok returns bool
  if (!res.ok) {
    throw res;
  }
  return res.text();
}

// {fileName} is equivalent to props.fileName and allows for specific data to be passed in without passing in all props

/**
 * @param {string} fileName    - The File to return
 * @param {string} [className] - Classes passed in for the <p> 
 * 
 * @returns A paragraph tag with the formatted text
 */

export function TextFile({ fileName, className }) {
  const [text, setText] = useState(``);

  useEffect(() => {
    get_text_file(`${fileName}.txt`).then(setText).catch(console.error);
  }, [fileName]);
  return (
    <p className={className} dangerouslySetInnerHTML={{ __html: String.raw`${text}` }}></p>
  );

}

const get_logo_file = async () => {
  //fetches data and waits for its return, uses public url
  const res = await fetch(`${process.env.REACT_APP_JSON_SERVER}/logos/`);
  
  //checking for errors. var.ok returns bool
  if (!res.ok) {
    throw res;
  }
  return res.json();
}

export function LogoFile({ projTitle, className }) {
  const [src, setSrc] = useState(``);
  useEffect(() => {
    get_logo_file().then((res)=>{
      setSrc(res[projTitle]["src"])
    }).catch(console.error);
  }, [projTitle]);
  return (
    <img className={"d-block px-3 m-0 "+className} src={src} />
  );

}

const get_slide_data = async () => {
  const res = await fetch(`${process.env.REACT_APP_JSON_SERVER}/carousels/`);
  
  if (!res.ok) {
    throw res;
  }
  return res.json();
}

/** 
 * @param {string} projDir     - The project directory to claim the slides from
 * @param {string} uid         - The unique id of the carousel
 * @param {string} [className] - Classes to be passed onto the carousel
 * 
 * @returns A set of slides formatted in a carousel
 */

export class CarouselImages extends React.Component{
  state = {
    json: {},
    isLoading: false,
    isLoaded: false,
    indicators: "",
    slides: ""
  }

  constructor() {
    super();
    this.state = {isLoading: true}
  }

  
  componentDidMount(){
    get_slide_data().then((res) => {
      this.setState({
        json: res, 
        isLoading: false, 
        isLoaded: true
      }); 
      this.process_Indicators(); 
      this.process_Slides(); 
    });
  }

  process_Indicators(){
    let temp = "";
    let json = this.state.json;
    for(let i in json[this.props.projTitle]){
      if(i == 1){
        temp += `<button type="button" data-bs-target=#${this.props.uid} data-bs-slide-to="${(i-1)}" class="active" aria-label="${"Slide " + (i)}" aria-current="true"></button>`
      }else{
        temp += `<button type="button" data-bs-target=#${this.props.uid} data-bs-slide-to="${(i-1)}" class="" aria-label="${"Slide " + (i)}" aria-current="true"></button>`
      }
    }
    this.setState({indicators: temp});
  }

  process_Slides(){
    let temp = "";
    let json = this.state.json;
    for(let i in json[this.props.projTitle]){
      let index = json[this.props.projTitle][`${i}`];
      if(i == 1){
        temp +=  `<div class="carousel-item active">
                    <img src=${index.src} class="d-block">
                    <div class="carousel-caption d-none d-md-block">
                      <h5 class="h5">${index.heading}</h5>
                      <p>${index.desc}</p>
                    </div>
                  </div>`;
      }else{
        temp +=  `<div class="carousel-item">
                    <img src=${index.src} class="d-block">
                    <div class="carousel-caption d-none d-md-block">
                      <h5 class="h5">${index.heading}</h5>
                      <p>${index.desc}</p>
                    </div>
                  </div>`;
      }
    }
    this.setState({slides: temp});
  }

  render() {
    
    let indicators = this.state.indicators;
    let slides = this.state.slides;
    return(
      <div className={`carousel slide projImg py-2 col-4 ${this.props.className}`} id={this.props.uid} data-bs-ride="carousel">
        {
          this.state.isLoaded ? <><div className="carousel-indicators" dangerouslySetInnerHTML={{__html:String.raw`${indicators}`}}></div><div className="carousel-inner" dangerouslySetInnerHTML={{__html:String.raw`${slides}`}}></div></> : <p>Loading...</p>
        }
        <button className="carousel-control-prev" type="button" data-bs-target={"#"+this.props.uid} data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target={"#"+this.props.uid} data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    );
  }
}

CarouselImages.defaultProps = {
  className: ""
}

CarouselImages.propTypes = {
  projTitle: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  className: PropTypes.string
}