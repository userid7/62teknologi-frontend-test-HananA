import { Dropdown } from "react-daisyui";

export default function FilterLocation() {
  return (
    <Dropdown className="px-3">
      <Dropdown.Toggle>Price</Dropdown.Toggle>
      <Dropdown.Menu className="w-52">
        <Dropdown.Item>$</Dropdown.Item>
        <Dropdown.Item>$$</Dropdown.Item>
        <Dropdown.Item>$$$</Dropdown.Item>
        <Dropdown.Item>$$$$</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
