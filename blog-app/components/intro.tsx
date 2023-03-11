import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/user-context/user.context';

const Intro = () => {
  const { user } = useContext(UserContext);
  const [username, setUsername] = useState<string>();

  useEffect(() => {
    const getInfo = async () => {
      if (user) {
        const info = await user.getInfo();
        if (info) {
          setUsername(info?.node?.alias);
        }
      }
    };
    getInfo();
  }, [user]);

  return (
    <section className='flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12'>
      <h1 className='text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8'>
        📎 Pay as you read.
      </h1>
      <h4 className='text-center md:text-left text-lg mt-5 md:pl-8'>
        {!user ? (
          <Link href='/login' className='underline'>
            Login
          </Link>
        ) : (
          <div>Hello {username ?? 'stranger'}!</div>
        )}
      </h4>
    </section>
  );
};

export default Intro;
