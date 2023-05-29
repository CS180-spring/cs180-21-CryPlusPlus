"use client";

import { createContext, useContext, useState } from "react";

const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
    const [addDocument, setAddDocument] = useState(false);
    const [createCollection, setCreateCollection] = useState(false);
    const [deleteCollection, setDeleteCollection] = useState(false);
    const [deleteDocument, setDeleteDocument] = useState(false);
    const [selectedCollection, setCollection] = useState('');
    const [userCollections, setUserCollections] = useState([]);
    const [userDocuments, setUserDocuments] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [dataColumns, setDataColumns] = useState([]);

    return (
        <UserContext.Provider value={{ 
            addDocument, setAddDocument, 
            createCollection, setCreateCollection, 
            deleteCollection, setDeleteCollection,
            deleteDocument, setDeleteDocument,
            selectedCollection, setCollection,
            userCollections, setUserCollections,
            userDocuments, setUserDocuments,
            tableData, setTableData,
            dataColumns, setDataColumns,
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);