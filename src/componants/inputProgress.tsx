import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Progress } from "../Tracker";
import { useState } from "react";

const AddProgress: React.FC<{
  setProgress: React.Dispatch<React.SetStateAction<Progress[]>>;
}> = ({ setProgress }) => {
  const [newProgress, setNewProgress] = useState(0);
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <TextField
        id="outlined-number"
        label="Progress"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        onChange={(e) => {
          setProgress((prev) => {
            prev.push({
              progress: parseInt(e.target.value),
              date: Date.now(),
              done: ["mock data"],
            });
            return prev;
          });
        }}
      />
      <Button
        variant="contained"
        onClick={() => {
          setProgress((prev) => {
            prev.push({
              progress: 0,
              date: Date.now(),
              done: ["mock data"],
            });
            return prev;
          });
        }}
      >
        Submit
      </Button>
    </div>
  );
};

export default AddProgress;
