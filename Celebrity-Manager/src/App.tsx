import React, { useState, useEffect } from "react";
import { Celebrity } from "./types";
import jsonData from "../src/data/celebrities.json";
import CelebrityAccordion from "./components/CelebrityAccordion";
import { Container, TextField, Typography } from "@mui/material";

const App: React.FC = () => {
  const [celebrities, setCelebrities] = useState<Celebrity[]>(jsonData);
  const [filteredCelebs, setFilteredCelebs] = useState<Celebrity[]>(jsonData); // Initialize with all data
  const [search, setSearch] = useState<string>("");
  const [currentlyOpenId, setCurrentlyOpenId] = useState<number | null>(null); // Track the currently open accordion
  const [editingId, setEditingId] = useState<number | null>(null); // Track the currently editing celebrity

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const searchQuery = search.toLowerCase();
    const filtered = celebrities.filter(
      (celeb) =>
        celeb.first.toLowerCase().includes(searchQuery) ||
        celeb.last.toLowerCase().includes(searchQuery)
    );
    setFilteredCelebs(filtered);
  }, [search, celebrities]); // Dependency on search and celebrities

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const updatedCelebrities = celebrities.filter((celeb) => celeb.id !== id);
      setCelebrities(updatedCelebrities);
      setFilteredCelebs(updatedCelebrities); // Update filtered list after deletion
    }
  };

  const handleAccordionToggle = (id: number) => {
    if (editingId === null) {
      setCurrentlyOpenId(currentlyOpenId === id ? null : id); // Toggle if the same id is clicked, otherwise set the clicked one as open
    }
  };

  const handleSave = (updatedCelebrity: Celebrity) => {
    const updatedCelebrities = celebrities.map((celeb) =>
      celeb.id === updatedCelebrity.id ? updatedCelebrity : celeb
    );
    setCelebrities(updatedCelebrities);
    setFilteredCelebs(updatedCelebrities);
    setEditingId(null); // Exit edit mode
  };

  const handleCancel = () => {
    setEditingId(null); // Exit edit mode
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Celebrity Manager
      </Typography>
      <TextField
        label="Search Celebrity"
        variant="outlined"
        fullWidth
        value={search}
        onChange={handleSearchChange}
        sx={{ marginBottom: 2 }}
      />
      {filteredCelebs.map((celeb) => (
        <CelebrityAccordion
          key={celeb.id}
          celeb={celeb}
          isExpanded={currentlyOpenId === celeb.id} // Determine if this accordion is expanded
          onToggle={() => handleAccordionToggle(celeb.id)} // Toggle the accordion
          onDelete={() => handleDelete(celeb.id)}
          onSave={handleSave}
          onCancel={handleCancel}
          isEditing={editingId === celeb.id} // Determine if this accordion is in edit mode
          isAdult={
            new Date().getFullYear() - new Date(celeb.dob).getFullYear() >= 18
          } // Check if the celebrity is an adult
        />
      ))}
    </Container>
  );
};

export default App;
