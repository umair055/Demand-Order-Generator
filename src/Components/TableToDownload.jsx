import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from "@mui/material";
import React, { useRef } from "react";
import NTLogo from "./Picture1.jpg";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const TableToDownload = () => {
  const DemandedProducts = JSON.parse(
    localStorage.getItem("TableToBeDownloaded")
  );

  const containerRef = useRef(null);
  const handleDownload = () => {
    const container = containerRef.current;
    const containerWidth = 1000;
    const containerHeight = container.offsetHeight;
    html2canvas(container, {
      useCORS: true,
      allowTaint: true,
      dpi: window.devicePixelRatio * 600,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 1);
      const pdf = new jsPDF({
        orientation: "l",
        unit: "px",
        format: [containerWidth, containerHeight],
      });
      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        containerWidth,
        containerHeight,
        "",
        "FAST"
      );
      pdf.save("download.pdf");
    });
  };

  return (
    <Box>
      <Box ref={containerRef} sx={{ pb: 4 }}>
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
        <Table sx={{ mt: 8 }}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ fontWeight: 600, fontSize: "16px", textAlign: "center" }}
              >
                Sr. No.
              </TableCell>
              <TableCell
                sx={{ fontWeight: 600, fontSize: "16px", textAlign: "center" }}
              >
                Product
              </TableCell>
              <TableCell
                sx={{ fontWeight: 600, fontSize: "16px", textAlign: "center" }}
              >
                UOM
              </TableCell>
              <TableCell
                sx={{ fontWeight: 600, fontSize: "16px", textAlign: "center" }}
              >
                Quantity
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {DemandedProducts.map((item, index) => (
              <TableRow key={index}>
                <TableCell
                  sx={{
                    fontSize: "16px",
                    textAlign: "center",
                  }}
                >
                  {index + 1}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "16px",
                    textAlign: "center",
                  }}
                >
                  {item.Name}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "16px",
                    textAlign: "center",
                  }}
                >
                  {item.Unit}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "16px",
                    textAlign: "center",
                  }}
                >
                  {item.Quantity}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Button
          sx={{ margin: "3rem auto 0 auto" }}
          onClick={() => handleDownload()}
          variant="contained"
        >
          Downlaod
        </Button>
      </Box>
    </Box>
  );
};

export default TableToDownload;
