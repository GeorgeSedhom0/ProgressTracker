import { useState } from "react";
import { Tooltip, Dialog, DialogContent } from "@mui/material";

const MobileSquar: React.FC<{ color: string; Title: React.FC }> = ({
  color,
  Title,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className="progressSquare"
        style={{
          backgroundColor: color,
        }}
        onClick={() => {
          setOpen(true);
        }}
      ></div>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogContent>
          <Title />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MobileSquar;
