import React, { useState, useEffect } from "react";
import { Celebrity } from "./types";
import jsonData from "../src/data/celebrities.json";
import CelebrityAccordion from "./components/CelebrityAccordion";
import { Container, TextField, Typography } from "@mui/material";

const calculateAge = (dob: string): number => {
  const birthDate = new Date(dob);
  const difference = Date.now() - birthDate.getTime();
  const ageDate = new Date(difference);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const App: React.FC = () => {
  const transformedData: Celebrity[] = jsonData.map((celeb) => ({
    ...celeb,
    fullname: `${celeb.first} ${celeb.last}`,
    age: calculateAge(celeb.dob),
  }));

  const [celebrities, setCelebrities] = useState<Celebrity[]>(transformedData);
  const [filteredCelebs, setFilteredCelebs] = useState<Celebrity[]>(transformedData); 
  const [search, setSearch] = useState<string>("");
  const [currentlyOpenId, setCurrentlyOpenId] = useState<number | null>(null); 
  const [editingId, setEditingId] = useState<number | null>(null); 

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const searchQuery = search.toLowerCase();
    const filtered = celebrities.filter((celeb) =>
      celeb.fullname.toLowerCase().includes(searchQuery)
    );
    setFilteredCelebs(filtered);
  }, [search, celebrities]); 

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const updatedCelebrities = celebrities.filter((celeb) => celeb.id !== id);
      setCelebrities(updatedCelebrities);
      setFilteredCelebs(updatedCelebrities); 
    }
  };

  const handleAccordionToggle = (id: number) => {
    if (editingId === null) {
      setCurrentlyOpenId(currentlyOpenId === id ? null : id);
    }
  };

  const handleEdit = (id: number) => {
    setEditingId(id); // Set the editing ID to enable edit mode for the selected celebrity
    setCurrentlyOpenId(id); // Ensure the accordion is open when editing
  };

  const handleSave = (updatedCelebrity: Celebrity) => {
    const updatedCelebrities = celebrities.map((celeb) =>
      celeb.id === updatedCelebrity.id ? updatedCelebrity : celeb
    );
    setCelebrities(updatedCelebrities);
    setFilteredCelebs(updatedCelebrities);
    setEditingId(null); 
  };

  const handleCancel = () => {
    setEditingId(null); 
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
          isExpanded={currentlyOpenId === celeb.id} 
          onToggle={() => handleAccordionToggle(celeb.id)} 
          onDelete={() => handleDelete(celeb.id)}
          onSave={handleSave}
          onCancel={handleCancel}
          onEdit={() => handleEdit(celeb.id)} // Trigger edit mode
          isEditing={editingId === celeb.id} 
          isAdult={celeb.age >= 18} 
        />
      ))}
    </Container>
  );
};

export default App;
