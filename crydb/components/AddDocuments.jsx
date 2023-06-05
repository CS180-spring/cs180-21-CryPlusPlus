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
    return;
  }

  let isInvalidFile = false; // Flag to indicate if the file is not valid

  // Convert the files to base64 strings and send them to the backend
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    const base64 = await new Promise((resolve) => {
      reader.onloadend = () => resolve(reader.result);
    });

    // Create a JSON object
    const json = {
      filename: file.name,
      data: base64,
    };

    // Check the file type
    if (file.type !== "application/json") {
      console.error("Invalid file type");
      isInvalidFile = true; // Set the flag if the file type is invalid
      break;
    }

    // Convert the JSON object to a string
    const jsonString = JSON.stringify(json);
    console.log(jsonString);

    // Attempt to parse the JSON string
    let parsedJson;

    try {
      parsedJson = JSON.parse(jsonString);
      if (!parsedJson || typeof parsedJson !== "object") {
        throw new Error("Invalid JSON file");
        return;
	}
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
        isInvalidFile = true; // Set the flag if there is an error
        break;
      }
    } catch (error) {
      console.error("Invalid JSON file:", error);
      isInvalidFile = true; // Set the flag if the JSON is invalid
      break;
    }
  }

  if (isInvalidFile) {
    // Handle the case when the file is not a valid JSON or has an invalid type
    // For example, show an error message to the user
    console.log("Invalid JSON file");
    return;
  }

  if (!isInvalidFile) {
    setAddDocument(false);
  }
};


  return (
    addDocument && (
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
    )
  );
};

export default AddDocuments;
