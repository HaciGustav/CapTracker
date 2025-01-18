import React, { useState } from "react";
import useAICalls from "@/hooks/useAICalls";
import { Typography, Box, TextField, Button } from "@mui/material";

const AIComponent = () => {
  const { getAIResponse } = useAICalls();
  const [prompt, setPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");

  const handlePromptSubmit = async () => {
    try {
      const response = await getAIResponse(prompt);
      setAiResponse(response?.choices[0]?.message?.content); // Assuming the response is structured accordingly
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" color="error" mb={2} 
        sx={{
          fontWeight: "bold",
          textTransform: "uppercase"
        }}>
        Brands
      </Typography>

      <TextField
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt"
        multiline
      >
      </TextField>
      <br/>
      <Button
        variant="contained"
        onClick={handlePromptSubmit}
      >
        Ask AI
      </Button>
      <div>
        <h3>AI Response:</h3>
        <p>{aiResponse}</p>
      </div>
    </Box>
  );
};

export default AIComponent;