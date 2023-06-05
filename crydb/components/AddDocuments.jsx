import { useState } from "react";
import { useUserContext } from "@app/context/UserContext";
import { addToLog, updateTable } from "@utils/helpers";

const AddDocuments = () => {
  const {
    addDocument,
    setAddDocument,
    selectedCollection,
    setConsoleLogs,
    setTableData,
    setDataColumns,
  } = useUserContext();

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

    let hasInvalidFile = false; // Flag to indicate if there is an invalid file

    // Convert the files to base64 strings and send them to the backend
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      const base64 = await new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
      });

      // Check the file type
      if (file.type === "application/json") {
        // Create a JSON object
        const json = {
          filename: file.name,
          data: base64,
        };

        // Convert the JSON object to a string
        const jsonString = JSON.stringify(json);
        console.log(jsonString);

        try {
          // Attempt to parse the JSON string
          JSON.parse(jsonString);

          // Send the JSON string to the backend
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
          console.error("Error uploading file:", error);
          hasInvalidFile = true; // Set the flag if there is an error
        }
	//convert csv to base64 before sending to backend
      } else if (file.type === "text/csv") {
        const fileContent = await file.text();

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
        hasInvalidFile = true; // Set the flag for invalid file type
      }
    }

    if (hasInvalidFile) {
      // Handle the case when there is an invalid file type
      // For example, show an error message to the user
      console.log("Invalid file type");
      setAddDocument(false); // Set addDocument to false
      return;
    }

    // If no invalid file type or error occurred, set addDocument to false
    setAddDocument(false);
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
