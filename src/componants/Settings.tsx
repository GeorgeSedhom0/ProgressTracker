import { useState, useEffect } from "react";
import Gradient from "javascript-color-gradient";

const Settings = () => {
  const [bestPerformanceColor, setBestPerformanceColor] =
    useState<string>("#242424");
  const [worstPerformanceColor, setWorstPerformanceColor] =
    useState<string>("#33aa33");

  useEffect(() => {
    const customColors = localStorage.getItem("customColors");
    if (customColors) {
      setBestPerformanceColor(JSON.parse(customColors)[0]);
      setWorstPerformanceColor(JSON.parse(customColors)[4]);
    } else {
      const gradient = new Gradient();
      gradient.setColorGradient(bestPerformanceColor, worstPerformanceColor);
      gradient.setMidpoint(4);
      const colors = gradient.getColors();
      localStorage.setItem("customColors", JSON.stringify(colors));
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
      }}
    >
      {/* color picker */}
      <div>
        <h2>Color Picker</h2>
        <div>
          <div>
            <label htmlFor="primary">Color for best performance</label>{" "}
            <input
              value={bestPerformanceColor}
              onChange={(e) => {
                setBestPerformanceColor(e.target.value);
              }}
              type="color"
              id="primary"
              name="primary"
            />
            <label htmlFor="secondary">Color for worst performance</label>{" "}
            <input
              value={worstPerformanceColor}
              onChange={(e) => {
                setWorstPerformanceColor(e.target.value);
              }}
              type="color"
              id="primary"
              name="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
