import DropdownMenu from '@components/DropdownMenu';
import TextInput from '@components/TextInput';
import { useUserContext } from "@app/context/UserContext";

const Query = ({ columns }) => {
  const { dataColumns } = useUserContext();

  return (
    <div className="flex flex-col gap-2 text-sm font-inter font-bold w-full">
        Field
        <DropdownMenu options={dataColumns} />
        Condition
        <DropdownMenu options={['Equal', 'Not Equal', 'Greater Than', 'Less Than', 'Greater than or Equal to', 'Less Than or Equal To']} />
        Value
        <TextInput />
        <hr className='border-b border-figma-black-grey500 my-2' />
    </div>
  )
}

export default Query