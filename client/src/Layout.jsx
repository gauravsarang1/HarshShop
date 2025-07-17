import { Outlet } from 'react-router-dom';
import { useFetchUser } from '../hooks/useFetchUser';

const Layout = () => {
  useFetchUser(); // Fetch user on route change

  return (
    <div>
      {/* Your navbar, sidebar, etc. */}
      <Outlet />
    </div>
  );
};

export default Layout;
