import GetProducts from "./Components/GetProducts";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TableToDownload from "./Components/TableToDownload";
function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<GetProducts />} />
        <Route path="download" element={<TableToDownload />} />
      </Routes>
    </Router>
  );
}

export default App;
