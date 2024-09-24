import { Link, Outlet } from 'react-router-dom';

const MainPage = () => (
  <>
    <nav>
      <ul>
        <li>
          <Link to="*">PageNotFound</Link>
        </li>
        <li>
          <Link to="/login">LoginPage</Link>
        </li>
      </ul>
    </nav>
    <hr />
    <Outlet />
  </>
);

export default MainPage;
