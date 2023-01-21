import React, { useState } from 'react';
// import { LightningIcon } from '../assets/icons';
import type { NextPage } from 'next';
import { requestProvider, WebLNProvider } from 'webln';

const Login: NextPage = () => {
  const [webln, setWebln] = useState<WebLNProvider>(null);

  const handleLogin = async () => {
    try {
      const webln = await requestProvider();
      setWebln(webln);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <section>
      <aside className='flex flex-col items-center justify-center min-h-screen py-2 -mt-56 text-center'>
        {webln ? (
          <div>Logged In! You can now create and pay invoices</div>
        ) : (
          <button
            type='button'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            onClick={handleLogin}
          >
            <svg
              className='h-10 w-auto hide-initially'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z'
                clipRule='evenodd'
              ></path>
            </svg>
            Login via Lightning
          </button>
        )}
      </aside>
    </section>
  );
};

export default Login;
