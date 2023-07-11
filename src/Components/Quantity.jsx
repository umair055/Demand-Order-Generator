import { TextField } from "@mui/material";
import React from "react";

const Quantity = ({ index, Quantity, setQuantity }) => {
  return (
    <TextField
      type="number"
      InputProps={{ inputProps: { min: 1 } }}
      label="Quantity"
      value={Quantity[index]}
      variant="outlined"
      onChange={(e) => {
        const temp = [...Quantity];
        temp[index] = e.target.value;
        setQuantity(temp);
      }}
    />
  );
};

export default Quantity;
