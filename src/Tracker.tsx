// this projecy will be GitHub like Progress Tracker
import { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import AddProgress from "./componants/inputProgress";

export interface Progress {
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
    const yearAgo = new Date();
    yearAgo.setDate(yearAgo.getDate() - 365);

    for (let i = 0; i < 365; i++) {
      yearAgo.setDate(yearAgo.getDate() + 1);

      newProgress.push({
        progress: 0,
        date: yearAgo.getTime(),
        done: ["- None"],
      });
    }
    setProgress(newProgress);
  };

  useEffect(() => {
    // get the saved data from localStoarge
    const savedData = localStorage.getItem("progress");
    if (!savedData) {
      mockProgress();
    } else {
      setProgress(JSON.parse(savedData));
    }

    return () => {
      setProgress([]);
    };
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
        <AddProgress setProgress={setProgress} />
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
