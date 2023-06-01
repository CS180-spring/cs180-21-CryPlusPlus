import { useState } from "react";
import { useUserContext } from "@app/context/UserContext";
import { addToLog } from "@utils/helpers";

const AddDocuments = () => {
  const {
    addDocument,
    setAddDocument,
    selectedCollection,
    userDocuments,
    setUserDocuments,
    setConsoleLogs,
  } = useUserContext();

  const [files, setFile] = useState();

  const handleChange = (event) => {
    const uploadedFiles = event.target.files;
    const allowedExtensions = ["csv", "json"];
  
    const filteredFiles = Array.from(uploadedFiles).filter((file) => {
    const fileExtension = file.name.split(".").pop().toLowerCase();
    return allowedExtensions.includes(fileExtension);
    });
    
    console.log(files);
    setFile(filteredFiles);
    //setFile(event.target.files);
  };

  const handleUpload = async () => {
    if (!files || files.length === 0) {
      setAddDocument(false);
    }

    // Convert the first file to a base64 string
    const file = files[0];
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
        console.log("Response from localhost:", data);
        addToLog(data, setConsoleLogs);
      } catch (error) {
        console.error("Error fetching from localhost:", error);
      }
    };
    setUserDocuments([...userDocuments, file.name]);
    setAddDocument(false);
  };

  if (!addDocument) return null;

  return (
    <div
      id="container"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm"
      onClick={(e) =>
        e.target.id === "container" ? setAddDocument(false) : null
      }
    >
      <div className="flex w-1/2 flex-col items-center gap-4 border-4 border-dashed border-figma-purple bg-white px-4 py-16">
        <div className="">
          Add Documents to{" "}
          <strong className="text-xl">{selectedCollection}</strong>
        </div>
        <input
          className="w-3/4 border-2"
          type="file"
          multiple
          onChange={handleChange}
        />
        <button
          className="border-2 border-figma-purple p-2 hover:bg-figma-black-grey300"
          onClick={handleUpload}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default AddDocuments;
