import React from "react";

type InputFieldProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: "text" | "time";
  error?: string; // Dodane pole na komunikaty błędów
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  type,
  error,
}) => {
  return (
    <div className="form-group">
      <label>{label}:</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`input-field ${error ? "input-error" : ""}`} // Dodana klasa błędu
        required
      />
      {error && <span className="error-message">{error}</span>}{" "}
      {/* Wyświetlanie błędu */}
    </div>
  );
};

export default InputField;
