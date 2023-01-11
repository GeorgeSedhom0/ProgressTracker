import { useState, useEffect } from "react";
import Gradient from "javascript-color-gradient";
import { Button, IconButton, TextField } from "@mui/material/";
import { Link } from "react-router-dom";
import { Home } from "@mui/icons-material";

const Settings = () => {
  const [temp, setTemp] = useState({
    name: "",
    best: "#33aa33",
    worst: "#242424",
  });
  const [bestPerformanceColor, setBestPerformanceColor] =
    useState<string>("#33aa33");
  const [worstPerformanceColor, setWorstPerformanceColor] =
    useState<string>("#242424");
  const [name, setName] = useState<string>("");

  const saveToLocal = (bestColor: string, worstColor: string, name: string) => {
    const gradient = new Gradient();
    gradient.setColorGradient(worstColor, bestColor);
    gradient.setMidpoint(5);
    let colors = gradient.getColors();
    colors[0] = worstColor;
    colors[4] = bestColor;
    console.log(colors);
    localStorage.setItem("customColors", JSON.stringify(colors));
    localStorage.setItem("customName", name);
  };

  useEffect(() => {
    const customColors = localStorage.getItem("customColors");
    const customName = localStorage.getItem("customName") || "";
    if (customColors) {
      setWorstPerformanceColor(JSON.parse(customColors)[0]);
      setBestPerformanceColor(JSON.parse(customColors)[4]);
      setName(customName);
      setTemp({
        name: customName,
        worst: JSON.parse(customColors)[0],
        best: JSON.parse(customColors)[4],
      });
    } else {
      saveToLocal(bestPerformanceColor, worstPerformanceColor, name);
    }
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: "1em",
        // minHeight: "100%",
      }}
    >
      <Link to="/">
        <IconButton>
          <Home
            sx={{
              color: "white",
            }}
          />
        </IconButton>
      </Link>
      <h2>Change the setting for a custom look</h2>
      <div>
        <TextField
          id="name"
          label="Name"
          color="primary"
          variant="standard"
          size="small"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="primary">Color for best performance</label>{" "}
        <input
          value={bestPerformanceColor}
          onChange={(e) => {
            setBestPerformanceColor(e.target.value);
          }}
          type="color"
        />
      </div>
      <div>
        <label htmlFor="secondary">Color for worst performance</label>{" "}
        <input
          value={worstPerformanceColor}
          onChange={(e) => {
            setWorstPerformanceColor(e.target.value);
          }}
          type="color"
        />
      </div>
      <Button
        variant="contained"
        onClick={() => {
          // save
          saveToLocal(bestPerformanceColor, worstPerformanceColor, name);
          setTemp({
            name: name,
            best: bestPerformanceColor,
            worst: worstPerformanceColor,
          });
        }}
        disabled={
          bestPerformanceColor === temp.best &&
          worstPerformanceColor === temp.worst &&
          name === temp.name
        }
      >
        Save changes
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          // reset
          saveToLocal("#33aa33", "#242424", "");
          setBestPerformanceColor("#33aa33");
          setWorstPerformanceColor("#242424");
          setName("");
          setTemp({
            name: "",
            best: "#33aa33",
            worst: "#242424",
          });
        }}
        disabled={
          bestPerformanceColor === "#33aa33" &&
          worstPerformanceColor === "#242424" &&
          name === ""
        }
      >
        Reset
      </Button>
    </div>
  );
};

export default Settings;
