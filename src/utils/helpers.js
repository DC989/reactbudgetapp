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

export const fakeData = [
  {
    type: "income",
    description: "Salary",
    amount: 5000,
  },
  {
    type: "income",
    description: "Project",
    amount: 1500,
  },
  {
    type: "income",
    description: "Sold Car",
    amount: 10000,
  },
  {
    type: "income",
    description: "Side Gig",
    amount: 1000,
  },
  {
    type: "expense",
    description: "Rent",
    amount: 450,
  },
  {
    type: "expense",
    description: "Holidays",
    amount: 3500,
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
  {
    type: "expense",
    description: "Laptop",
    amount: 4500,
  },
  {
    type: "expense",
    description: "Bought Car",
    amount: 15000,
  },
];
