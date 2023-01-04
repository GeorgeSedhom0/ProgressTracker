import TextField from "@mui/material/TextField";
import { Progress } from "../Tracker";

const addProgress: React.FC<{
  setProgress: React.Dispatch<React.SetStateAction<Progress[]>>;
}> = ({ setProgress }) => {
  return (
    <div>
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
    </div>
  );
};

export default addProgress;
