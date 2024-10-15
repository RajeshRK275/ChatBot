import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";

export default function InputBox({ onSend }) {
  const [query, setQuery] = useState("");

  const handleSend = () => {
    if (query.trim()) {
      onSend(query);
      setQuery(""); // Clear the input after sending
    }
  };

  return (
    <Box sx={{ mt: 4, mb: 2 }}>
      <Stack direction="row" spacing={1}>
        <TextField
          fullWidth
          label="Enter your question"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ backgroundColor: "#E2F1E7" }} // Component background color
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#243642", // Change this to your desired color
            color: "#ffffff", // Text color
            "&:hover": {
              backgroundColor: "#387478", // Darker shade for hover effect
            },
          }}
          endIcon={<SendIcon />}
          onClick={handleSend}
        >
          Send
        </Button>
      </Stack>
    </Box>
  );
}
