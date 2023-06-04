import { useState } from 'react';
import { useUserContext } from '@app/context/UserContext';
import { addToLog } from '@utils/helpers';

const AddDocuments = () => {
    const { addDocument, setAddDocument, selectedCollection, userDocuments, setUserDocuments, setConsoleLogs } = useUserContext();
    
    const [files, setFile] = useState();

    const handleChange = (event) => {
        console.log(files);
        setFile(event.target.files);
    }

   const handleUpload = async () => {
  if (!files || files.length === 0) {
    setAddDocument(false);
    return;
  }

  const file = files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = async () => {
    const base64 = reader.result;

    if (file.type === "application/json") {
      try {
        const json = JSON.parse(base64);
        const jsonString = JSON.stringify(json);
        console.log(jsonString);

        try {
          const response = await fetch("http://localhost/uploadFile", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: jsonString,
          });

          const data = JSON.parse(await response.text());
          console.log("Response from localhost:", data);
          addToLog(data, setConsoleLogs);
        } catch (error) {
          console.error("Error fetching from localhost:", error);
        }
      } catch (error) {
        console.error("Invalid JSON 1");
        return;
      }
    } else if (file.type === "text/csv") {
      try {
        // Check if valid CSV
        // TODO: Implement CSV validation logic
      } catch (error) {
        console.error("Invalid CSV");
        return;
      }
    }
      else {
      try {
        const json = JSON.parse(base64);
        const jsonString = JSON.stringify(json);
        console.log(jsonString);

        try {
          const response = await fetch("http://localhost/uploadFile", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: jsonString,
          });
	  const data = JSON.parse(await response.text());
          console.log("Response from localhost:", data);
          addToLog(data, setConsoleLogs);
        } catch (error) {
          console.error("Error fetching from localhost:", error);
        }
      } catch (error) {
        console.error("Non json or csv error");
        return;
      }
    }

    setAddDocument(false); 
  };
}; 
    if (!addDocument) return null;

    return (
        <div id='container' className='flex justify-center items-center fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm' onClick={(e) => e.target.id === 'container' ? setAddDocument(false) : null}>
            <div className='border-dashed border-4 border-figma-purple flex flex-col gap-4 w-1/2 items-center px-4 bg-white py-16'>
                <div className=''>
                    Add Documents to <strong className='text-xl'>{selectedCollection}</strong>
                </div>
                <input className='border-2 w-3/4' type="file" multiple onChange={handleChange}/>
                <button className='p-2 border-2 border-figma-purple hover:bg-figma-black-grey300' onClick={handleUpload}>Upload</button>
            </div>
        </div>
    )
}

export default AddDocuments
