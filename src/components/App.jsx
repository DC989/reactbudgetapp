import { v4 as uuidv4 } from "uuid";

import { useState, useRef, useEffect, useMemo } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import TransactionsList from "./TransactionsList";

import "../styles/App.css";

import { getMonthAndYear } from "../utils/helpers";

function App() {
  const [incomeTransactions, setIncomeTransactions] = useState([]);
  const [expenseTransactions, setExpenseTransactions] = useState([]);

  const [entry, setEntry] = useState({ type: 1, description: "", amount: "" });

  const handleChange = (key, value) => {
    setEntry((prevState) => ({ ...prevState, [key]: value }));
  };

  const { month, year } = getMonthAndYear();

  const getIncomeTotal = useMemo(() => {
    let incomeTotal = 0;

    incomeTransactions.map(
      (transaction) => (incomeTotal += transaction.amount)
    );

    return incomeTotal;
  }, [incomeTransactions]);

  const getExpenseTotal = useMemo(() => {
    let expenseTotal = 0;

    expenseTransactions.map(
      (transaction) => (expenseTotal += transaction.amount)
    );

    return expenseTotal;
  }, [expenseTransactions]);

  const availableBudget = getIncomeTotal - getExpenseTotal;

  const incomeSpentPercentageTotal = () => {
    return getIncomeTotal > 0
      ? `${Math.round((getExpenseTotal / getIncomeTotal) * 100)}%`
      : "There is no income";
  };

  const incomeSpentPercentagePerExpense = (amount) => {
    return getIncomeTotal > 0
      ? `${Math.round((amount / getIncomeTotal) * 100)}%`
      : "There is no income";
  };

  const submitTransaction = () => {
    if (entry.description && entry.amount > 0) {
      if (entry.type === 1) {
        setIncomeTransactions((prevState) => [
          ...prevState,
          {
            id: uuidv4(),
            type: "income",
            description: entry.description,
            amount: Number(entry.amount),
          },
        ]);
      } else {
        setExpenseTransactions((prevState) => [
          ...prevState,
          {
            id: uuidv4(),
            type: "expense",
            description: entry.description,
            amount: Number(entry.amount),
          },
        ]);
      }

      handleChange("type", 1);
      handleChange("description", "");
      handleChange("amount", "");
    } else {
      alert("Please fill in all the fields");
    }
  };

  const deleteTransaction = (key, type) => {
    if (type === "income") {
      setIncomeTransactions((prevState) => {
        return prevState.filter((transaction) => transaction.id !== key);
      });
    } else {
      setExpenseTransactions((prevState) => {
        return prevState.filter((transaction) => transaction.id !== key);
      });
    }
  };

  useEffect(() => {
    if (typeof Storage !== "undefined") {
      if (localStorage.getItem("listOfIncome")) {
        setIncomeTransactions(JSON.parse(localStorage.getItem("listOfIncome")));

        console.log("Successfull read from listOfIncome local storage.");
      }

      if (localStorage.getItem("listOfExpenses")) {
        setExpenseTransactions(
          JSON.parse(localStorage.getItem("listOfExpenses"))
        );

        console.log("Successfull read from listOfExpenses local storage.");
      }
    } else {
      alert("Sorry, your crappy browser does not support Web Storage...");
    }
  }, []);

  const initialRenderIncomeTransactions = useRef(true);

  useEffect(() => {
    if (typeof Storage !== "undefined") {
      if (initialRenderIncomeTransactions.current) {
        initialRenderIncomeTransactions.current = false;
      } else {
        localStorage.setItem(
          "listOfIncome",
          JSON.stringify(incomeTransactions)
        );

        console.log("Successfull write to listOfIncome local storage.");
      }
    } else {
      alert("Sorry, your crappy browser does not support Web Storage...");
    }
  }, [incomeTransactions]);

  const initialRendrExpenseTransactions = useRef(true);

  useEffect(() => {
    if (typeof Storage !== "undefined") {
      if (initialRendrExpenseTransactions.current) {
        initialRendrExpenseTransactions.current = false;
      } else {
        localStorage.setItem(
          "listOfExpenses",
          JSON.stringify(expenseTransactions)
        );

        console.log("Successfull write to listOfExpenses local storage.");
      }
    } else {
      alert("Sorry, your crappy browser does not support Web Storage...");
    }
  }, [expenseTransactions]);

  return (
    <div className="App">
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
                  <TableCell></TableCell>
                </TableRow>
                <TableRow className="AppDisplayExpenses">
                  <TableCell>EXPENSES</TableCell>
                  <TableCell align="right">-{getExpenseTotal}</TableCell>
                  <TableCell>
                    <span>{incomeSpentPercentageTotal()}</span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </header>

      <Box className="AppForm">
        <Select
          onChange={(e) => handleChange("type", e.target.value)}
          value={entry.type}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
        >
          <MenuItem value={1}>+</MenuItem>
          <MenuItem value={0}>-</MenuItem>
        </Select>

        <TextField
          onChange={(e) => handleChange("description", e.target.value)}
          value={entry.description}
          required
          id="outlined-basic"
          label="Add description"
          variant="outlined"
          inputProps={{ maxLength: 50 }}
        />

        <TextField
          onChange={(e) => handleChange("amount", e.target.value)}
          value={entry.amount}
          required
          id="filled-number"
          label="Enter amount"
          type="number"
          inputProps={{ min: 1 }}
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
        />

        {entry.type === 1 ? (
          <Button
            onClick={submitTransaction}
            variant="contained"
            color="primary"
          >
            <CheckCircleIcon />
          </Button>
        ) : null}
        {entry.type === 0 ? (
          <Button onClick={submitTransaction} variant="contained" color="error">
            <CancelIcon />
          </Button>
        ) : null}
      </Box>

      <Box className="AppTransactions">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TransactionsList
              transactions={incomeTransactions}
              type="INCOME"
              deleteTransaction={deleteTransaction}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TransactionsList
              transactions={expenseTransactions}
              type="EXPENSES"
              deleteTransaction={deleteTransaction}
              incomeSpentPercentagePerExpense={incomeSpentPercentagePerExpense}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default App;
