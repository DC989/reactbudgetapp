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
  incomeSpentPercentagePerExpense,
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
            ? transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell style={{ position: "relative" }}>
                    +{transaction.amount}{" "}
                    <CancelIcon
                      onClick={() =>
                        deleteTransaction(transaction.id, transaction.type)
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
            : transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell style={{ position: "relative" }}>
                    -{transaction.amount}
                    <br />
                    <span style={{ backgroundColor: "red" }}>
                      {incomeSpentPercentagePerExpense(transaction.amount)}
                    </span>
                    <CancelIcon
                      onClick={() =>
                        deleteTransaction(transaction.id, transaction.type)
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
