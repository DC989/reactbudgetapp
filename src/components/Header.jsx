import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function Header({
  month,
  year,
  availableBudget,
  getIncomeTotal,
  getExpenseTotal,
  incomeSpentPercentageTotal,
}) {
  return (
    <header className="AppHeader">
      <div className="AppDisplay">
        <span>
          Available Budget in {month} {year}:
        </span>
        <div className="AppDisplayBudget">
          {availableBudget > 0 ? `+ ${availableBudget.toFixed(2)}` : null}
          {availableBudget < 0 ? `${availableBudget.toFixed(2)}` : null}
          {availableBudget === 0 ? `${availableBudget.toFixed(2)}` : null}
        </div>

        <TableContainer
          sx={{ maxWidth: 300, boxShadow: "none !important" }}
          component={Paper}
        >
          <Table aria-label="simple table">
            <TableBody>
              <TableRow className="AppDisplayIncome">
                <TableCell>INCOME</TableCell>
                <TableCell align="right">+{getIncomeTotal}</TableCell>
                {incomeSpentPercentageTotal() ? <TableCell></TableCell> : null}
              </TableRow>
              <TableRow className="AppDisplayExpenses">
                <TableCell>EXPENSES</TableCell>
                <TableCell align="right">-{getExpenseTotal}</TableCell>
                {incomeSpentPercentageTotal() ? (
                  <TableCell>
                    <span>{incomeSpentPercentageTotal()}</span>
                  </TableCell>
                ) : null}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </header>
  );
}
