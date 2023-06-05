import React from "react";
import { useState } from "react";
import DocumentModal from "./DocumentModal";
import { useUserContext } from "@app/context/UserContext";
import { ImCross } from "react-icons/Im";
import { addToLog, updateTable } from "@utils/helpers";

const Table = () => {
  const {
    selectedCollection,
    tableData,
    setConsoleLogs,
    setDataColumns,
    setTableData,
  } = useUserContext();

  const [showDocument, setShowDocument] = useState(false);
  const [documentData, setDocumentData] = useState("");
  const handleClick = (e) => {
    setShowDocument(true);
    setDocumentData(e);
  };

  const handleDelete = async (uuid) => {
    console.log(`deleting document ${uuid}`);

    try {
      // Send POST request to create the collection
      const response = await fetch("http://localhost/deleteDocument", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uuid: uuid }),
      });

      const data = JSON.parse(await response.text());
      const table = data.data;
      console.log("Response from localhost:", data);
      updateTable(table.data, setTableData);
      setDataColumns(table.columns);
      addToLog(data, setConsoleLogs);
    } catch (error) {
      console.error("Error fetching from localhost:", error);
    }
  };

  return (
    <div className="flex h-full flex-col gap-5 overflow-y-auto p-8">
      <div className="flex justify-center text-3xl font-bold">
        {selectedCollection}
      </div>
      <div className="flex flex-col gap-2">
        {tableData.map((element, i) => {
          let document = JSON.stringify(element);
          return (
            <div className="flex w-full flex-row items-center gap-5 " key={i}>
              <button
                className="rounded-full bg-red-500 p-2"
                onClick={() => handleDelete(element.__UUID__)}
              >
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
