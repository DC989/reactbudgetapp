import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CancelIcon from "@mui/icons-material/Cancel";

export default function TransactionsList({
  transactions,
  type,
  deleteTransaction,
}) {
  return (
    <TableContainer component={Paper}>
      <Table
        className={
          "table-list " +
          (type === "Income" ? "table-list-income" : "table-list-expense")
        }
        sx={{ minWidth: 500 }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell>{type}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {type === "Income"
            ? transactions
                .filter((transaction) => transaction.type === "income")
                .map((transaction, index) => (
                  <TableRow key={index}>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell style={{ position: "relative" }}>
                      +{transaction.amount}{" "}
                      <CancelIcon
                        onClick={() =>
                          deleteTransaction(index, transaction.type)
                        }
                        style={{
                          position: "absolute",
                          top: "50%",
                          right: "15px",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                          display: "none",
                        }}
                        color="error"
                      />
                    </TableCell>
                  </TableRow>
                ))
            : transactions
                .filter((transaction) => transaction.type === "expense")
                .map((transaction, index) => (
                  <TableRow key={index}>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell style={{ position: "relative" }}>
                      -{transaction.amount}
                      <br />
                      <span style={{ backgroundColor: "red" }}>50%</span>
                      <CancelIcon
                        onClick={() =>
                          deleteTransaction(index, transaction.type)
                        }
                        style={{
                          position: "absolute",
                          top: "50%",
                          right: "15px",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                          display: "none",
                        }}
                        color="error"
                      />
                    </TableCell>
                  </TableRow>
                ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
