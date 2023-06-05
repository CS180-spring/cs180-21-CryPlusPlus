import React from "react";
import { useState } from "react";
import DocumentModal from "./DocumentModal";
import { useUserContext } from "@app/context/UserContext";
import { ImCross } from "react-icons/Im";

const Table = () => {
  const { selectedCollection, tableData } = useUserContext();

  const [showDocument, setShowDocument] = useState(false);
  const [documentData, setDocumentData] = useState("");
  const handleClick = (e) => {
    setShowDocument(true);
    setDocumentData(e);
  };
  return (
    <div className="flex h-full flex-col gap-5 p-8 overflow-y-auto">
      <div className="flex justify-center text-3xl font-bold">
        {selectedCollection}
      </div>
      <div className="flex flex-col gap-2">
        {tableData.map((element, i) => {
          let document = JSON.stringify(element);
          return (
            <div className="flex w-full flex-row items-center gap-5 " key={i}>
              <button className="rounded-full bg-red-500 p-2">
                <ImCross className="text-xs" />
              </button>
              <div
                className="cursor-pointer text-2xl hover:bg-figma-lightpink"
                onClick={() => {
                  handleClick(document);
                }}
              >
                {document}
              </div>
            </div>
          );
        })}
      </div>
      <div className="absolute z-10">
        <DocumentModal
          visible={showDocument}
          setVisible={setShowDocument}
          jsonString={documentData}
        />
      </div>
    </div>
  );
};

export default Table;
