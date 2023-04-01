import { Dropdown, Input } from "react-daisyui";

export default function FilterLocation() {
  return (
    <Dropdown className="px-3">
      <Dropdown.Toggle>Location</Dropdown.Toggle>
      <Dropdown.Menu className="w-52">
        <Input className="w-full" />
      </Dropdown.Menu>
    </Dropdown>
  );
}
