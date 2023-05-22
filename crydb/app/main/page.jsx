"use client";

import Table from '@components/Table'
import SortBy from '@components/SortBy';
import Menu from '@components/Menu';
import { useState } from 'react';
import AddDocuments from '@components/AddDocuments';
import Queries from '@components/Queries';
import DisplayCollection from '@components/DisplayCollection';
import CreateCollection from '@components/CreateCollection';
import DeleteCollection from '@components/DeleteCollection';
import DeleteDocument from '@components/DeleteDocument';

const data = [
  {
    "Name": "Nevaeh Sanchez",
    "Address": {
      "StreetNumber": 277,
      "StreetName": "Third Street",
      "City": "Memphis",
      "State": "TN",
      "ZIPCode": "38101"
    },
    "Friends": [
      "Santiago Barrett",
      "Ellie Stone",
      "Victoria Turner",
      "Ella Gonzalez"
    ],
    "Active": false,
    "DOB": "Mon Feb 17 1992 19:59:11 GMT+0000 (UTC)",
    "Age": 31
  },
  {
    "Name": "Mariana Meyer",
    "Address": {
      "StreetNumber": 283,
      "StreetName": "Second Street",
      "City": "Jacksonville",
      "State": "FL",
      "ZIPCode": "32201"
    },
    "Friends": [
      "Isabella Phillips",
      "Annabelle Wilson"
    ],
    "Active": true,
    "DOB": "Thu Feb 17 1983 13:59:11 GMT+0000 (UTC)",
    "Age": 40
  },
  {
    "Name": "Hikari Chopra",
    "Address": {
      "StreetNumber": 208,
      "StreetName": "Third Street",
      "City": "Baltimore",
      "State": "MD",
      "ZIPCode": "21201"
    },
    "Friends": [
      "Sakura Alvarez"
    ],
    "Active": true,
    "DOB": "Mon Feb 17 1975 13:59:11 GMT+0000 (UTC)",
    "Age": 48
  },
  {
    "Name": "Aubrey Martin",
    "Address": {
      "StreetNumber": 409,
      "StreetName": "Madison Avenue",
      "City": "Boston",
      "State": "MA",
      "ZIPCode": "02101"
    },
    "Friends": [
      "Emma Peterson",
      "Emi Roberts",
      "Sophia Patel"
    ],
    "Active": true,
    "DOB": "Sun Feb 17 1991 13:59:11 GMT+0000 (UTC)",
    "Age": 32
  },
  {
    "Name": "Lillian Almasi",
    "Address": {
      "StreetNumber": 494,
      "StreetName": "Oak Street",
      "City": "Dallas",
      "State": "TX",
      "ZIPCode": "75201"
    },
    "Friends": [
      "Melanie Nair",
      "Sakura Hakim",
      "Lily Fuentes",
      "Koharu Flores"
    ],
    "Active": true,
    "DOB": "Thu Feb 17 1966 07:59:11 GMT+0000 (UTC)",
    "Age": 57
  },
]
const cols = [
  {
    Header: "firstName",
    accessor: "firstName",
  },
  {
    Header: "lastName",
    accessor: "lastName",
  },
  {
    Header: "age",
    accessor: "age",
  },
  {
    Header: "year",
    accessor: "year",
  },
  {
    Header: "major",
    accessor: "major",
  },
];

const Main = () => {
  const [addDocument, setAddDocument] = useState(false);
  const [createCollection, setCreateCollection] = useState(false);
  const [deleteCollection, setDeleteCollection] = useState(false);
  const [deleteDocument, setDeleteDocument] = useState(false);
  const [selectedCollection, setCollection] = useState('');
  const [userCollections, setUserCollections] = useState([]);
  const [userDocuments, setUserDocuments] = useState([]);

  return (
    <div>
      <div className='bg-figma-purple w-full h-40' />
      <div className='flex flex-row h-screen'>
        <div className='flex flex-col p-8 gap-4 w-96 h-full'>
          <Menu setAddDocument={setAddDocument} setCreateCollection={setCreateCollection} setDeleteCollection={setDeleteCollection} setDeleteDocument={setDeleteDocument} />
          <hr className='border-b border-black' />
          <SortBy fields={cols.map(obj => obj.Header)} />
          <hr className='border-b border-black' />
          <Queries columns={cols} />
        </div>
        <div className='flex-1 w-full justify-center p-8 mb-8'>
          <DisplayCollection collections={userCollections} setCollection={setCollection} />
          <Table data={data} collection={selectedCollection} />
        </div>
      </div>
      <AddDocuments visible={addDocument} setAddDocument={setAddDocument} name={selectedCollection} userDocuments={userDocuments} setUserDocuments={setUserDocuments} />
      <CreateCollection visible={createCollection} setCreateCollection={setCreateCollection} userCollections={userCollections} setUserCollections={setUserCollections} />
      <DeleteCollection visible={deleteCollection} setDeleteCollection={setDeleteCollection} userCollections={userCollections} setUserCollections={setUserCollections} />
      <DeleteDocument visible={deleteDocument} setDeleteDocument={setDeleteDocument} userDocuments={userDocuments} setUserDocuments={setUserDocuments} />
    </div>
  )
}

export default Main