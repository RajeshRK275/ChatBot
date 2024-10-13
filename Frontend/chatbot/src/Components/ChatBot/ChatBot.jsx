import React, { useState } from "react";
import { Container, Typography } from "@mui/material";

import InputBox from "./InputBox";
import ResponseArea from "./ResponseArea";

export default function ChatBot() {
  const [response, setResponse] = useState(null);

  // Mock API call
  const handleSend = (query) => {
    console.log("Query Sent:", query);

    // Simulate API response
    const mockApiResponse = {
      summary: "This is a summary of the result.",
      result_text: "Here is the detailed result of your query.",
      result_table_path: "https://example.com/table",
      result_visualization_path: "https://example.com/visualization",
      error: "",
    };

    setResponse(mockApiResponse); // Simulating API response
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Chatbot Interface
      </Typography>

      <ResponseArea response={response} />
      <InputBox onSend={handleSend} />
    </Container>
  );
}
