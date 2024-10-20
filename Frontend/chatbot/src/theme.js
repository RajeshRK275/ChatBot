import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif", // Set Poppins as the primary font
  },
  palette: {
    primary: {
      main: "#243642", // Button color
    },
    secondary: {
      main: "#387478", // Can be used for accent elements
    },
    background: {
      default: "#629584", // Screen background
      paper: "#E2F1E7", // Component background
    },
    text: {
      primary: "#243642", // Text color (for headers, etc.)
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#243642", // Change this to your desired color
          color: "#ffffff", // Text color
          "&:hover": {
            backgroundColor: "#387478", // Darker shade for hover effect
          },
          margin: 2,
        },
      },
    },
  },
});

export default theme;
