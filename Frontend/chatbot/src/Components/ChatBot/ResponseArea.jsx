// import React from "react";
// import { Typography, Box, CircularProgress } from "@mui/material";

// export default function ResponseArea({ response, loading, error }) {
//   console.log(
//     "This is the response received in Response Area component -> ",
//     response
//   );
//   if (!response) return null;
//   if (loading) return <CircularProgress />; // Show a loading spinner
//   if (error) return <Typography color="error">{error}</Typography>;

//   return (
//     <Box
//       sx={{ mt: 4, backgroundColor: "#E2F1E7", borderRadius: 2, padding: 2 }}
//     >
//       <Typography variant="h6" color="#243642">
//         Summary:
//       </Typography>
//       <Typography>{response.summary}</Typography>

//       <Typography variant="h6" sx={{ mt: 2 }} color="#243642">
//         Result Text:
//       </Typography>
//       <Typography>{response.result_text}</Typography>

//       {response.result_table_path && (
//         <Box sx={{ mt: 2 }}>
//           <Typography variant="h6" color="#243642">
//             Result Table:
//           </Typography>
//           <iframe
//             src={response.result_table_path}
//             title="Result Table"
//             width="100%"
//             height="200"
//             style={{ border: "none" }} // Optional styling
//           />
//         </Box>
//       )}

//       {response.result_visualization_path && (
//         <Box sx={{ mt: 2 }}>
//           <Typography variant="h6" color="#243642">
//             Result Visualization:
//           </Typography>
//           <iframe
//             src={response.result_visualization_path}
//             title="Result Visualization"
//             width="100%"
//             height="200"
//             style={{ border: "none" }} // Optional styling
//           />
//         </Box>
//       )}

//       {response.error && (
//         <Typography color="error" sx={{ mt: 2 }}>
//           {response.error}
//         </Typography>
//       )}
//     </Box>
//   );
// }
import React from "react";
import { Typography, Box, CircularProgress, Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

export default function ResponseArea({
  responses,
  loading,
  error,
  onSave,
  savedResponses,
}) {
  if (loading) return <CircularProgress />; // Show loading spinner
  if (error) return <Typography color="error">{error}</Typography>;
  if (!responses || responses.length === 0) return null;

  return (
    <Box sx={{ mt: 4 }}>
      {responses.map((response, index) => (
        <Box
          key={index}
          sx={{
            backgroundColor: "#E2F1E7",
            borderRadius: 2,
            padding: 2,
            mb: 2,
            boxShadow: 1,
          }}
        >
          <Typography variant="h6" color="#243642">
            Response {index + 1}:
          </Typography>
          <Typography sx={{ whiteSpace: "pre-wrap", mt: 1, color: "#243642" }}>
            {response.content}
          </Typography>

          {/* Save button for each response */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#243642", // Change this to your desired color
              color: "#ffffff", // Text color
              "&:hover": {
                backgroundColor: "#387478", // Darker shade for hover effect
              },
            }}
            onClick={() => onSave(response)}
          >
            {savedResponses.has(response.content) ? (
              <>
                <CheckIcon sx={{ mr: 1 }} /> {/* Icon with margin */}
                Saved
              </>
            ) : (
              "Save Response"
            )}
          </Button>
        </Box>
      ))}
    </Box>
  );
}
