import { flex, flexColumn, modalStyle } from "@/styles/globalStyle";
import { Box, Modal, TextField } from "@mui/material";
import React from "react";

const LogModal = ({ open, setOpen, info }) => {
  const formatDateTime = (date) => {
    return `${new Date(date).toLocaleDateString("tr")}-${new Date(
      date
    ).toLocaleTimeString("tr")}`;
  };

  const stringifiedMeta = JSON.stringify(info?.meta || "", null, 2);
  const multilineRowsMeta = stringifiedMeta.split(",").length + 2;
  const multilineRowsMessage = info?.message?.split(" ").length / 4;

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Box sx={flexColumn}>
          <Box sx={flex}>
            <TextField
              label="ID"
              id="id"
              name="id"
              variant="outlined"
              value={info?.id || ""}
              disabled
              fullWidth
            />
            <TextField
              label="Level"
              id="level"
              name="level"
              variant="outlined"
              value={info?.level || ""}
              disabled
              fullWidth
            />
            <TextField
              label="Timestamp"
              id="timestamp"
              name="timestamp"
              variant="outlined"
              value={formatDateTime(info?.timestamp) || ""}
              disabled
              fullWidth
            />
          </Box>
          <TextField
            label="Message"
            name="message"
            id="message"
            variant="outlined"
            value={info?.message || ""}
            rows={multilineRowsMessage}
            multiline
            disabled
          />
          <TextField
            label="Meta"
            name="meta"
            id="meta"
            type="text"
            variant="outlined"
            value={stringifiedMeta}
            rows={multilineRowsMeta}
            multiline
            disabled
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default LogModal;
