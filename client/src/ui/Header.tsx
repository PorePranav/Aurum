import { Link } from 'react-router-dom';

import { useUser } from '../features/authentication/useUser';

const renderGuestLinks = () => (
  <Link to="/login">
    <li className="hover:underline hover:text-muted">Login</li>
  </Link>
);

const renderUserLinks = () => (
  <Link to="/expenses">
    <li className="hover:underline hover:text-muted">Expenses</li>
  </Link>
);

const Header: React.FC = () => {
  const { user } = useUser();

  return (
    <header className="w-full sm:w-[80%] mx-auto px-5 sm:px-0">
      <div className="flex justify-between items-center mx-auto py-3">
        <Link to={'/'}>
          <div className="flex gap-4 items-center">
            <img src="/logo.png" className="h-16 w-12" alt="Aurum Logo" />
            <h1 className="font-bold text-xl sm:text-xl flex flex-wrap text-accent">
              <span>Aurum</span>
            </h1>
          </div>
        </Link>

        <ul className="flex gap-4 items-center">
          {user ? renderUserLinks() : renderGuestLinks()}
        </ul>
      </div>
    </header>
  );
};

export default Header;
