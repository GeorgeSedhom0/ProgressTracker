// this projecy will be GitHub like Progress Tracker
import { useEffect, useState } from "react";
import { Tooltip, Select, MenuItem } from "@mui/material";
import AddProgress from "./componants/inputProgress";
import { Divider } from "@mui/material/";
import ImportExport from "./componants/ImportExport";

export interface Progress {
  progress: number;
  date: number;
  done: string[];
}

const Tracker = () => {
  const [progress, setProgress] = useState<Progress[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("2022");

  const allPossibleYears: string[] = [];
  progress.forEach((item) => {
    const year = new Date(item.date).getFullYear() as unknown as string;
    if (!allPossibleYears.includes(year)) {
      allPossibleYears.push(year);
    }
  });

  const currentYearProgress = progress.filter((item) => {
    const year = new Date(item.date).getFullYear() as unknown as string;
    return year === selectedYear;
  });

  const colorByProgress = [
    "#242424",
    "#2c672c",
    "#2e782e",
    "#308930",
    "#33aa33",
  ];

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
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
      <ImportExport />
      <h1>Tracker</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        <AddProgress setProgress={setProgress} />
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            margin: "1em 0",
          }}
        >
          <Select
            defaultValue={selectedYear}
            onChange={(e) => {
              setSelectedYear(e.target.value);
            }}
          >
            {allPossibleYears.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            margin: "1em 0",
          }}
        >
          {months.map((item, index) => {
            return (
              <div key={index} style={{ width: "8.3%", textAlign: "center" }}>
                {item}
              </div>
            );
          })}
        </div>

        {currentYearProgress.map((item: Progress, index: number) => {
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
          const color = colorByProgress[item.progress];
          return (
            <Tooltip placement="top" title={<Title />} key={index}>
              <div
                className="progressSquare"
                style={{
                  backgroundColor: color,
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
