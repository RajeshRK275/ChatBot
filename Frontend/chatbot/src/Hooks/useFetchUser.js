import { useState, useEffect } from "react";

// Custom Hook to fetch users and their saved responses
const useFetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Mock API call
        const mockUserData = [
          {
            id: 1,
            username: "user1",
            savedResponses: [
              {
                query: "What is AI?",
                response: "AI is artificial intelligence.",
              },
              {
                query: "Define machine learning.",
                response: "Machine learning is a subset of AI.",
              },
            ],
          },
          {
            id: 2,
            username: "user2",
            savedResponses: [
              {
                query: "What is React?",
                response:
                  "React is a JavaScript library for building user interfaces.",
              },
            ],
          },
        ];

        setUsers(mockUserData); // Simulate API response
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
