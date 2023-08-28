import { FormEvent, useState, useEffect } from 'react';
import { supabase } from '@/lib/client';

export default function SignInUp() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');

  const handleMagicLinkRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      console.error(error.message);
      setErrorMessage(error.message);
    }

    setLoading(false);
    setSuccess(!error);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (success) {
      timer = setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } else if (errorMessage) {
      timer = setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [success, errorMessage]);

  return (
    <div className="mt-28 grid gap-5 border-black">
      <h1 className="mb-10 text-5xl font-bold">Sign in or sign up</h1>
      <form className="grid w-full gap-10" onSubmit={handleMagicLinkRequest}>
        <input
          className="w-full border-b-2 border-black py-2 text-5xl focus:outline-none"
          type="email"
          autoFocus
          autoSave="true"
          placeholder="your@email.com*"
          value={email}
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="grid gap-5">
          <button
            className="w-fit rounded bg-black px-3 py-2 text-left text-white hover:bg-gray-800"
            disabled={loading}
          >
            {loading ? <span>Loading</span> : <span>Send magic link</span>}
          </button>
          {success ? <p>Check your email for login link</p> : null}
          {errorMessage ? <p className="text-red-500">{errorMessage}</p> : null}
        </div>
      </form>
    </div>
  );
}
