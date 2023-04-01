import { Input } from "react-daisyui";

export default function HeaderWithSearch({name}){
    return (
        <div className="flex group">
            <div className="my-auto">{name}</div>
            <div className="pl-4"><Input borderOffset={false} size="xs" className="hidden group-hover:block focus:block"/></div>
        </div>
    )
}