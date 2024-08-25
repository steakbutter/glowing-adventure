import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="bg-primary text-light mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link className="text-light" to="/">
            <h1 className="m-0">Video Game Lists</h1>
          </Link>
          <p className="m-0">Get into the mind of a player.</p>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role='button' className="btn btn-info m-1">{Auth.getProfile().data.username}</div>
              <ul tabIndex={0} className="menu dropdown-content bg-info rounded-box p-2">
                <li><Link className="text-light" to="/me">Profile</Link></li>
                <li><button onClick={logout}>Logout</button></li>
              </ul>
            </div>

              {/* <Link className="btn btn-info mx-2" to="/me">
                {Auth.getProfile().data.username}
              </Link> */}
              {/* <button className="btn btn-light mx-2" onClick={logout}>
                Logout
              </button> */}
            </>
          ) : (
            <>
              <Link className="btn btn-info mx-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-light mx-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
