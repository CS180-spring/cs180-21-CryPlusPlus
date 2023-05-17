import { useState } from 'react';
import { useEffect } from 'react';

const AddDocuments = ({ name, visible, setAddDocument, userDocuments, setUserDocuments }) => {
    const [files, setFile] = useState();

    const handleChange = (event) => {
        console.log(files);
        setFile(event.target.files);
    }

    const handleUpload = (event) => {
        const formData = new FormData();
        //const files = event.target.files
	console.log(files)
	let newDocuments = [];
        for (let i = 0; i < files.length; i++) {
            formData.append(`files`, files[i]);
            newDocuments = [...newDocuments, files[i].name];
        }
        console.log(formData);
        fetch('http://localhost:80/connect', {
            method: 'POST',
            body: formData
        })
	.then(response => {
        if (response.ok) {
            return response.text(); // Read the response as text
        } else {
            throw new Error('Error uploading documents');
            }
        })
        .then(text => {
        console.log(text); // Display the response text in the console
        })
        //.then(response => console.log(response))
        .catch(err => console.log(err));
        setUserDocuments([...userDocuments, ...newDocuments]); 
        setAddDocument(false)
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
