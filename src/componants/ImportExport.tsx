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
          console.log("import");
        }}
      >
        Backup / Restore
      </Button>
    </div>
  );
};

export default ImportExport;
