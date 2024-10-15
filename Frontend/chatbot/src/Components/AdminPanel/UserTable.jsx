import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

export default function UserTable({ users }) {
  return (
    <Paper
      sx={{
        width: "100%",
        overflowX: "auto",
        borderRadius: 2,
        boxShadow: 2,
        backgroundColor: "#E2F1E7", // Component background
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#387478" }}>
            {" "}
            {/* Header Background */}
            <TableCell
              sx={{
                color: "#E2F1E7", // Text color for the header
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              Username
            </TableCell>
            <TableCell
              sx={{
                color: "#E2F1E7",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              Query
            </TableCell>
            <TableCell
              sx={{
                color: "#E2F1E7",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              Response
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) =>
            user.savedResponses.length > 0 ? (
              user.savedResponses.map((response, index) => (
                <TableRow
                  key={`${user._id}-${index}`}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#F1F8F5" : "#E2F1E7", // Alternating row colors
                    "&:hover": {
                      backgroundColor: "#D5EDE1", // Row hover effect
                    },
                  }}
                >
                  <TableCell>
                    <Typography color="text.primary">
                      {user.username}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="text.secondary">
                      {response.summary}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="text.secondary">
                      {response.result_text}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow key={user._id}>
                <TableCell colSpan={3}>
                  <Typography color="text.secondary">
                    {user.username} has no saved responses.
                  </Typography>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}
