import { Input } from "antd";
import { twMerge } from "tailwind-merge";

export default function TextInput(props) {
  return (
    <Input
      {...props}
      className={twMerge("rounded-3xl px-4 py-2 text-base", props.className)}
    />
  );
}
