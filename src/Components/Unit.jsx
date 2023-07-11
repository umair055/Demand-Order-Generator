import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const Unit = ({ SelectedUnit, setSelectedUnit, index, Type }) => {
  const hasError = useSelector((state) => state.hasError.hasError);
  const handleSelectUnit = (e) => {
    const temp = [...SelectedUnit];
    temp[index] = e.target.value;
    setSelectedUnit(temp);
  };

  return (
    <FormControl error={hasError[index]}>
      <InputLabel>UOM</InputLabel>
      <Select
        value={SelectedUnit[index]}
        label="Unit"
        onChange={(e) => handleSelectUnit(e)}
        sx={{ width: "7rem" }}
      >
        <MenuItem value={Type === "PIPE" ? "BUNDLE" : "UNIT"}>
          {Type === "PIPE" ? "BUNDLE" : "UNIT"}
        </MenuItem>
        <MenuItem value={Type === "PIPE" ? "LENGTH" : "CARTON"}>
          {Type === "PIPE" ? "LENGTH" : "CARTON"}
        </MenuItem>
      </Select>
      {hasError[index] && <FormHelperText>This is required!</FormHelperText>}
    </FormControl>
  );
};

export default Unit;
