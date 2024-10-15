import React, { useState } from "react";
import { Container, Typography, Box, CircularProgress } from "@mui/material";
import InputBox from "./InputBox";
import ResponseArea from "./ResponseArea";
import axios from "axios";

export default function ChatBot() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSend = async (query) => {
    console.log("Query Sent:", query);
    setLoading(true); // Start loading
    setError(null);

    // Call Hugging Face API
    try {
      const res = await axios.post(
        "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium",
        {
          inputs: query,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_HUGGING_FACE_ACCESS_TOKEN}`, // Replace with your Hugging Face token
          },
        }
      );

      // Assuming the model returns an array of outputs
      const output = res.data[0].generated_text;

      // Create a response object
      const apiResponse = {
        summary: "Response from the model",
        result_text: output,
        result_table_path: null,
        result_visualization_path: null,
        error: "",
      };

      setResponse(apiResponse); // Set the response state
    } catch (error) {
      console.error("Error fetching response:", error);
      setResponse({
        summary: "",
        result_text: "",
        result_table_path: null,
        result_visualization_path: null,
        error: "Failed to fetch response from the API.",
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ backgroundColor: "#629584", minHeight: "100vh", py: 4 }}
    >
      <Box sx={{ backgroundColor: "#E2F1E7", borderRadius: 2, padding: 4 }}>
        <Typography variant="h4" gutterBottom color="#243642">
          Chatbot Interface
        </Typography>
        {loading && <CircularProgress />} {/* Show loading indicator */}
        {error && <Typography color="error">{error}</Typography>}{" "}
        {/* Show error message */}
        <ResponseArea response={response} />
        <InputBox onSend={handleSend} />
      </Box>
    </Container>
  );
}
