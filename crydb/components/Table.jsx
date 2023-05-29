import React from "react";
import { useState } from "react";
import DocumentModal from "./DocumentModal";
import { useUserContext } from "@app/context/UserContext";

const Table = () => {
  const { selectedCollection, tableData } = useUserContext();
  
  const [showDocument, setShowDocument] = useState(false);
  const [documentData, setDocumentData] = useState("");
  const handleClick = (e) => {
    setShowDocument(true);
    setDocumentData(e);
  }
  return (
    <div className="flex flex-col h-full border-2 border-figma-purple p-8 gap-5">
      <div className="flex justify-center font-bold text-3xl">
        {selectedCollection}
      </div>
      <div className="flex flex-col gap-2">
        {tableData.map((element, i) => {
          let document = JSON.stringify(element);
          return (
            <div className="hover:bg-figma-lightpink cursor-pointer" key={i} onClick={() => {
              handleClick(document)
            }}>
                Entry: {document} 
            </div>
          )
        })}
      </div>
      <DocumentModal visible={showDocument} setVisible={setShowDocument} jsonString={documentData} />
    </div>
  )
};

export default Table