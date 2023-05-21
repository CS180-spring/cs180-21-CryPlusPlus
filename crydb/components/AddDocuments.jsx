import { useState } from 'react';
import { useEffect } from 'react';

const AddDocuments = ({ name, visible, setAddDocument, userDocuments, setUserDocuments }) => {
    const [files, setFile] = useState();

    const handleChange = (event) => {
        console.log(files);
        setFile(event.target.files);
    }

    const handleUpload = async() => {
        if (!files || files.length === 0) return;
        
        // Convert the first file to a base64 string
        const file = files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
            const base64 = reader.result;
            
            // Create a JSON object
            const json = {
                filename: file.name,
                data: base64
            };
            
            // Convert the JSON object to a string
            const jsonString = JSON.stringify(json);
            console.log(jsonString);
            
            // Send the JSON string to the backend
            try {
                const response = await fetch('/uploadFile', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: jsonString
                });
                
                // Log the response from the server
                const data = await response.text();
                console.log('Response from localhost:', data);
            } catch (error) {
                console.error('Error fetching from localhost:', error);
            }
        }
    }
    
      
    
    if (!visible) return null;

    return (
        <div id='container' className='flex justify-center items-center fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm' onClick={(e) => e.target.id === 'container' ? setAddDocument(false) : null}>
            <div className='border-dashed border-4 border-figma-purple flex flex-col gap-4 w-1/2 items-center px-4 bg-white py-16'>
                <div className=''>
                    Add Documents to <strong className='text-xl'>{name}</strong>
                </div>
                <input className='border-2 w-3/4' type="file" multiple onChange={handleChange}/>
                <button className='p-2 border-2 border-figma-purple hover:bg-figma-black-grey300' onClick={handleUpload}>Upload</button>
            </div>
        </div>
    )
}

export default AddDocuments
