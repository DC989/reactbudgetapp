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
    <TableContainer sx={{ boxShadow: "none !important" }} component={Paper}>
      <Table
        className={
          "table-list " +
          (type === "INCOME" ? "table-list-income" : "table-list-expense")
        }
        sx={{ minWidth: 500 }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell colSpan={4}>{type}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {type === "INCOME"
            ? transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>+{transaction.amount} </TableCell>
                  <TableCell></TableCell>
                  <TableCell style={{ position: "relative" }}>
                    <CancelIcon
                      onClick={() =>
                        deleteTransaction(transaction.id, transaction.type)
                      }
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        cursor: "pointer",
                        display: "none",
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))
            : transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>-{transaction.amount}</TableCell>
                  <TableCell>
                    <span
                      style={{
                        display: "inline-block",
                        borderRadius: "5px",
                        backgroundColor: "#ba000d",
                        padding: "1px 5px 2px",
                        color: "#fff",
                      }}
                    >
                      {incomeSpentPercentagePerExpense(transaction.amount)}
                    </span>
                  </TableCell>
                  <TableCell style={{ position: "relative" }}>
                    <CancelIcon
                      onClick={() =>
                        deleteTransaction(transaction.id, transaction.type)
                      }
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        cursor: "pointer",
                        display: "none",
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
