import { useState, useEffect } from "react";
import axios from "axios";

// Custom Hook to fetch users and their saved responses
const useFetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users/users-with-responses", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the token for authorization
          },
        });
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load user data");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading, error };
};

export default useFetchUsers;
