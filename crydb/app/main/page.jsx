"use client";

import SortBy from '@components/SortBy';
import Menu from '@components/Menu';
import AddDocuments from '@components/AddDocuments';
import Queries from '@components/Queries';
import DisplayCollection from '@components/DisplayCollection';
import CreateCollection from '@components/CreateCollection';
import DeleteCollection from '@components/DeleteCollection';
import DeleteDocument from '@components/DeleteDocument';
import DisplayToggleSwitch from '@components/DisplayToggleSwitch';

const Main = () => {
  return (
    <div>
      <div className='bg-figma-purple w-full h-40' />
      <div className='flex flex-row h-screen'>
        <div className='flex flex-col p-8 gap-4 w-96 h-full'>
          <Menu />
          <hr className='border-b border-black' />
          <SortBy />
          <hr className='border-b border-black' />
          <Queries />
        </div>
        <div className='flex-1 w-full h-full justify-center p-8 mb-8'>
          <DisplayCollection />
          <DisplayToggleSwitch />
        </div>
      </div>
      <div className='z-50 absolute'>
        <CreateCollection />
        <AddDocuments />
        <DeleteCollection />
        <DeleteDocument />
      </div>
    </div>
  )
}

export default Main