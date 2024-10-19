// import React, { useState } from "react";
// import { Container, Typography, Box, CircularProgress } from "@mui/material";
// import InputBox from "./InputBox";
// import ResponseArea from "./ResponseArea";
// import axios from "axios";

// export default function ChatBot() {
//   const [response, setResponse] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleSend = async (query) => {
//     console.log("Query Sent:", query);

//     setLoading(true); // Start loading
//     setError(null);
//     setResponse("");

//     try {
//       const res = await fetch(
//         "https://api.ai21.com/studio/v1/chat/completions",
//         {
//           method: "POST",
//           headers: {
//             Authorization: "Bearer 8dBTGGWPx4NzNmZmSrFRfNSRXdLvKBKp", // Replace this with your real key
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             model: "jamba-1.5-large", // The Jurassic-1 model
//             messages: [
//               {
//                 role: "user",
//                 content: query, // The user's query/message
//               },
//             ],
//             n: 1, // Number of completions to generate
//             max_tokens: 2048, // Adjust the max tokens as per your need
//             temperature: 0.4,
//             top_p: 1,
//             stop: [],
//             response_format: { type: "text" },
//           }),
//         }
//       );

//       if (res.ok) {
//         const data = await res.json();
//         console.log("Full API Response:", data); // Log the full response to inspect

//         // Extract response content from choices[0].message.content
//         if (data && data.choices && data.choices.length > 0) {
//           const messageContent = data.choices[0].message.content;

//           // Display the plain text content
//           setResponse(messageContent);

//           // Here we assume the message could also contain URLs for table or visualization
//           const resultTable = data.result_table_path || null;
//           const resultViz = data.result_visualization_path || null;

//           // Optionally, display result table or visualization if URLs exist
//           if (resultTable) {
//             setResponse(
//               (prev) =>
//                 prev +
//                 `<br /><a href="${resultTable}" target="_blank">View Table</a>`
//             );
//           }
//           if (resultViz) {
//             setResponse(
//               (prev) =>
//                 prev +
//                 `<br /><a href="${resultViz}" target="_blank">View Visualization</a>`
//             );
//           }
//         } else {
//           throw new Error("No valid response from the API.");
//         }
//       } else {
//         throw new Error("Failed to fetch response from API.");
//       }
//     } catch (error) {
//       console.error("Error fetching response:", error);
//       setError(
//         "Failed to fetch response from the API. Please check your inputs and token."
//       );
//     } finally {
//       setLoading(false); // Stop loading
//     }
//   };

//   const handleSaveResponse = (response) => {
//     // Implement save logic here (e.g., send to backend or save locally)
//     console.log("Saving response:", response);
//   };

//   return (
//     <Container
//       maxWidth="sm"
//       sx={{ backgroundColor: "#629584", minHeight: "100vh", py: 4 }}
//     >
//       <Box sx={{ backgroundColor: "#E2F1E7", borderRadius: 2, padding: 4 }}>
//         <Typography variant="h4" gutterBottom color="#243642">
//           Chatbot Interface
//         </Typography>
//         {loading && <CircularProgress />} {/* Show loading indicator */}
//         {error && <Typography color="error">{error}</Typography>}{" "}
//         {/* Show error message */}
//         <ResponseArea response={response} loading={loading} error={error} />
//         {/* <ResponseArea response={response} /> */}
//         <InputBox onSend={handleSend} />
//       </Box>
//     </Container>
//   );
// }

import React, { useState } from "react";
import { Container, Typography, Box, CircularProgress } from "@mui/material";
import InputBox from "./InputBox";
import ResponseArea from "./ResponseArea";
import axios from "axios";
import { getUserIdFromToken } from "../../Utility/authUtils";

export default function ChatBot() {
  const [responses, setResponses] = useState([]); // Array to hold multiple responses
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastQuery, setLastQuery] = useState("");
  const [savedResponses, setSavedResponses] = useState(new Set());

  // API URL for saving responses (based on environment)
  const apiUrl =
    process.env.REACT_APP_ENVIRONMENT === "DEV"
      ? process.env.REACT_APP_API_URL
      : process.env.REACT_APP_PRODUCTION_BACKEND_URL;

  // Function to handle sending the user query to the API
  const handleSend = async (query) => {
    console.log("Query Sent:", query);
    setLastQuery(query);
    setLoading(true); // Start loading
    setError(null);

    try {
      const res = await fetch(
        "https://api.ai21.com/studio/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer 8dBTGGWPx4NzNmZmSrFRfNSRXdLvKBKp", // Replace this with your real key
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "jamba-1.5-large", // Jurassic-1 model
            messages: [
              {
                role: "user",
                content: query, // User's query/message
              },
            ],
            n: 1, // Number of completions to generate
            max_tokens: 2048, // Adjust max tokens as per your need
            temperature: 0.4,
            top_p: 1,
            stop: [],
            response_format: { type: "text" },
          }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        console.log("Full API Response:", data); // Log full response for debugging

        // Extract response content from choices[0].message.content
        if (data && data.choices && data.choices.length > 0) {
          const messageContent = data.choices[0].message.content;

          // Add the response to the list of responses
          setResponses((prevResponses) => [
            ...prevResponses,
            { content: messageContent },
          ]);
        } else {
          throw new Error("No valid response from the API.");
        }
      } else {
        throw new Error("Failed to fetch response from API.");
      }
    } catch (error) {
      console.error("Error fetching response:", error);
      setError(
        "Failed to fetch response from the API. Please check your inputs and token."
      );
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleSaveResponse = async (response) => {
    const userId = getUserIdFromToken(); // Get the user ID from the token

    if (!userId) {
      setError("User is not authenticated.");
      return;
    }

    console.log("User Id -> ", userId);

    const saveData = {
      summary: response.summary || lastQuery || "Summary not available",
      result_text: response.content,
      result_table_path: response.result_table_path || "",
      result_visualization_path: response.result_visualization_path || "",
      error: response.error || null,
    };

    console.log("SaveData -> ", saveData);

    try {
      const res = await axios.post(
        `${apiUrl}/responses/${userId}/add-response`,
        saveData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Send the token in the headers
          },
        }
      );
      if (res.status === 200) {
        console.log("Response saved successfully.");
        setSavedResponses((prev) => new Set(prev).add(response.content));
      } else {
        throw new Error("Failed to save the response.");
      }
    } catch (err) {
      console.error("Error saving response:", err);
      setError("Failed to save the response. Please try again.");
    }
  };

  return (
    <Container
      className="chat-container"
      sx={{
        backgroundColor: "#629584", // Background color of the container
        minHeight: "100vh", // Full viewport height
        display: "flex",
        justifyContent: "center", // Center the chat container horizontally
        alignItems: "center", // Center the chat container vertically
        py: 4, // Padding on top and bottom
      }}
    >
      <Box
        sx={{
          backgroundColor: "#E2F1E7", // Background color of the chat interface
          borderRadius: 2, // Rounded corners for the chat box
          padding: 4, // Padding inside the chat box
          width: { xs: "100%", sm: "80%", md: "60%" }, // Responsive width
          boxShadow: 3, // Slight shadow to give it a raised effect
        }}
      >
        <Typography variant="h4" gutterBottom color="#243642">
          Chatbot Interface
        </Typography>
        {loading && <CircularProgress />} {/* Show loading indicator */}
        {error && <Typography color="error">{error}</Typography>}{" "}
        {/* Show error message */}
        {/* ResponseArea to display chatbot responses */}
        <ResponseArea
          responses={responses}
          loading={loading}
          error={error}
          onSave={handleSaveResponse} // Save function passed down to ResponseArea
          savedResponses={savedResponses}
        />
        {/* InputBox component for user query */}
        <InputBox onSend={handleSend} />
      </Box>
    </Container>
  );
}
