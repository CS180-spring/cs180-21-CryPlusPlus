import { useState } from "react";
import DropdownMenu from "./DropdownMenu";

const DeleteCollection = ({ visible, setDeleteCollection, userCollections, setUserCollections }) => {
  if (!visible) return null;
  if (!userCollections.length) {
    setDeleteCollection(false);
    return null;
}
  const [selectedOption, setSelectedOption] = useState('');
  
  const handleUpload = () => {
    console.log(`deleting collection: ${selectedOption}`);
    const updatedCollections = userCollections.filter((collection) => collection !== selectedOption);
    setUserCollections(updatedCollections);
    setDeleteCollection(false);
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