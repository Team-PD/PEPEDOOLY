import React from "react";

export const InputField = ({
  id,
  label,
  value,
  onChange,
  type = "text",
  styleProps,
}) => {
  return (
    <div style={styleProps.inputContainer}>
      <label htmlFor={id} style={styleProps.label}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        style={styleProps.input}
      />
    </div>
  );
};
