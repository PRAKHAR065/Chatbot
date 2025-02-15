import React from "react";
import { Box, Typography, Card, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ChatRounded from "@mui/icons-material/ChatRounded";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: 3 }}>
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <Typography variant="h4" mb={2} fontWeight="bold">
        Chatbot
        </Typography>
        <Card
          onClick={() => navigate("/chatbot")}
          sx={{
            boxShadow: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 5,
            height: 250,
            width: 250,
            "&:hover": {
              border: 2,
              boxShadow: 0,
              borderColor: "primary.dark",
              cursor: "pointer",
            },
          }}
        >
          <ChatRounded sx={{ fontSize: 80, color: "primary.main", mt: 2 }} />
          <Stack p={3} pt={0} mt={2} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography fontWeight="bold" variant="h5">
              Chatbot
            </Typography>
            <Typography variant="h6">Chat with chatbot</Typography>
          </Stack>
        </Card>
      </Box>
    </Box>
  );
};

export default Homepage;
