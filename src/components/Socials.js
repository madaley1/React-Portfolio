//js imports
import PropTypes from 'prop-types';
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//data fetch for socials and their links
const get_socials_data = async () => {
  //fetches data and waits for its return, uses public url
  const res = await fetch(`${process.env.REACT_APP_JSON_SERVER}/socials`);
  
  //checking for errors. var.ok returns bool
  if (!res.ok) {
    throw res;
  }
  return res.json();
}

/**
 * @param {string}  [cardClasses] - Pass through classes to put on the returned text file
 * 
 * @returns A Container with all the socials returned from the server
 */

export class Socials extends React.Component {
  state = {
    json: [],
    src: [],
    logo: [],
    isLoading: false,
    isLoaded: false,
    socials: ``
  }

  constructor() {
    super();
    this.state = {isLoading: true}
  }

  componentDidMount(){
    get_socials_data().then((res) => {
      let array = [];
      for(let i in res){
        array.push(res[i]);
      }

      let temp = array.map((item)=>(
        <p className='mr-3 logos'>
          <a className="nav-link" href={item.link}>
            <FontAwesomeIcon icon={["fab", item.logo]} />
          </a>
        </p>
      ));

      this.setState({
        json: temp, 
        isLoading: false, 
        isLoaded: true
      });

      //this.process_socials();
    });
  }

  render(){
    let socials = this.state.socials;
    let json = this.state.json;
    return(
      <div className={'btn-row d-flex flex-column ' + this.props.className}>
        <h3 className='h3 mx-3'>Socials</h3>
        <div className='d-flex flex-row'>
          {this.state.json}
        </div>
      </div>
    );
  }

}

Socials.propTypes = {
  className: PropTypes.string
}