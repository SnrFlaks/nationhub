import {
  FormControl,
  Select as MuiSelect,
  SelectChangeEvent,
  StyledEngineProvider,
} from "@mui/material";

interface SelectProps {
  value: string;
  onChange: (event: SelectChangeEvent) => void;
  children: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({ value, onChange, children }) => {
  return (
    <StyledEngineProvider injectFirst>
      <FormControl>
        <MuiSelect value={value} onChange={onChange}>
          {children}
        </MuiSelect>
      </FormControl>
    </StyledEngineProvider>
  );
};

export default Select;
