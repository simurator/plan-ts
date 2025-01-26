import React from "react";

type TimePickerProps = {
  value: string;
  onChange: (time: string) => void;
  label?: string;
};

const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  label = "Czas",
}) => (
  <div>
    <label>{label}</label>
    <input
      type="time"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default TimePicker;
