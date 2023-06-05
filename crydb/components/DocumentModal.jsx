import React from "react";
import JSONView from "react-json-view";
import { useState } from "react";
import { useUserContext } from "@app/context/UserContext";
import { addToLog, updateTable } from "@utils/helpers";

const DocumentModal = ({ visible, setVisible, jsonString }) => {
  if (!visible) return null;
  const { userCollections, setConsoleLogs, setDataColumns, setTableData } =
    useUserContext();

  const [displayObjectSize, setDisplayObjectSize] = useState(false);
  const [displayDataTypes, setDisplayDataTypes] = useState(false);
  const [sortKeys, setSortKeys] = useState(false);

  let data = JSON.parse(jsonString);
  const UUID = data.__UUID__;
  console.log(UUID);
  delete data["__UUID__"];

  const handleUpload = async (e) => {
    try {
      // Send POST request to create the collection
      const response = await fetch("http://localhost/createCollection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(e),
      });

      const data = JSON.parse(await response.text());
      const table = data.data;
      console.log("Response from localhost:", data);
      updateTable(table.data, setTableData);
      addToLog(data, setConsoleLogs);
    } catch (error) {
      console.error("Error fetching from localhost:", error);
    }
  };

  const onDelete = (e) => {
    let fieldPath = null;
    e.namespace.forEach((field) => (fieldPath += field + "/"));
    const requestData = {
      uuid: UUID,
      action: "remove",
      field: fieldPath + e.name,
      newValue: null,
    };
    console.log("deleting", requestData);
    handleUpload(requestData);
  };
  const onEdit = (e) => {
    let fieldPath = "";
    e.namespace.forEach((field) => (fieldPath += field + "/"));
    console.log(e);
    const requestData = {
      uuid: UUID,
      action: "edit",
      field: fieldPath + e.name,
      newValue: e.new_value,
    };
    console.log("editted", requestData);
    handleUpload(requestData);
  };
  const onAdd = (e) => {
    let fieldPath = "";
    e.namespace.forEach((field) => (fieldPath += field + "/"));
    console.log(e);
    const requestData = {
      uuid: UUID,
      action: "add",
      field: fieldPath + e.name,
      newValue: e.new_value,
    };
    console.log("adding", requestData);
    handleUpload(requestData);
  };

  return (
    <div
      id="container"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm"
      onClick={(e) => (e.target.id === "container" ? setVisible(false) : null)}
    >
      <div className="flex h-4/5 w-1/2 flex-col items-center gap-4 border-4 border-figma-purple bg-white px-8 py-16 text-2xl">
        <div className="flex flex-row gap-16 pb-8">
          <div>
            <input
              type="checkbox"
              onChange={() => setDisplayObjectSize(!displayObjectSize)}
            />{" "}
            Show Size
          </div>
          <div>
            <input
              type="checkbox"
              onChange={() => setDisplayDataTypes(!displayDataTypes)}
            />{" "}
            Show Type
          </div>
          <div>
            <input type="checkbox" onChange={() => setSortKeys(!sortKeys)} />{" "}
            Sort Keys
          </div>
        </div>
        <JSONView
          src={data}
          name={UUID}
          displayDataTypes={displayDataTypes}
          displayObjectSize={displayObjectSize}
          onDelete={onDelete}
          onEdit={onEdit}
          onAdd={onAdd}
          sortKeys={sortKeys}
          displayArrayKey={false}
          indentWidth={12}
        />
      </div>
    </div>
  );
};

export default DocumentModal;
