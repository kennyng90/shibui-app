import { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { supabase } from '@/lib/client';
import { User, AuthChangeEvent, Session } from '@supabase/supabase-js';

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          data: { user }
        } = await supabase.auth.getUser();
        setCurrentUser(user);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();

    const authListener = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        if (event === 'SIGNED_OUT') {
          setCurrentUser(null);
        } else if (event === 'SIGNED_IN' && session?.user) {
          setCurrentUser(session.user);
        }
      }
    );

    // Cleanup the listener when the component is unmounted
    return () => {
      authListener.data.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error.message);
    } else {
      setCurrentUser(null);
    }
  };

  return (
    <header className="h-[100px] py-4">
      <nav className="flex justify-end">
        <ul className="flex gap-6">
          <li>
            <Link to="/">Home</Link>
          </li>
          {currentUser ? (
            <li>
              <button onClick={handleLogout}>Log out</button>
            </li>
          ) : (
            <li>
              <Link to="/sign-in">Log in</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
