import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

import TransactionsList from "./TransactionsList";

import "../styles/App.css";

import {
  getMonthAndYear,
  fakeListOfIncome,
  fakeListOfExpenses,
} from "../utils/helpers";

function App() {
  const [incomeTransactions, setIncomeTransactions] = useState(
    localStorage.getItem("listOfIncome")
      ? JSON.parse(localStorage.getItem("listOfIncome"))
      : fakeListOfIncome
  );
  const [expenseTransactions, setExpenseTransactions] = useState(
    localStorage.getItem("listOfExpenses")
      ? JSON.parse(localStorage.getItem("listOfExpenses"))
      : fakeListOfExpenses
  );
  const [entryType, setEntryType] = useState(1);
  const [entryDescription, setEntryDescription] = useState("");
  const [entryAmount, setEntryAmount] = useState("");

  const { month, year } = getMonthAndYear();

  const getIncomeTotal = () => {
    let incomeTotal = 0;

    incomeTransactions.map(
      (transaction) => (incomeTotal += transaction.amount)
    );

    return incomeTotal;
  };

  const getExpenseTotal = () => {
    let expensesTotal = 0;

    expenseTransactions.map(
      (transaction) => (expensesTotal += transaction.amount)
    );

    return expensesTotal;
  };

  const availableBudget = getIncomeTotal() - getExpenseTotal();

  const incomeSpentPercentageTotal = () => {
    return getIncomeTotal() > 0
      ? `${Math.round((getExpenseTotal() / getIncomeTotal()) * 100)}%`
      : "There is no income";
  };

  const incomeSpentPercentagePerExpense = (amount) => {
    return getIncomeTotal() > 0
      ? `${Math.round((amount / getIncomeTotal()) * 100)}%`
      : "There is no income";
  };

  const submitTransaction = () => {
    if (entryDescription && entryAmount > 0) {
      if (entryType === 1) {
        setIncomeTransactions((prevState) => [
          ...prevState,
          {
            type: "income",
            description: entryDescription,
            amount: Number(entryAmount),
          },
        ]);
      } else {
        setExpenseTransactions((prevState) => [
          ...prevState,
          {
            type: "expense",
            description: entryDescription,
            amount: Number(entryAmount),
          },
        ]);
      }

      setEntryType(1);
      setEntryDescription("");
      setEntryAmount("");
    } else {
      alert("Please fill in all the fields");
    }
  };

  const deleteTransaction = (key, type) => {
    if (type === "income") {
      setIncomeTransactions((prevState) => {
        prevState = prevState.slice(0, key).concat(prevState.slice(key + 1));
        return prevState;
      });
    } else {
      setExpenseTransactions((prevState) => {
        prevState = prevState.slice(0, key).concat(prevState.slice(key + 1));
        return prevState;
      });
    }
  };

  useEffect(() => {
    if (typeof Storage !== "undefined") {
      localStorage.setItem("listOfIncome", JSON.stringify(incomeTransactions));
      localStorage.setItem(
        "listOfExpenses",
        JSON.stringify(expenseTransactions)
      );

      console.log("Successfully read from local storage.");
    } else {
      alert("Sorry, your crappy browser does not support Web Storage...");
    }
  }, [incomeTransactions, expenseTransactions]);

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
              <span>{incomeSpentPercentageTotal()}</span>
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
            transactions={incomeTransactions}
            type="Income"
            deleteTransaction={deleteTransaction}
          />
        </Grid>

        <Grid item sm={6}>
          <TransactionsList
            transactions={expenseTransactions}
            type="Expenses"
            deleteTransaction={deleteTransaction}
            incomeSpentPercentagePerExpense={incomeSpentPercentagePerExpense}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
