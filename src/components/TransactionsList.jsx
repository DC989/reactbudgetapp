import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function TransactionsList({ transactions, type }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{type}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Salary</TableCell>
            <TableCell>+3,000.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Project</TableCell>
            <TableCell>+1,500.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Sold Car</TableCell>
            <TableCell>+5,000.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
