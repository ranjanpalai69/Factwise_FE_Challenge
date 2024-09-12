import React, { useState, useEffect } from "react";
import { Celebrity } from "./types";
import jsonData from "../src/data/celebrities.json";
import CelebrityAccordion from "./components/CelebrityAccordion";
import { Container, TextField, Typography, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

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
  const [filteredCelebs, setFilteredCelebs] =
    useState<Celebrity[]>(transformedData);
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
    const updatedCelebrities = celebrities.filter((celeb) => celeb.id !== id);
    setCelebrities(updatedCelebrities);
    setFilteredCelebs(updatedCelebrities);
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
    <Container sx={{ my: 1, py: 2 }}>
      <Typography variant="h4" gutterBottom>
        Celebrity Manager
      </Typography>
      <TextField
        label="Search Celebrity"
        variant="outlined"
        fullWidth
        value={search}
        onChange={handleSearchChange}
        sx={{
          marginBottom: 2,
          borderRadius: 2, // Border radius for the search bar
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            "& fieldset": {
              borderColor: "grey.400", // Border color
            },
            "&:hover fieldset": {
              borderColor: "primary.main", // Border color on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "primary.main", // Border color when focused
            },
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
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
