import { Button, Tooltip, Typography } from "@mui/material";
import { useState } from "react";

const ImportExport = () => {
  const [getfile, setGetFile] = useState(false);
  const [file, setFile] = useState("");

  return (
    <div
      style={{
        position: "absolute",
        top: "1em",
        left: "1em",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1em",
      }}
    >
      {!getfile && (
        <div>
          <Button
            variant="contained"
            onClick={() => {
              // get the data from localStoarge
              const savedData = localStorage.getItem("progress");
              if (!savedData) {
                alert("No data to backup");
              } else {
                const data = JSON.parse(savedData);
                data[data.length] = "Restored";
                // save the data to a file
                const blob = new Blob([JSON.stringify(data)], {
                  type: "application/json",
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.download = "progress.json";
                a.href = url;
                a.click();
                a.remove();
              }
            }}
            style={{
              marginRight: "1em",
            }}
          >
            Backup
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setGetFile((prev) => !prev);
            }}
          >
            Restore
          </Button>
        </div>
      )}
      {getfile && (
        <>
          <Typography variant="h6">Select a file to restore</Typography>

          <Tooltip title="Once you select a file the data will be restores if it's correct">
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files?.item(0);
                console.log(file);
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    const data = e.target?.result;
                    if (data) {
                      const progress = JSON.parse(data as string);

                      //   check if data is an array and the last item is "Restored"
                      if (
                        Array.isArray(progress) &&
                        progress[progress.length - 1] === "Restored"
                      ) {
                        progress.pop();

                        localStorage.setItem(
                          "progress",
                          JSON.stringify(progress)
                        );
                        alert("Data restored");
                        window.location.reload();
                      } else {
                        alert(
                          "Data is not correct please select a correct file"
                        );
                      }
                    } else {
                      alert("No data found on file");
                    }
                  };
                  reader.readAsText(file);
                }
              }}
              style={{
                border: "1px solid #ccc",
                borderRadius: ".5em",
                padding: ".5em",
              }}
            />
          </Tooltip>
        </>
      )}
    </div>
  );
};

export default ImportExport;
