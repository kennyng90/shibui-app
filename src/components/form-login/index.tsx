import { FormEvent, useState } from 'react';
import { supabase } from '@/lib/auth/client';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      alert(error.message);
    } else {
      alert('Check your email for the login link!');
    }
    setLoading(false);
  };

  return (
    <div className="mt-28 flex border-black">
      <form className="grid w-full gap-10" onSubmit={handleLogin}>
        <input
          className="w-full border-b-2 border-black py-2 text-5xl focus:outline-none"
          type="email"
          autoFocus
          placeholder="your@email.com"
          value={email}
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="w-fit rounded bg-black px-3 py-2 text-left text-white hover:bg-gray-800"
          disabled={loading}
        >
          {loading ? <span>Loading</span> : <span>Send magic link</span>}
        </button>
      </form>
    </div>
  );
}
