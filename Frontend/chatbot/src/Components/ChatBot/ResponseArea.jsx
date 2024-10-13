import React from "react";
import { Typography, Box } from "@mui/material";

export default function ResponseArea({ response }) {
  if (!response) return null;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">Summary:</Typography>
      <Typography>{response.summary}</Typography>

      <Typography variant="h6" sx={{ mt: 2 }}>
        Result Text:
      </Typography>
      <Typography>{response.result_text}</Typography>

      {response.result_table_path && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Result Table:</Typography>
          <iframe
            src={response.result_table_path}
            title="Result Table"
            width="100%"
            height="200"
          />
        </Box>
      )}

      {response.result_visualization_path && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Result Visualization:</Typography>
          <iframe
            src={response.result_visualization_path}
            title="Result Visualization"
            width="100%"
            height="200"
          />
        </Box>
      )}

      {response.error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {response.error}
        </Typography>
      )}
    </Box>
  );
}
