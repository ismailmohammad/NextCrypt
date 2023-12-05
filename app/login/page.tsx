'use client';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, FormEvent } from "react";
import toast, { Toaster } from 'react-hot-toast';
import Spinner from '../../public/loading.svg';

export default function Login() {
  const router = useRouter();
  const [disableLogin, setDisableLogin] = useState<boolean>(true);
  const [loggingIn, setLoggingIn] = useState<boolean>(false);
  const [formData, setFormData ] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const {email, password} = formData;
    if (email.length > 0 && password.length > 0) {
      setDisableLogin(false);
    } else {
      if (!disableLogin) setDisableLogin(true);
    }
  }, [formData])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function onLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoggingIn(true);
    const response = await fetch("/api/login", {
      method: "POST",
      body: new FormData(event.currentTarget),
    });
    if (!response.ok) {
        const errors = await response.json();
        // console.log(errors); 
        if (errors.error) { toast.error(errors.error); }
        const { email, password, confirm } = errors;
        // setValidationErrors((prevErrors) => ({
        //     ...prevErrors,
        //     email, password, confirm
        // }))
        setLoggingIn(false);
        return;
    }
    const message = await response.json();
    toast.success(message.message);
    setLoggingIn(false);
    // router.push(`/dash/${formData.email}`);
    router.push(`/dash/`);
  }


  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 dark:bg-gray-700'>
      <Toaster />
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <Link href={"/"}>
          <Image
            src='/nextcrypt-logo-symbol-dark.png'
            className='mx-auto h-40 w-auto hover:scale-110 ease-in-out duration-500'
            height={200}
            width={200}
            alt='NextCrypt Logo'
          />
        </Link>
        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-slate-300'>
          Sign in to your Crypt
        </h2>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form className='space-y-6' onSubmit={onLogin}>
          <div>
            <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900 dark:text-slate-300'>
              Email address
            </label>
            <div className='mt-2'>
              <input
                id='email'
                name='email'
                type='email'
                autoComplete='email'
                placeholder='nando@therelentless.com'
                value={formData.email}
                onChange={handleChange}
                required
                className='p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </div>
          </div>

          <div>
            <div className='flex items-center justify-between'>
              <label
                htmlFor='password'
                className='block text-sm font-medium leading-6 text-gray-900 dark:text-slate-300'>
                Password
              </label>
              <div className='text-sm'>
                <Link tabIndex={-1} href='/login/forgot' className='font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-300'>Forgot password?</Link>
              </div>
            </div>
            <div className='mt-2'>
              <input
                id='password'
                name='password'
                type='password'
                autoComplete='current-password'
                placeholder='Password'
                minLength={8}
                value={formData.password}
                onChange={handleChange}
                required
                className='p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${disableLogin || loggingIn ? 'bg-slate-500 hover:bg-slate-500' : ''}`}
              disabled={disableLogin || loggingIn}>
              {loggingIn ? <Image src={Spinner} alt="Loading Spinner" className="h-9"/> : "Sign in"}
            </button>
          </div>
        </form>

        <p className='mt-10 text-center text-sm text-gray-500 dark:text-gray-300'>
          {"Don't have a crypt yet? "}
          <a href='/login/register' className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500 dark:text-indigo-300'>
            Register Today
          </a>
        </p>
      </div>
    </div>
  );
}
