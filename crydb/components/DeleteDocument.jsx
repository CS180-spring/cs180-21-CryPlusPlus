import { useState, useEffect } from "react";
import DropdownMenu from "./DropdownMenu";
import { useUserContext } from "@app/context/UserContext";

const DeleteDocument = () => {
  const { deleteDocument, setDeleteDocument, userDocuments, setUserDocuments } =
    useUserContext();

  const [selectedOption, setSelectedOption] = useState("");

  const handleUpload = () => {
    console.log(`deleting document: ${selectedOption}`);
    const updatedDocuments = userDocuments.filter(
      (document) => document !== selectedOption
    );
    setUserDocuments(updatedDocuments);
    setDeleteDocument(false);
  };

  return (
    deleteDocument && (
      <div
        id="container"
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm"
        onClick={(e) =>
          e.target.id === "container" ? setDeleteDocument(false) : null
        }
      >
        <div className="flex w-1/2 flex-col items-center gap-4 border-4 border-figma-purple bg-white px-4 py-16">
          <div className="">Delete Document</div>
          <DropdownMenu
            options={userDocuments}
            onOptionSelect={(option) => setSelectedOption(option)}
          />
          <button
            className="border-2 border-figma-purple p-2 hover:bg-figma-black-grey300"
            onClick={handleUpload}
          >
            Delete
          </button>
        </div>
      </div>
    )
  );
};

export default DeleteDocument;
