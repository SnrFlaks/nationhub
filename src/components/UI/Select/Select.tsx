import { FormControl, Select as MuiSelect, SelectChangeEvent } from "@mui/material";

interface SelectProps {
  value: string;
  onChange: (event: SelectChangeEvent) => void;
  children: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({ value, onChange, children }) => {
  return (
    <FormControl>
      <MuiSelect value={value} onChange={onChange}>
        {children}
      </MuiSelect>
    </FormControl>
  );
};

export default Select;
