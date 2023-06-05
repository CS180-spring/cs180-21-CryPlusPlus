import React from "react";
import DropdownMenu from "./DropdownMenu";
import { useState } from "react";
import { useUserContext } from "@app/context/UserContext";
import { addToLog } from "@utils/helpers";

const DeleteCollection = () => {
  const {
    deleteCollection,
    setDeleteCollection,
    userCollections,
    setUserCollections,
    setConsoleLogs,
  } = useUserContext();

  const [selectedOption, setSelectedOption] = useState("");

  const handleUpload = async () => {
    console.log(`deleting collection: ${selectedOption}`);
    const updatedCollections = userCollections.filter(
      (collection) => collection !== selectedOption
    );
    setUserCollections(updatedCollections);
    setDeleteCollection(false);

    try {
      // Send DELETE request to delete the collection
      const response = await fetch("http://localhost/deleteCollection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: selectedOption }),
      });

      // Log the response from the server
      const data = JSON.parse(await response.text());
      console.log("Response from localhost:", data);
      addToLog(data, setConsoleLogs);
    } catch (error) {
      console.error("Error fetching from localhost:", error);
    }
  };

  return (
    deleteCollection && (
      <div
        id="container"
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm"
        onClick={(e) =>
          e.target.id === "container" ? setDeleteCollection(false) : null
        }
      >
        <div className="flex w-1/2 flex-col items-center gap-4 border-4 border-figma-purple bg-white px-4 py-16">
          <div className="">Delete Collection</div>
          <DropdownMenu
            options={userCollections}
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

export default DeleteCollection;
