import { Link } from '@tanstack/react-router';

const Navbar = () => {
  return (
    <header className="h-[100px] py-4">
      <nav className="flex justify-end">
        <ul className="flex gap-8">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
