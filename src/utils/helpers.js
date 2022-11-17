const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function getMonthAndYear() {
  const d = new Date();
  let month = monthNames[d.getMonth()];
  let year = d.getFullYear();

  return { month, year };
}

export const fakeListOfIncome = [
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
];

export const fakeListOfExpenses = [
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
