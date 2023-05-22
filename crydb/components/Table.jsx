import React from "react";
import { useState } from "react";
import DocumentModal from "./DocumentModal";

const Table = ({ data, collection }) => {
  const [showDocument, setShowDocument] = useState(false);
  const [documentData, setDocumentData] = useState("");
  console.log("test");
  const handleClick = (e) => {
    setShowDocument(true);
    setDocumentData(e);
  }
  return (
    <div className="flex flex-col h-full border-2 border-figma-purple p-8 gap-5">
      <div className="flex justify-center font-bold text-3xl">
        {collection}
      </div>
      <div className="flex flex-col gap-2">
        {data.map((element, i) => {
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