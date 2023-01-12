// this projecy will be GitHub like Progress Tracker
import { useEffect, useState } from "react";
import { Tooltip, Select, MenuItem, Dialog, IconButton } from "@mui/material";
import AddProgress from "../componants/inputProgress";
import { Divider } from "@mui/material/";
import ImportExport from "../componants/ImportExport";
import MobileSquar from "../componants/mobileSquar";
import { Link } from "react-router-dom";
import { Settings } from "@mui/icons-material";

export interface Progress {
  progress: number;
  date: number;
  done: string[];
}

const Tracker = () => {
  const [progress, setProgress] = useState<Progress[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("Leatest 365 Days");

  const name = localStorage.getItem("customName") || "";
  const allPossibleYears: string[] = [];
  progress.forEach((item) => {
    const year = new Date(item.date).getFullYear() as unknown as string;
    if (!allPossibleYears.includes(year)) {
      allPossibleYears.push(year);
    }
  });

  const filler = (progress: Progress[]) => {
    if (progress.length >= 365) return progress;
    const fullYear = [];
    const yearStart = new Date();
    // make it 1/1 of the current year
    yearStart.setMonth(0);
    yearStart.setDate(1);
    for (let i = 0; i < 365; i++) {
      fullYear.push({
        progress: 0,
        date: yearStart.getTime(),
        done: [],
      });
      yearStart.setDate(yearStart.getDate() + 1);
    }
    fullYear.forEach((item, index) => {
      if (progress[index]) {
        fullYear[index] = progress[index];
      }
    });
    return fullYear;
  };

  const currentYearProgress = filler(
    progress.filter((item) => {
      if (selectedYear === "Leatest 365 Days") {
        // return latest 365 days
        const yearAgo = new Date();
        yearAgo.setDate(yearAgo.getDate() - 365);
        return item.date > yearAgo.getTime();
      }
      const year = new Date(item.date).getFullYear() as unknown as string;
      return year === selectedYear;
    })
  );

  const colorByProgress = [
    "#242424",
    "#2c672c",
    "#2e782e",
    "#308930",
    "#33aa33",
  ];

  const customColors = localStorage.getItem("customColors");
  if (customColors) {
    const colors = JSON.parse(customColors);
    colors.forEach((item: string, index: number) => {
      colorByProgress[index] = item;
    });
  } else {
    localStorage.setItem("customColors", JSON.stringify(colorByProgress));
  }

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

  const isMobile = window.innerWidth < 500;
  return (
    <div
      style={{
        display: "flex",
        placeItems: "center",
        minHeight: "100vh",
      }}
    >
      <div>
        <h1>Tracker</h1>
        <h4>Welcome back {name}, Are you ready to make some progress today</h4>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "1em",
              left: "1em",
              display: "flex",
              flexWrap: "wrap",
              gap: "1em",
              width: "calc(100% - 2em)",
              justifyContent: "space-between",
            }}
          >
            <ImportExport />
            <div
              style={{
                display: "flex",
                gap: "1em",
              }}
            >
              <AddProgress setProgress={setProgress} />
              <Link to="/settings">
                <IconButton>
                  <Settings
                    sx={{
                      color: "white",
                    }}
                  />
                </IconButton>
              </Link>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              margin: "1em 0",
            }}
          >
            <Select
              value={selectedYear}
              onChange={(e) => {
                setSelectedYear(e.target.value);
              }}
            >
              <MenuItem value="Leatest 365 Days">All Years</MenuItem>
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
              flexWrap: "wrap",
              margin: "1em 0",
            }}
          >
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
              if (!isMobile) {
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
              } else {
                return <MobileSquar color={color} Title={Title} />;
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracker;
