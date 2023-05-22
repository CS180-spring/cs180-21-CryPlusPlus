import React from 'react'
import DropdownMenu from './DropdownMenu'
import { useState } from 'react';

const DeleteCollection = ({ visible, setDeleteCollection, userCollections, setUserCollections }) => {
  if (!visible) return null;
  if (!userCollections.length) {
    setDeleteCollection(false);
    return null;
  }

  const [selectedOption, setSelectedOption] = useState('');

  const handleUpload = async() => {
    console.log(`deleting collection: ${selectedOption}`);
    const updatedCollections = userCollections.filter((collection) => collection !== selectedOption);
    setUserCollections(updatedCollections);
    setDeleteCollection(false);
  
    try {
      // Send DELETE request to delete the collection
      const response = await fetch('/deleteCollection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: selectedOption}),
      });
  
      // Log the response from the server
      const data = await response.text();
      console.log('Response from localhost:', data);
  
    } catch (error) {
      console.error('Error fetching from localhost:', error);
    }
  }

  return (
    <div id='container' className='flex justify-center items-center fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm' onClick={(e) => e.target.id === 'container' ? setDeleteCollection(false) : null}>
        <div className='border-4 border-figma-purple flex flex-col gap-4 w-1/2 items-center px-4 bg-white py-16'>
            <div className=''>
                Delete Collection
            </div>
            <DropdownMenu options={userCollections} onOptionSelect={(option) => setSelectedOption(option)}/>
            <button className='p-2 border-2 border-figma-purple hover:bg-figma-black-grey300' onClick={handleUpload}>Delete</button>
        </div>
    </div>
  )
}

export default DeleteCollection
