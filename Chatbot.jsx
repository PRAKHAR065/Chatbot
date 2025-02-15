import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
  Button,
  Alert,
  Collapse,
  Card,
  IconButton,
  Stack,
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";

const ChatBot = () => {
  const theme = useTheme();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");

  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]); // To hold the chat history
  const [error, setError] = useState("");
  const [listening, setListening] = useState(false);

  const loggedIn = JSON.parse(localStorage.getItem("authToken") || "false");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text.trim() === "") return;

    const newMessages = [...messages, { text, sender: "user" }];
    setMessages(newMessages);
    try {
      const { data } = await axios.post("http://localhost:8080/api/v1/openai/chatbot", { text });
      setMessages([...newMessages, { text: data, sender: "bot" }]);
      setText(""); // Clear text input after sending
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      setTimeout(() => setError(""), 5000);
    }
  };

  const handleVoiceInput = () => {
    navigator.permissions.query({ name: 'microphone' })
      .then((permissionStatus) => {
        if (permissionStatus.state === 'granted') {
          startSpeechRecognition();
        } else if (permissionStatus.state === 'denied') {
          setError("Microphone permission denied. Please enable microphone access.");
          setTimeout(() => setError(""), 5000);
        } else {
          setError("Microphone permission is in a state that requires user interaction.");
          setTimeout(() => setError(""), 5000);
        }
      })
      .catch((err) => {
        setError("Error checking microphone permissions: " + err.message);
        setTimeout(() => setError(""), 5000);
      });
  };

  const startSpeechRecognition = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
      handleSubmit(new Event("submit")); // Automatically submit after voice input
    };

    recognition.onerror = (event) => {
      setError("Voice input error: " + event.error);
      setTimeout(() => setError(""), 5000);
    };

    recognition.onend = () => setListening(false);

    recognition.start();
  };

  return (
    <>
      {!loggedIn ? (
        <Box p={10} sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h3">
            Please <Link to="/login">Log In</Link> to Continue
          </Typography>
        </Box>
      ) : (
        <Box
          width={isNotMobile ? "50%" : "80%"} // Adjusted the width here to make it larger
          p={"2rem"}
          m={"2rem auto"}
          borderRadius={5}
          sx={{ boxShadow: 5 }}
          backgroundColor={theme.palette.background.alt}
        >
          <Collapse in={error !== ""}>
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          </Collapse>

          {/* Heading Section */}
          <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
            How can I help you?
          </Typography>

          <Stack
            direction="column"
            spacing={2}
            sx={{
              maxHeight: "400px",
              overflowY: "auto",
              mb: 3,
              border: "1px solid #ddd",
              padding: "1rem",
              borderRadius: "10px",
              bgcolor: theme.palette.background.paper,
            }}
          >
            {/* Display chat messages */}
            {messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: message.sender === "user" ? "flex-end" : "flex-start",
                }}
              >
                <Card
                  sx={{
                    maxWidth: "70%",
                    p: 2,
                    bgcolor: message.sender === "user" ? "#E1F5FE" : "#FFF3E0",
                    borderRadius: "10px",
                    boxShadow: 1,
                  }}
                >
                  {/* Render markdown formatted response */}
                  {message.sender === "bot" ? (
                    <ReactMarkdown>{message.text}</ReactMarkdown>
                  ) : (
                    <Typography>{message.text}</Typography>
                  )}
                </Card>
              </Box>
            ))}
          </Stack>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              variant="outlined"
              label="Type your question..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" fullWidth>
              Send
            </Button>
          </form>

          <IconButton onClick={handleVoiceInput} sx={{ mt: 2 }}>
            {listening ? <StopIcon color="error" /> : <MicIcon />}
          </IconButton>
        </Box>
      )}
    </>
  );
};

export default ChatBot;
