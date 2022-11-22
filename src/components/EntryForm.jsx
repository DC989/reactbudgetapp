import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";

export default function EntryForm({ entry, handleChange, submitTransaction }) {
  return (
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
        <Button onClick={submitTransaction} variant="contained" color="primary">
          <AddCircleIcon />
        </Button>
      ) : null}
      {entry.type === 0 ? (
        <Button onClick={submitTransaction} variant="contained" color="error">
          <DoDisturbOnIcon />
        </Button>
      ) : null}
    </Box>
  );
}
