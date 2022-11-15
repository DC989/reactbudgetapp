import { useState } from "react";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

import TransactionsList from "./TransactionsList";

import "../styles/App.css";

import { getMonthAndYear } from "../utils/helpers";

const fakeData = [
  {
    type: "income",
    description: "Salary",
    amount: 3000,
  },
  {
    type: "income",
    description: "Project",
    amount: 1500,
  },
  {
    type: "income",
    description: "Sold Car",
    amount: 5000,
  },
  {
    type: "expense",
    description: "Rent",
    amount: 900,
  },
  {
    type: "expense",
    description: "Holidays",
    amount: 1000,
  },
  {
    type: "expense",
    description: "Gaz & Electricity",
    amount: 250,
  },
  {
    type: "expense",
    description: "Loan",
    amount: 4500,
  },
];

function App() {
  const [transactions, setTransactions] = useState(fakeData);

  const { month, year } = getMonthAndYear();

  return (
    <div className="App">
      <header className="AppHeader">
        <div className="AppDisplay">
          Available Budget in {month} {year}:
          <div className="AppDisplayBudget">+2,850.00</div>
          <div
            style={{ backgroundColor: "lightblue" }}
            className="AppDisplayIncome"
          >
            Income
            <span>+9,500.00</span>
          </div>
          <div
            style={{ backgroundColor: "red" }}
            className="AppDisplayExpenses"
          >
            Expenses
            <span>
              -6,650.00
              <span>70%</span>
            </span>
          </div>
        </div>
      </header>

      <Select labelId="demo-simple-select-label" id="demo-simple-select">
        <MenuItem value={10}>+</MenuItem>
        <MenuItem value={20}>-</MenuItem>
      </Select>

      <TextField
        size="small"
        id="outlined-basic"
        label="Add description"
        variant="outlined"
      />

      <TextField
        size="small"
        id="outlined-number"
        label="Value"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
      />

      <Button variant="contained">Submit</Button>

      <Grid container spacing={2}>
        <Grid item sm={6}>
          <TransactionsList transactions={transactions} type="Income" />
        </Grid>

        <Grid item sm={6}>
          <TransactionsList transactions={transactions} type="Expense" />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
