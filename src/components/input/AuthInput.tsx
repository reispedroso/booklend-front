import { forwardRef, InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = "", name = "", ...props }, ref) => {
    return (
      <input
        className="bg-booklend-gray text-black font-regular w-full h-16 rounded-2xl pl-4 pr-4 outline-none mb-4 placeholder:text-booklend-dgray font-poppins placeholder:font-regular text-sm"
        type={type}
        name={name}
        ref={ref}
        {...props}
      />
    );
  }
);
