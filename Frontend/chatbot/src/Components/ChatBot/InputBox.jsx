import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";

export default function InputBox({ onSend }) {
  const [query, setQuery] = useState("");

  const handleSend = () => {
    onSend(query);
    setQuery(""); // Clear the input after sending
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
        />
        <Button
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
          sx={{ mt: 2 }}
          onClick={handleSend}
        >
          Send
        </Button>
      </Stack>
    </Box>
  );
}
