import { useState } from "react";
import { useUserContext } from "@app/context/UserContext";
import { addToLog, updateTable } from "@utils/helpers";


const AddDocuments = () => {
  const { addDocument, setAddDocument, selectedCollection, setConsoleLogs, setTableData, setDataColumns} =
    useUserContext();

  const [files, setFile] = useState();

  const handleChange = (event) => {
    console.log(files);
    setFile(event.target.files);
  };
    
const handleUpload = async () => {
  if (!files || files.length === 0) {
    setAddDocument(false);
  }

  // Convert the files to base64 strings and send them to the backend
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64 = reader.result;

      // Create a JSON object
      const json = {
        filename: file.name,
        data: base64,
      };

      // Convert the JSON object to a string
      const jsonString = JSON.stringify(json);
      console.log(jsonString);

      // Send the JSON string to the backend
      try {
        const response = await fetch("http://localhost/uploadFile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: jsonString,
        });

        // Log the response from the server
        const data = JSON.parse(await response.text());
        const table = data.data;
        console.log("Response from localhost:", data);
        updateTable(table.data, setTableData);
        setDataColumns(table.columns);
        addToLog(data, setConsoleLogs);
      } catch (error) {
        console.error("Error fetching from localhost:", error);
      }
    };
  }

  setAddDocument(false);
  

  const file = files[0];
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onloadend = async () => {
    const fileContent = reader.result;

    if (file.type === "application/json") {
      let jsonData;
      try {
        jsonData = JSON.parse(fileContent);
      } catch (error) {
        console.error("Invalid JSON file");
        return;
      }

      const jsonString = JSON.stringify(jsonData);
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
    } else if (file.type === "text/csv") {
      

      const lines = fileContent.split("\n");

      if (lines.length === 0) {
        throw new Error("Empty CSV file");
      }
    
      const headers = lines[0].split(",");

      if (headers.length === 0) {
        throw new Error("CSV file must have at least one column");
      }
    
      for (let i = 1; i < lines.length; i++) {
        const rowData = lines[i].split(",");
    
        if (rowData.length !== headers.length) {
          throw new Error(`Row ${i + 1} has incorrect number of columns`);
        }
      }
    
      
      try {
        const response = await fetch("http://localhost/uploadFile", {
          method: "POST",
          headers: {
            "Content-Type": "text/csv",
          },
          body: fileContent,
        });

        const data = JSON.parse(await response.text());
        console.log("Response from localhost:", data);
        addToLog(data, setConsoleLogs);
      } catch (error) {
        console.error("Error fetching from localhost:", error);
      }



    } else {
      console.error("Invalid file type");
      return;
    }
  };

  setAddDocument(false);
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