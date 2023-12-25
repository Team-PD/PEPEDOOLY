// TextAreaField.jsx
import React from "react";

export const TextAreaField = ({ id, label, value, onChange, styleProps }) => {
  return (
    <div style={styleProps.textAreaContainer}>
      <label htmlFor={id} style={styleProps.label}>
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        style={styleProps.textArea}
      />
    </div>
  );
};
