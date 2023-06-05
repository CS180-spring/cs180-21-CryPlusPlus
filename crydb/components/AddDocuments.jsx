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
