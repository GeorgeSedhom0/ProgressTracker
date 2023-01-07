import { Button } from "@mui/material";

const ImportExport = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "1em",
        left: "1em",
        display: "flex",
        gap: "1em",
      }}
    >
      <Button
        variant="contained"
        onClick={() => {
          // get the data from localStoarge
          const savedData = localStorage.getItem("progress");
          if (!savedData) {
            alert("No data to backup");
          } else {
            const data = JSON.parse(savedData);
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
      >
        Backup
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          //
        }}
      >
        Restore
      </Button>
    </div>
  );
};

export default ImportExport;
