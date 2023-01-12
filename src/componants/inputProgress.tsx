import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Button, Slider, Divider, Typography, TextField } from "@mui/material/";
import { useState, useEffect } from "react";
import { Progress } from "../pages/Tracker";

const AddProgress: React.FC<{
  setProgress: React.Dispatch<React.SetStateAction<Progress[]>>;
}> = ({ setProgress }) => {
  const [newProgress, setNewProgress] = useState(0);
  const [progressText, setProgressText] = useState("");
  const [add, setAdd] = useState(false);
  const [addedToday, setAddedToday] = useState(false);

  useEffect(() => {
    const lastAdded = localStorage.getItem("lastAdded");

    if (lastAdded) {
      const lastAddedDate = new Date(Number(lastAdded));
      const today = new Date();
      if (
        lastAddedDate.getDate() === today.getDate() &&
        lastAddedDate.getMonth() === today.getMonth() &&
        lastAddedDate.getFullYear() === today.getFullYear()
      ) {
        setAddedToday(true);
      }
    }
  }, []);

  return (
    <>
      {!addedToday && !add && (
        <Button
          variant="contained"
          onClick={() => {
            setAdd(true);
          }}
        >
          Add Progress
        </Button>
      )}
      {add && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backdropFilter: "blur(5px)",
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "1em",
          }}
        >
          <IconButton
            style={{
              position: "absolute",
              top: "1em",
              right: "1em",
              cursor: "pointer",
            }}
            onClick={() => {
              setAdd(false);
            }}
          >
            <Close
              sx={{
                color: "white",
              }}
            />
            test
          </IconButton>
          <Typography>
            Add Progress for{" "}
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Typography>
          <Divider
            sx={{
              width: "10em",
              color: "white",
            }}
          />
          <Typography>Progress: {newProgress * 25}%</Typography>
          <Slider
            sx={{
              width: "10em",
            }}
            value={newProgress * 25}
            onChange={(e, value) => {
              value = value as number;
              value = value / 25;
              value = Math.round(value);
              console.log(value);
              setNewProgress(value);
            }}
          />
          <Divider
            sx={{
              width: "10em",
              color: "white",
            }}
          />
          <Typography>
            What did you do today
            <br />
            (separate each item with a new line)
          </Typography>
          <TextField
            multiline
            variant="outlined"
            sx={{
              width: "20em",
            }}
            value={progressText}
            onChange={(e) => {
              let value = e.target.value;
              const lines = value.split("\n");
              const newLines = lines.map((line) => {
                if (line[0] === "-") {
                  return line;
                } else {
                  return "- " + line;
                }
              });
              value = newLines.join("\n");
              setProgressText(value);
            }}
          />
          <Divider
            sx={{
              width: "10em",
              color: "white",
            }}
          />
          <Button
            variant="contained"
            onClick={() => {
              setProgress((prev) => {
                const newValue = [...prev];
                const today = newValue.findIndex((progress) => {
                  const date = new Date(progress.date);
                  const today = new Date();
                  return (
                    date.getDate() === today.getDate() &&
                    date.getMonth() === today.getMonth() &&
                    date.getFullYear() === today.getFullYear()
                  );
                });
                const text = progressText.split("\n");
                console.log(today);
                if (today > -1) {
                  newValue[today].progress = newProgress;
                  newValue[today].done = text;
                } else {
                  newValue.push({
                    date: new Date().getTime(),
                    progress: newProgress,
                    done: text,
                  });
                }
                localStorage.setItem(
                  "lastAdded",
                  new Date().getTime().toString()
                );
                localStorage.setItem("progress", JSON.stringify(newValue));
                setAdd(false);
                setAddedToday(true);
                return newValue;
              });
            }}
          >
            Submit
          </Button>
        </div>
      )}
    </>
  );
};

export default AddProgress;
