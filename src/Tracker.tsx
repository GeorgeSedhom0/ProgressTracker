// this projecy will be GitHub like Progress Tracker
import { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";

interface Progress {
  progress: number;
  date: number;
  done: string[];
}
const Tracker = () => {
  const [progress, setProgress] = useState<Progress[]>([
    {
      progress: 0,
      date: Date.now(),
      done: ["mock data"],
    },
  ]);

  const colorByProgress = [
    "#242424",
    "#2c672c",
    "#2e782e",
    "#308930",
    "#33aa33",
  ];

  // create mock progress data

  const mockProgress = () => {
    const newProgress = [...progress];
    for (let i = 0; i < 365; i++) {
      newProgress.push({
        progress: Math.floor(Math.random() * 5),
        date: Date.now(),
        done: ["mock data"],
      });
    }
    setProgress(newProgress);
  };

  useEffect(() => {
    mockProgress();
  }, []);
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
            <Tooltip placement="top" title={item.done.join(", ")} key={index}>
              <div
                className="progressSquare"
                style={{
                  backgroundColor: colorByProgress[item.progress],
                }}
              ></div>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
};

export default Tracker;
