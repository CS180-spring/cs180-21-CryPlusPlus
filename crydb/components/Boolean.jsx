import DropdownMenu from "./DropdownMenu";
import TextInput from "./TextInput";

const Boolean = () => {
  const options = ['Greater Than', `Less Than`, `Equal To`];
  return (
    <div className="flex flex-col gap-2 m-8 text-sm">
      <div className="text-black font-bold font-inter">
        Boolean
      </div>
      <DropdownMenu options={options} />
      <form>
        <TextInput placeholder="Enter value"/>
      </form>
    </div>
  )
}

export default Boolean