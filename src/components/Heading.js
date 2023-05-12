//js imports
import PropTypes from 'prop-types';

//image imports
import logo from '../images/logoLight.png';

//css imports
import '../css/Heading.css';

/**
 * @param {string} id        - The id
 * @param {string} [datanav] - Set to exclude from nav by default 
 * 
 * @returns A header formatted with bootstrap
 */

function Heading({ id, datanav }) {
  return (
    <header id={id} datanav={`${datanav}`} className="spin">
      <div className="row align-items-center">
        <div className="col">
          <img src={logo} alt="The light colour pallette of Morgan Daley's Logo" id="logo"
            className="d-block mx-auto" />
        </div>
        <div className="col mx-5 namePlate">
          <h1>Morgan Daley</h1>
          <p>Full Stack Engineer</p>
          <p><small>Morgan Daley &copy; 2021</small></p>
        </div>
      </div>
    </header>
  );
}

Heading.propTypes = {
  id: PropTypes.string.isRequired,
  datanav: PropTypes.bool.isRequired,
}

export default Heading;
