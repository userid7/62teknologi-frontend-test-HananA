import { Input } from "react-daisyui";

export default function HeaderWithSearch({ name, handleSearchStringChange }) {
  return (
    <div className="group flex">
      <div className="my-auto">{name}</div>
      <div className="pl-4">
        <Input
          borderOffset={false}
          size="xs"
          className="hidden focus:block group-hover:block"
          onChange={handleSearchStringChange}
        />
      </div>
    </div>
  );
}
