import React from 'react'
import TextInput from './TextInput'
import { useState } from 'react';

const CreateCollection = ({ visible, setCreateCollection }) => {
  if (!visible) return null;

  const [value, setValue] = useState('');

  const handleUpload = () => {
    console.log(`creating collection: ${value}`);
    setCreateCollection(false);
  }

  return (
    <div id='container' className='flex justify-center items-center fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm' onClick={(e) => e.target.id === 'container' ? setCreateCollection(false) : null}>
        <div className='border-4 border-figma-purple flex flex-col gap-4 w-1/2 items-center px-4 bg-white py-16'>
            <div className=''>
                Create Collection
            </div>
            <TextInput value={value} setValue={setValue}/>
            <button className='p-2 border-2 border-figma-purple hover:bg-figma-black-grey300' onClick={handleUpload}>Create</button>
        </div>
    </div>
  )
}

export default CreateCollection