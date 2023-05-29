import React from 'react'
import Table from './Table'
import { useState } from 'react'
import Console from './Console';

const DisplayToggleSwitch = () => {
  const [toggle, setToggle] = useState('Table');

  return (
    <div className='h-full w-full'>
        <div className='z-10 flex flex-row gap-1'>
            <button className={`${toggle === 'Table' ? 'z-10' : ''} border-4 border-b-white bg-white border-b-0 border-figma-purple rounded-t-lg px-6 py-2 translate-y-[-4px] absolute`} onClick={() => setToggle('Table')}>Table</button>
            <button className={`${toggle === 'Console' ? 'z-10' : ''} border-4 border-b-white bg-white border-b-0 border-figma-purple rounded-t-lg px-6 py-2 translate-y-[-4px] translate-x-24 absolute`} onClick={() => setToggle('Console')}>Console</button>
        </div>
        <div className='w-full h-full border-4 mt-9 border-figma-purple relative'>
            {toggle === 'Table' && <Table />}
            {toggle === 'Console' && <Console />}
        </div>
    </div>
  )
}

export default DisplayToggleSwitch