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
