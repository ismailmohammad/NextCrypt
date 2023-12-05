'use client';
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';

export default function Register() {
  const router = useRouter();

  const [formData, setFormData ] = useState({
    email: "",
    password: "",
    confirm: ""
  });

  const [disableRegister, setDisableRegister] = useState(true);
  // TODO: use to show progress
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    const {email, password, confirm} = formData;
    if (email.length > 0 && password.length > 0 && confirm.length > 0) {
      setDisableRegister(false);
    } else {
      if (!disableRegister) setDisableRegister(true);
    }
  }, [formData])

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setValidationErrors({});
    const response = await fetch("/api/register", {
      method: "POST",
      body: new FormData(event.currentTarget),
    });
    if (!response.ok) {
        const errors = await response.json();
        // console.log(errors); 
        if (errors.error) { toast.error(errors.error); }
        const { email, password, confirm } = errors;
        setValidationErrors((prevErrors) => ({
            ...prevErrors,
            email, password, confirm
        }))
        return;
    }
    const message = await response.json();
    toast.success(message.message);
    router.push(`/login/verify/${formData.email}`);
  }

  interface RegistrationError {
    _errors: string[]
  }

  interface ValidationError {
    [field: string]: RegistrationError
  }

  const [validationErrors, setValidationErrors ] = useState<ValidationError>({});

  function Errors(props: {errors?: string[]}){
    if(!props.errors?.length) return null;
    return <>{props.errors.map(err => <label key={err} className="block text-sm font-medium leading-6 text-red-900 dark:text-red-300">{err}</label>)}</>
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
          Claim Your Crypt
        </h2>
        <p className='mt-10 text-center text-sm text-gray-500 dark:text-gray-300'>
          {"Already have a crypt? "}
          <Link href={'/login'} className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500 dark:text-indigo-300'>
            Sign in Instead
          </Link>
        </p>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form className='space-y-6' onSubmit={onSubmit}>
          <div>
            <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900 dark:text-slate-300'>
              Email address*
            </label>
            <div className='mt-2'>
              <input
                id='email'
                name='email'
                type='email'
                value={formData.email}
                onChange={handleChange}
                autoComplete='email'
                placeholder='nando@therelentless.com'
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
                Password*
              </label>
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
            <div className='flex items-center justify-between'>
              <label
                htmlFor='confirmPassword'
                className='block text-sm font-medium leading-6 text-gray-900 dark:text-slate-300'>
                Confirm Password*
              </label>
            </div>
            <div className='mt-2'>
              <input
                id='confirm'
                name='confirm'
                type='password'
                autoComplete='current-password'
                placeholder='Confirm Password'
                minLength={8}
                value={formData.confirm}
                onChange={handleChange}
                required
                className='p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
              <Errors errors={validationErrors?.confirm?._errors} />
            </div>
          </div>
          <div>
            <button
              type='submit'
              className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${disableRegister ? 'bg-slate-500 hover:bg-slate-500' : ''}`}
              disabled={disableRegister}>
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
