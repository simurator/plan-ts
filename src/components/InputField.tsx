import React from "react";

type InputFieldProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: "text" | "time";
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  type,
}) => {
  return (
    <div className="form-group">
      <label>{label}:</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="input-field"
        required
      />
    </div>
  );
};

export default InputField;
