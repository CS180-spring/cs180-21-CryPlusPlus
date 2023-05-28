import { useState } from "react";
import DropdownMenu from "./DropdownMenu";
import { useUserContext } from "@app/context/UserContext";

const DeleteDocument = () => {
    const { deleteDocument, setDeleteDocument, userDocuments, setUserDocuments } = useUserContext();
    
    const [selectedOption, setSelectedOption] = useState('');

    const handleUpload = () => {
        console.log(`deleting document: ${selectedOption}`);
        const updatedDocuments = userDocuments.filter((document) => document !== selectedOption);
        setUserDocuments(updatedDocuments);
        setDeleteDocument(false);
    }

    if (!deleteDocument) return null;
    
    if (!userDocuments.length) {
        setDeleteDocument(false);
        return null;
    }
    
    console.log(userDocuments);

  return (
    <div id='container' className='flex justify-center items-center fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm' onClick={(e) => e.target.id === 'container' ? setDeleteDocument(false) : null}>
        <div className='border-4 border-figma-purple flex flex-col gap-4 w-1/2 items-center px-4 bg-white py-16'>
            <div className=''>
                Delete Document
            </div>
            <DropdownMenu options={userDocuments} onOptionSelect={(option) => setSelectedOption(option)}/>
            <button className='p-2 border-2 border-figma-purple hover:bg-figma-black-grey300' onClick={handleUpload}>Delete</button>
        </div>
    </div>
  )
}

export default DeleteDocument