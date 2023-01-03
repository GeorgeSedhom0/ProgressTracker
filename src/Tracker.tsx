// this projecy will be GitHub like Progress Tracker
import { useState } from "react";

interface Progress {
  progress: number;
  date: number;
}
const Tracker = () => {
  const [progress, setProgress] = useState<Progress[]>([
    {
      progress: 0,
      date: Date.now(),
    },
  ]);

  const colorByProgress = [
    "darkgray",
    "gray",
    "lightgreen",
    "green",
    "darkgreen",
  ];

  // create mock progress data
  return (
    <div>
      <h1>Tracker</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        {progress.map((item, index) => {
          return (
            <div
              key={index}
              className="progressSquare"
              style={{
                backgroundColor: colorByProgress[item.progress],
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default Tracker;
