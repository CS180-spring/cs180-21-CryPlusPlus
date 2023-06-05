"use client";

import { createContext, useContext, useState } from "react";

const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [addDocument, setAddDocument] = useState(false);
  const [createCollection, setCreateCollection] = useState(false);
  const [deleteCollection, setDeleteCollection] = useState(false);
  const [selectedCollection, setCollection] = useState("");
  const [userCollections, setUserCollections] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [dataColumns, setDataColumns] = useState([]);
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [queries, setQueries] = useState([]);

  return (
    <UserContext.Provider
      value={{
        addDocument,
        setAddDocument,
        createCollection,
        setCreateCollection,
        deleteCollection,
        setDeleteCollection,
        selectedCollection,
        setCollection,
        userCollections,
        setUserCollections,
        tableData,
        setTableData,
        dataColumns,
        setDataColumns,
        consoleLogs,
        setConsoleLogs,
        queries,
        setQueries,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
