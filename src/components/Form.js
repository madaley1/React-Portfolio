import {React, useState, useRef} from 'react'
import PropTypes from 'prop-types';
import emailjs from "emailjs-com";
import ReCAPTCHA from 'react-google-recaptcha';

/**
 * @param {string} [className] - Classes passed in
 * 
 * @returns The contact form
*/

export function Form({className}){
  const form = useRef();

  const [formData, setFormData] = useState({
    'fname': '',
    'lname': '',
    'email': '',
    'message': '',
  });

  const captchaRef = useRef(null)
  
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const sendEmail = (e) => {
    e.preventDefault();
    const token = captchaRef.current.getValue();
    const params = {
      ...formData,
      'g-recaptcha-response': token,
    };
    
    emailjs.send(process.env.REACT_APP_EMAILJS_GMAIL_SERVICEID, 
                 process.env.REACT_APP_EMAILJS_TEMPLATE_KEY, 
                 params, 
                 process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      ).then((result) => {
        e.target.reset();
        console.log(result.text);
      }, (error) => {
        console.log(error);
      });
  };

  return(
    <>
      <h3 className='h3'>Contact Form</h3>
      <form className={"d-flex flex-column " + className} ref={form} onSubmit={sendEmail}>
        <label htmlFor="fname">First Name:</label>
        <input type="text" id="fname" name="fname" onChange={handleChange} />

        <label htmlFor="lname">Last Name:</label>
        <input type="text" id="lname" name="lname" onChange={handleChange} />

        <label htmlFor="email">Email:</label>
        <input type="text" id="email" name="email" onChange={handleChange} />

        <label htmlFor="message">Message</label>
        <textarea name="message" rows="20" cols="30" onChange={handleChange} ></textarea>
        <fieldset className='mt-3'>
          <ReCAPTCHA theme='dark' sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY} ref={captchaRef} /*onChange={setCaptcha(captchaRef)}*/ />
        </fieldset>
        <fieldset className="d-flex flex-row mt-3">
          <input type="submit" className="mx-2" />
          <input type="reset" className="mx-2" />
        </fieldset>
      </form>
      {/* {!captcha ? (<></>) : (<div className="px-3 mt-3"><ReCAPTCHA theme='dark' sitekey='6LepPHohAAAAANvNG79Zdu69XHTomXpXR6x4OtYT' onChange={sendEmail}/></div>) } */}
    </>
  );
}

Form.propTypes = {
  className: PropTypes.string
}