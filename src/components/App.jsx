import { useState } from "react";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

import TransactionsList from "./TransactionsList";

import "../styles/App.css";

import { getMonthAndYear, fakeData } from "../utils/helpers";

function App() {
  const [transactions, setTransactions] = useState(fakeData);
  const [entryType, setEntryType] = useState(1);
  const [entryDescription, setEntryDescription] = useState("");
  const [entryAmount, setEntryAmount] = useState("");

  /* const [entry, setEntry] = useState({
    type: 1,
    description: "",
    amount: "",
  }); */

  const { month, year } = getMonthAndYear();

  const getIncomeTotal = () => {
    let incomeTotal = 0;

    transactions
      .filter((transaction) => transaction.type === "income")
      .map((transaction) => (incomeTotal += transaction.amount));

    return incomeTotal;
  };

  const getExpenseTotal = () => {
    let expensesTotal = 0;

    transactions
      .filter((transaction) => transaction.type === "expense")
      .map((transaction) => (expensesTotal += transaction.amount));

    return expensesTotal;
  };

  const availableBudget = getIncomeTotal() - getExpenseTotal();

  const incomeSpentPercentage = () => {
    return getIncomeTotal() > 0
      ? `${((getExpenseTotal() / getIncomeTotal()) * 100).toFixed(2)}%`
      : "There is no income";
  };

  const submitTransaction = () => {
    if (entryDescription && entryAmount > 0) {
      setTransactions((prevState) => [
        ...prevState,
        {
          type: entryType === 1 ? "income" : "expense",
          description: entryDescription,
          amount: Number(entryAmount),
        },
      ]);
      setEntryType(1);
      setEntryDescription("");
      setEntryAmount("");
    } else {
      alert("Please fill in all the fields");
    }
  };

  const deleteTransaction = (key) => {
    console.log(key);

    /* setTransactions((prevState) =>
      prevState.filter((transaction) => transaction.key !== key)
    ); */
  };

  return (
    <div className="App">
      <header className="AppHeader">
        <div className="AppDisplay">
          Available Budget in {month} {year}:
          <div className="AppDisplayBudget">
            {availableBudget > 0 ? `+ ${availableBudget.toFixed(2)}` : null}
            {availableBudget < 0 ? `${availableBudget.toFixed(2)}` : null}
            {availableBudget === 0 ? `${availableBudget.toFixed(2)}` : null}
          </div>
          <div
            style={{ backgroundColor: "lightblue" }}
            className="AppDisplayIncome"
          >
            Income
            <span>+{getIncomeTotal()}</span>
          </div>
          <div
            style={{ backgroundColor: "red" }}
            className="AppDisplayExpenses"
          >
            Expenses
            <span>
              -{getExpenseTotal()}
              <br />
              <span>{incomeSpentPercentage()}</span>
            </span>
          </div>
        </div>
      </header>

      <Select
        onChange={(e) => setEntryType(e.target.value)}
        value={entryType}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
      >
        <MenuItem value={1}>+</MenuItem>
        <MenuItem value={0}>-</MenuItem>
      </Select>

      <TextField
        onChange={(e) => setEntryDescription(e.target.value)}
        value={entryDescription}
        required
        id="outlined-basic"
        label="Add description"
        variant="outlined"
        inputProps={{ maxLength: 50 }}
      />

      <TextField
        onChange={(e) => setEntryAmount(e.target.value)}
        value={entryAmount}
        id="filled-number"
        label="Enter amount"
        type="number"
        inputProps={{ min: 1 }}
        InputLabelProps={{
          shrink: true,
        }}
        variant="filled"
      />

      {entryType === 1 ? (
        <Button onClick={submitTransaction} variant="contained" color="success">
          Enter Income
        </Button>
      ) : null}
      {entryType === 0 ? (
        <Button onClick={submitTransaction} variant="contained" color="error">
          Enter Expense
        </Button>
      ) : null}

      <Grid container spacing={2}>
        <Grid item sm={6}>
          <TransactionsList
            transactions={transactions}
            type="Income"
            deleteTransaction={deleteTransaction}
          />
        </Grid>

        <Grid item sm={6}>
          <TransactionsList
            transactions={transactions}
            type="Expenses"
            deleteTransaction={deleteTransaction}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
