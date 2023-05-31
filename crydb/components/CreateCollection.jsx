import React from "react";
import TextInput from "./TextInput";
import { useUserContext } from "@app/context/UserContext";
import { useState } from "react";
import { addToLog } from "@utils/helpers";

const CreateCollection = () => {
  const {
    createCollection,
    setCreateCollection,
    userCollections,
    setUserCollections,
    setConsoleLogs,
  } = useUserContext();

  const [value, setValue] = useState("");

  const handleUpload = async () => {
    setUserCollections([...userCollections, value]);
    console.log(`creating collection: ${value}`);
    setCreateCollection(false);

    try {
      // Send POST request to create the collection
      const response = await fetch("http://localhost/createCollection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: value }),
      });

      // Log the response from the server
      const data = JSON.parse(await response.text());
      console.log("Response from localhost:", data);
      addToLog(data, setConsoleLogs);
    } catch (error) {
      console.error("Error fetching from localhost:", error);
    }
  };

  if (!createCollection) return null;

  return (
    <div
      id="container"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm"
      onClick={(e) =>
        e.target.id === "container" ? setCreateCollection(false) : null
      }
    >
      <div className="flex w-1/2 flex-col items-center gap-4 border-4 border-figma-purple bg-white px-4 py-16">
        <div className="">Create Collection</div>
        <TextInput value={value} setValue={setValue} />
        <button
          className="border-2 border-figma-purple p-2 hover:bg-figma-black-grey300"
          onClick={handleUpload}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateCollection;
