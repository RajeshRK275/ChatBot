import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export default function UserTable({ users }) {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Query</TableCell>
            <TableCell>Response</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) =>
            user.savedResponses.map((response, index) => (
              <TableRow key={`${user.id}-${index}`}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{response.query}</TableCell>
                <TableCell>{response.response}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}
