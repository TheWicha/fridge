import React, { useState } from "react";
import clsx from "clsx";

const Input = ({ value, onChange, label, placeholder, type, name }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="mb-2 md:ml-2 md:mb-0 relative">
      <input
        id={label}
        type={type}
        className={clsx("rounded-md p-2 w-full transition-all duration-200")}
        value={value}
        onChange={onChange}
        name={name}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required
      />
      <label
        htmlFor={label}
        className={clsx(
          "absolute left-3 transition-all duration-200 text-black bg-white p-1 rounded-md pointer-events-none",
          {
            "text-[10px] md:text-[10px] top-[-10px]": value || isFocused,
            "text-[12px] md:text-[15px] md:top-1 top-2": !value && !isFocused,
          }
        )}
      >
        {placeholder}
      </label>
    </div>
  );
};

export default Input;
