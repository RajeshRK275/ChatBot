// LoginStyles.js
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const StyledContainer = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#629584", // Dark grey background
  zIndex: 999, // Ensure it's above other content
}));

export const StyledLoginBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#E2F1E7", // White background for the box
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  width: 300, // Fixed width for the box
  backdropFilter: "blur(10px)", // Blurred background inside the box
}));
