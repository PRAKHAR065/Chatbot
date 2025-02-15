import { Routes, Route } from "react-router-dom";
import { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";
import { themeSettings } from "./theme";
import Navbar from "./components/navbar.jsx";
import Homepage from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login";
import ChatBot from "./pages/Chatbot.jsx";
import Footer from "./components/footer.jsx";


function App() {
  const theme = useMemo(() => createTheme(themeSettings()), []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Toaster />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chatbot" element={<ChatBot />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;
