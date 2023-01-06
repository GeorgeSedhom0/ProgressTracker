// this projecy will be GitHub like Progress Tracker
import { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import AddProgress from "./componants/inputProgress";
import { Divider } from "@mui/material/";

export interface Progress {
  progress: number;
  date: number;
  done: string[];
}
const Tracker = () => {
  const [progress, setProgress] = useState<Progress[]>([]);

  console.log(progress);

  const colorByProgress = [
    "#242424",
    "#2c672c",
    "#2e782e",
    "#308930",
    "#33aa33",
  ];

  // create mock progress data

  const mockProgress = () => {
    const newProgress = [];
    const yearAgo = new Date();
    yearAgo.setDate(yearAgo.getDate() - 365);

    for (let i = 0; i < 365; i++) {
      yearAgo.setDate(yearAgo.getDate() + 1);

      newProgress.push({
        progress: 0,
        date: yearAgo.getTime(),
        done: [],
      });
    }
    setProgress(newProgress);
    return newProgress;
  };

  useEffect(() => {
    // get the saved data from localStoarge
    const savedData = localStorage.getItem("progress");
    if (!savedData) {
      console.log("no data");
      const initProgress = mockProgress();
      localStorage.setItem("progress", JSON.stringify(initProgress));
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
        {progress.map((item: Progress, index: number) => {
          const dateTitle = new Date(item.date).toLocaleDateString();
          const Title = () => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "1px",
                }}
              >
                <span>{dateTitle}</span>
                {item.done.map((item: string, index: number) => (
                  <div key={index}>
                    <Divider />
                    <span>{item} </span>
                  </div>
                ))}
              </div>
            );
          };
          return (
            <Tooltip placement="top" title={<Title />} key={index}>
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
