import React from 'react'
import TextInput from './TextInput'
import { useUserContext } from '@app/context/UserContext';
import { useState } from 'react';

const CreateCollection = () => {
  const { createCollection, setCreateCollection, userCollections, setUserCollections } = useUserContext();
  
  const [value, setValue] = useState('');

  const handleUpload = async() => {
    setUserCollections([...userCollections, value]);    
    console.log(`creating collection: ${value}`);
    setCreateCollection(false);
  
    try {
      // Send POST request to create the collection
      const response = await fetch('/createCollection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: value}),
      });
  
      // Log the response from the server
      const data = await response.text();
      console.log('Response from localhost:', data);
  
    } catch (error) {
      console.error('Error fetching from localhost:', error);
    }
  }
  
  if (!createCollection) return null;

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
