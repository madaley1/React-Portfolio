// css imports
import '../css/Navbar.css';

/**
 * @param {string} [id] - The id
 * 
 * @returns An empty navbar. This will be aggregated via JS clientside
 */

function Navbar({id}) {
  return (
    <nav id={id} className="my-3 navbar navbar-expand-lg">
    </nav>
  );
}

export default Navbar;