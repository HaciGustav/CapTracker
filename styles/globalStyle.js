export const btnHoverStyle = {
  cursor: "pointer",
  "&:hover": { color: "red" },
};
export const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 300, sm: 400, md: 550 },
  maxHeight: "80vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: { xs: 1, sm: 2, md: 4 },
  borderRadius: "10px",
  overflowY: "auto",
};
export const flexCenter = {
  display: "flex",
  flexDirection: { xs: "column", sm: "row" },
  justifyContent: "center",
  alignItems: "center",
  gap: 2,
};

export const flex = {
  display: "flex",
  flexDirection: { xs: "column", sm: "row", md: "row" },
  justifyContent: "center",
  alignItems: "center",
  gap: 1,
};

export const flexColumn = {
  display: "flex",
  flexDirection: "column",
  gap: 1,
};

export const arrowStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  "&:hover": { color: "red" },
};
