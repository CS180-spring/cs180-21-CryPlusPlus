import Table from '@components/Table'
import SortBy from '@components/SortBy';
import Menu from '@components/Menu';
import DropdownMenu from '@components/DropdownMenu';
import TextInput from '@components/TextInput';

const students = [
  {
    firstName: "Daniel",
    lastName: "Castaneda",
    age: 20,
    year: 3,
    major: "Computer Science",
  },
  {
    firstName: "Daniel",
    lastName: "Castaneda",
    age: 20,
    year: 3,
    major: "Computer Science",
  },
  {
    firstName: "Daniel",
    lastName: "Castaneda",
    age: 20,
    year: 3,
    major: "Computer Science",
  },
  {
    firstName: "Daniel",
    lastName: "Castaneda",
    age: 20,
    year: 3,
    major: "Computer Science",
  },
  {
    firstName: "Daniel",
    lastName: "Castaneda",
    age: 20,
    year: 3,
    major: "Computer Science",
  },
  {
    firstName: "Daniel",
    lastName: "Castaneda",
    age: 20,
    year: 3,
    major: "Computer Science",
  },
];

const studentCols = [
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
]


const Main = () => {
  return (
    <div>
      <div className='bg-figma-purple w-full h-40' />
      <div className='flex flex-row'>
        <div className='flex flex-col p-8 gap-4 w-64'>
          <Menu />
          <SortBy fields={studentCols.map(obj => obj.Header)} />
          <hr className='border-b border-black' />
          <div className='font-bold text-xl'>
            Queries
          </div>
          <div className="flex flex-col gap-2 text-sm font-inter">
            <strong>Field</strong>
            <DropdownMenu options={studentCols.map(obj => obj.Header)} />
            <strong>Condition</strong>
            <DropdownMenu options={['Greater Than', `Less Than`, `Equal To`]} />
            <strong>Value</strong>
            <TextInput placeholder="Enter value"/>
          </div>
        </div>
        <div className='flex flex-col p-8'>
          <Table columns={studentCols} data={students} />
        </div>
      </div>
    </div>
  )
}

export default Main