import { Link } from "react-router-dom";
import { Button, Box } from "@mui/material";

export default function NavBar() {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
      <Button component={Link} to="/" variant="contained" color="primary">
        Chatbot Interface
      </Button>
      <Button
        component={Link}
        to="/admin"
        variant="contained"
        color="secondary"
      >
        Admin Panel
      </Button>
    </Box>
  );
}
