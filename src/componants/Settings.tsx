import { Dialog, DialogContent, IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useState } from "react";

const Settings = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <IconButton
        onClick={() => {
          setOpen(open);
        }}
      >
        <SettingsIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogContent>No Setting yet</DialogContent>
      </Dialog>
    </>
  );
};
