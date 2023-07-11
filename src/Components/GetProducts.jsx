import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import NTLogo from "./Picture1.jpg";
import QuantityComponent from "./Quantity";
import Unit from "./Unit";
import TableOfDemandedProducts from "./TableOfDemandedProducts";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  AddErrorsReducer,
  AddFalseErrorsReducer,
  AddTrueErrorsReducer,
} from "../Redux/hasErrorSlice";

const GetProducts = () => {
  const [AllProducts, setAllProducts] = useState([]);
  const [SelectedProducts, setSelectedProducts] = useState("Select");
  const [Flag, setFlag] = useState(false);
  const [FilteredProducts, SetFilteredProducts] = useState([]);
  const length = 150;
  const [Quantity, setQuantity] = useState(() =>
    Array.from({ length }, () => 1)
  );
  const [hasError, setHasError] = useState([]);
  const [SelectedUnit, setSelectedUnit] = useState([]);
  const [SelectedSize, setSelectedSize] = useState("");
  const [DemandedProducts, setDemandedProducts] = useState([]);
  const [Sizes, setSizes] = useState([]);
  const navigate = useNavigate();
  const [CopyOfFilteredProducts, setCopyOfFilteredProducts] = useState([]);

  const [WithSocket, setWithSocket] = useState(false);

  const CheckIfSelectedProductsIsPipes = () => {
    if (
      SelectedProducts === "B CLASS PIPE" ||
      SelectedProducts === "C CLASS PIPE" ||
      SelectedProducts === "D CLASS PIPE" ||
      SelectedProducts === "CONDUIT PIPE" ||
      SelectedProducts === "MEDIUM PIPE" ||
      SelectedProducts === "SEWERAGE SERIES PIPE" ||
      SelectedProducts === "SDR PIPE" ||
      SelectedProducts === "VICTOR PIPE"
    ) {
      setFlag(true);
    } else setFlag(false);
  };

  const AddSocketWord = () => {
    var temp = [];
    if (WithSocket)
      temp = FilteredProducts.map((item) => ({
        ...item,
        Name: item.Name + " WITH SOCKET",
      }));
    else
      temp = FilteredProducts.map((item) => ({
        ...item,
        Name: item.Name.replace(" WITH SOCKET", ""),
      }));
    SetFilteredProducts(temp);
  };
  useEffect(AddSocketWord, [WithSocket]);
  const handleDownload = () => {
    localStorage.setItem(
      "TableToBeDownloaded",
      JSON.stringify(DemandedProducts)
    );
    navigate("/download");
  };
  const dispatch = useDispatch();
  const handleAdd = (i, Name) => {
    if (SelectedUnit[i] === undefined) {
      dispatch(AddTrueErrorsReducer(i));
    } else {
      dispatch(AddFalseErrorsReducer(i));
      const temp = [
        ...DemandedProducts,
        { Name: Name, Quantity: Quantity[i], Unit: SelectedUnit[i] },
      ];
      setDemandedProducts(temp);
    }
    console.log(hasError);
  };

  const handleSelectProduct = useCallback((e) => {
    setSelectedProducts(e.target.value);
    setSelectedSize("");
  }, []);

  const FetchAllProductsFormDB = () => {
    axios
      .get(
        "https://shy-bull-cloak.cyclic.app/demand-order-generator/all-products"
      )
      .then((res) => setAllProducts(res.data));
  };

  const GetSizes = () => {
    const sizes = CopyOfFilteredProducts.map((item) => item.Size);
    const temp = Array.from(new Set(sizes));
    setSizes([...temp]);
  };

  const FilterProducts = useCallback(() => {
    var temp = [];
    if (SelectedSize === "") {
      if (SelectedProducts === "SOLVENT") {
        temp = AllProducts.filter((item) => SelectedProducts === item.Category);
      } else {
        temp = AllProducts.filter(
          (item) => SelectedProducts === item.Type + " " + item.Category
        );
      }
      SetFilteredProducts(temp);
      setCopyOfFilteredProducts(temp);
    } else {
      if (SelectedProducts === "SOLVENT") {
        temp = AllProducts.filter(
          (item) =>
            SelectedProducts === item.Category && SelectedSize === item.Size
        );
      } else {
        temp = AllProducts.filter(
          (item) =>
            SelectedProducts === item.Type + " " + item.Category &&
            SelectedSize === item.Size
        );
      }
      SetFilteredProducts(temp);
      console.log(FilteredProducts);
    }
  }, [SelectedProducts, AllProducts, SelectedSize]);

  useEffect(() => FilterProducts(), [handleSelectProduct, FilterProducts]);
  useEffect(GetSizes, [SelectedProducts, FilteredProducts]);
  useEffect(CheckIfSelectedProductsIsPipes, [SelectedProducts]);
  const handleSelectSize = (e) => {
    setSelectedSize(e.target.value);
  };
  useEffect(() => FetchAllProductsFormDB(), []);
  return (
    <Box>
      <Box>
        <Box sx={{ display: "flex" }}>
          <img
            src={NTLogo}
            alt="Nawab Traders Logo"
            style={{ margin: "auto" }}
            height={130}
            width={201}
          />
        </Box>
        <Typography
          variant="h2"
          sx={{ textAlign: "center", mt: 8, fontWeight: 700 }}
        >
          Demand Order
        </Typography>
        <Box
          sx={{ display: "flex", flexDirection: "column", mt: 8, gap: "2rem " }}
        >
          {AllProducts.length !== 0 && (
            <FormControl sx={{ width: "30vw", margin: "auto" }}>
              <InputLabel>Selected Product</InputLabel>
              <Select
                value={SelectedProducts}
                label="Selected Product"
                onChange={(e) => handleSelectProduct(e)}
              >
                <MenuItem value={"Select"}>SELECT PRODUCT GROUP</MenuItem>
                <MenuItem value={"B CLASS PIPE"}>
                  B. CLASS PRESSURE PIPES
                </MenuItem>
                <MenuItem value={"C CLASS PIPE"}>
                  C. CLASS PRESSURE PIPES
                </MenuItem>
                <MenuItem value={"CONDUIT PIPE"}>CONDUIT PIPES</MenuItem>
                <MenuItem value={"D CLASS PIPE"}>
                  D. CLASS PRESSURE PIPES
                </MenuItem>
                <MenuItem value={"MEDIUM PIPE"}>MEDIUM PIPES</MenuItem>
                <MenuItem value={"PPRC PIPE"}>PPRC PIPES</MenuItem>
                <MenuItem value={"PPRC FITTING"}>PPRC FITTINGS</MenuItem>
                <MenuItem value={"SDR PIPE"}>SDR UPVC PIPES</MenuItem>
                <MenuItem value={"SEWERAGE SERIES PIPE"}>
                  SEWERAGE SERIES PIPES
                </MenuItem>
                <MenuItem value={"SEWERAGE SERIES FITTING"}>
                  SEWERAGE SERIES FITTINGS
                </MenuItem>
                <MenuItem value={"SCH.40 FITTING"}>
                  UPVC FITTINGS SCH.40
                </MenuItem>
                <MenuItem value={"VICTOR PIPE"}>VICTOR UPVC PIPES</MenuItem>
                <MenuItem value={"SOLVENT"}>SOLVENTS</MenuItem>
              </Select>
            </FormControl>
          )}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "3rem",
            }}
          >
            {SelectedProducts !== "Select" && (
              <FormControl sx={{ width: "30vw" }}>
                <InputLabel>Selected Size</InputLabel>
                <Select
                  value={SelectedSize}
                  label="Selected Size"
                  onChange={(e) => handleSelectSize(e)}
                >
                  {Sizes.map((size, index) => (
                    <MenuItem key={index} value={size}>
                      {size}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            {Flag && (
              <FormControlLabel
                control={
                  <Switch
                    checked={WithSocket}
                    onChange={() => setWithSocket(!WithSocket)}
                  />
                }
                label="With Socket"
              />
            )}
          </Box>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, fontSize: "16px" }}>
                Name
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: "16px" }}>
                Quantiy
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: "16px" }}>
                Unit
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {FilteredProducts.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.Name}</TableCell>
                <TableCell>
                  <QuantityComponent
                    index={index}
                    Quantity={Quantity}
                    setQuantity={setQuantity}
                  />
                </TableCell>
                <TableCell>
                  <Unit
                    SelectedUnit={SelectedUnit}
                    setSelectedUnit={setSelectedUnit}
                    Type={item.Category}
                    index={index}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleAdd(index, item.Name)}
                    variant="contained"
                  >
                    Add
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Typography variant="h3" sx={{ textAlign: "center", mt: 5 }}>
        Added Products
      </Typography>
      <Box>
        <TableOfDemandedProducts DemandedProducts={DemandedProducts} />
      </Box>
      <Box sx={{ display: "flex" }}>
        <Button
          sx={{ margin: "3rem auto 0 auto" }}
          onClick={() => handleDownload()}
          variant="contained"
        >
          Go To Downlaod Page
        </Button>
      </Box>
    </Box>
  );
};

export default GetProducts;
