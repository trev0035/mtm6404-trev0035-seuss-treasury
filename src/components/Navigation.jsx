import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <h1 className="nav-title">Dr. Seuss Treasury</h1>
        <ul className="nav-links">
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? "active-link" : ""}
              end
            >
              Books
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/quotes" 
              className={({ isActive }) => isActive ? "active-link" : ""}
            >
              Quotes
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation; 