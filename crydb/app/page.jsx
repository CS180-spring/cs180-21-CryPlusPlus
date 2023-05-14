'use client';
import Link from 'next/link'
import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
  fetch('/')
  .then(res => res.text())
  .then(text => text.replaceAll('\'','"'))
  .then(JSON.parse)
  .then(console.log)
  .catch(console.error);
/*
  fetch('/users')
  .then(res => res.text())
  .then(text => text.replaceAll('\'','"'))
  .then(JSON.parse)
  .then(console.log)
  .catch(console.error);
*/
}, []);
  return (
    <div>
      <div className='bg-figma-purple w-full h-40 mb-44' />
      <div className='flex flex-col w-full font-inter items-center justify-center gap-4'>
        <div className='font-bold text-4xl'>
          Welcome to CryDB
        </div>
        <div className='font-bold text-xl'>
          Stop crying over your data
        </div>
        <Link className='bg-figma-lightpurple rounded px-4 py-2 mt-4' href='main'>
          Get Started
        </Link>
      </div>
    </div>
  )
}

export default Home
