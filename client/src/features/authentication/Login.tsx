import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

import PageLayout from '../../styles/PageLayout';
import Logo from '../../ui/Logo';
import PasswordInput from '../../ui/PasswordInput';

import { useLogin } from './useLogin';
import { useUser } from './useUser';

export default function Login() {
  const { user } = useUser();

  if (user) return <Navigate to="/expenses" replace />;

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { login, isPending } = useLogin();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    login(formData);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  }

  return (
    <PageLayout>
      <div className="flex items-center justify-center px-6">
        <div
          className="
        w-full
        max-w-md
        rounded-4xl
        border
        border-white/5
        bg-background-secondary
        p-10
        shadow-[0_10px_40px_rgba(0,0,0,0.45)]
      "
        >
          <div className="flex flex-col items-center">
            <div
              className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            border
            border-brand/20
            bg-brand/10
          "
            >
              <Logo />
            </div>

            <h1
              className="
            mt-6
            text-4xl
            font-semibold
            text-text-primary
          "
            >
              Aurum
            </h1>

            <p className="mt-3 text-sm text-text-muted">
              Intelligent Expense Management
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-5">
            <input
              type="email"
              id="email"
              required
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="
            h-14
            rounded-2xl
            border
            border-border-primary
            bg-background-tertiary
            px-5
            text-text-primary
            outline-none
            transition-all
            placeholder:text-text-disabled
            focus:border-brand
          "
            />

            <PasswordInput
              id="password"
              required
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-text-muted">
                <input type="checkbox" className="accent-brand" />
                Remember me
              </label>

              <Link
                to="/forgot-password"
                className="
              text-sm
              text-brand
              hover:opacity-80
            "
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="
              mt-2
              h-14
              rounded-2xl
              bg-accent
              font-semibold
              tracking-wide
              text-base
              transition-all
              hover:translate-y-px
              hover:bg-brand-hover
              disabled:opacity-70
            "
            >
              {isPending ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </PageLayout>
  );
}
