import React, { useState, ChangeEvent } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Typography,
  TextField,
  MenuItem,
  Button
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove"; // For "-"
import AddIcon from "@mui/icons-material/Add"; // For "+"

interface Celebrity {
  id: number;
  first: string;
  last: string;
  dob: string;
  gender: string;
  email: string;
  picture: string;
  country: string;
  description: string;
}

interface CelebrityAccordionProps {
  celeb: Celebrity;
  isExpanded: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onSave: (updatedCelebrity: Celebrity) => void;
  onCancel: () => void;
  isEditing: boolean;
  isAdult: boolean;
}

const CelebrityAccordion: React.FC<CelebrityAccordionProps> = ({
  celeb,
  isExpanded,
  onToggle,
  onDelete,
  onSave,
  onCancel,
  isEditing,
  isAdult
}) => {
  const [editedCelebrity, setEditedCelebrity] = useState<Celebrity>(celeb);
  const [isChanged, setIsChanged] = useState(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedCelebrity((prev) => ({
      ...prev,
      [name]: value
    }));
    setIsChanged(true);
  };

  const handleGenderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedCelebrity((prev) => ({
      ...prev,
      gender: e.target.value
    }));
    setIsChanged(true);
  };

  const handleSave = () => {
    onSave(editedCelebrity);
    setIsChanged(false);
  };

  const handleCancel = () => {
    setEditedCelebrity(celeb);
    setIsChanged(false);
    onCancel();
  };

  return (
    <Accordion expanded={isExpanded} onChange={onToggle}>
      <AccordionSummary
        expandIcon={
          <IconButton>
            {isExpanded ? <RemoveIcon /> : <AddIcon />}{" "}
            {/* Show + or - icon based on state */}
          </IconButton>
        }
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>
          {celeb.first} {celeb.last}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {isEditing ? (
          <>
            <TextField
              label="First Name"
              name="first"
              value={editedCelebrity.first}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Last Name"
              name="last"
              value={editedCelebrity.last}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              value={editedCelebrity.email}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Country"
              name="country"
              value={editedCelebrity.country}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Description"
              name="description"
              value={editedCelebrity.description}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              multiline
              rows={4}
            />
            <TextField
              select
              label="Gender"
              name="gender"
              value={editedCelebrity.gender}
              onChange={handleGenderChange}
              fullWidth
              margin="normal"
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Transgender">Transgender</MenuItem>
              <MenuItem value="Rather not say">Rather not say</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={!isChanged}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCancel}
              sx={{ marginLeft: 1 }}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h6">Email: {celeb.email}</Typography>
            <Typography variant="body1">Country: {celeb.country}</Typography>
            <Typography variant="body1">
              Description: {celeb.description}
            </Typography>
            <img
              src={celeb.picture}
              alt={`${celeb.first} ${celeb.last}`}
              style={{ width: "100px", height: "100px" }}
            />
            <IconButton onClick={onDelete} color="secondary">
              Delete
            </IconButton>
            {isAdult && !isEditing && (
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setEditedCelebrity(celeb)}
                sx={{ marginLeft: 1 }}
              >
                Edit
              </Button>
            )}
          </>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default CelebrityAccordion;
