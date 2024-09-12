import React, { useState, ChangeEvent } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Typography,
  TextField,
  MenuItem,
  Button,
  Box,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

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
  fullname: string;
  age: number;
}

interface CelebrityAccordionProps {
  celeb: Celebrity;
  isExpanded: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onSave: (updatedCelebrity: Celebrity) => void;
  onCancel: () => void;
  onEdit: () => void;
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
  onEdit,
  isEditing,
  isAdult,
}) => {
  const [editedCelebrity, setEditedCelebrity] = useState<Celebrity>(celeb);
  const [isChanged, setIsChanged] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "age" && isNaN(Number(value))) return; // Prevent text in age field
    if (name === "country" && /[^a-zA-Z\s]/.test(value)) return; // Prevent numbers in country field

    setEditedCelebrity((prev) => ({
      ...prev,
      [name]: value,
    }));
    setIsChanged(true);
  };

  const handleGenderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedCelebrity((prev) => ({
      ...prev,
      gender: e.target.value,
    }));
    setIsChanged(true);
  };

  const handleSave = () => {
    if (
      !editedCelebrity.fullname.trim() ||
      !editedCelebrity.country.trim() ||
      !editedCelebrity.description.trim() ||
      !editedCelebrity.email.trim()
    ) {
      alert("All fields must be filled out.");
      return;
    }
    onSave(editedCelebrity);
    setIsChanged(false);
  };

  const handleCancel = () => {
    setEditedCelebrity(celeb);
    setIsChanged(false);
    onCancel();
  };

  const handleDeleteConfirmation = () => {
    setDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    onDelete();
    setDeleteDialogOpen(false);
  };

  return (
    <Accordion
      expanded={isExpanded}
      onChange={onToggle}
      className="accordion-container"
      sx={{ my: 2 }}
    >
      <AccordionSummary
        expandIcon={
          <IconButton>{isExpanded ? <RemoveIcon /> : <AddIcon />} </IconButton>
        }
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <Avatar
            alt="Celebrity_image"
            src={celeb.picture}
            sx={{ width: 50, height: 50 }}
          />
          {isEditing ? (
            <TextField
              name="fullname"
              value={editedCelebrity.fullname}
              onChange={handleInputChange}
              fullWidth
              size="small"
              className="form-value"
            />
          ) : (
            <Typography className="celeb-name">{celeb.fullname}</Typography>
          )}
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box display="flex" flexDirection="row" flexWrap="wrap" gap={1}>
          <Box flex={1}>
            <Typography className="form-label">Age</Typography>
            {isEditing ? (
              <TextField
              size="small"
                name="age"
                value={editedCelebrity.age}
                onChange={handleInputChange}
                fullWidth
                type="number"
                className="form-value"
              />
            ) : (
              <Typography className="form-value">{celeb.age}</Typography>
            )}
          </Box>
          <Box flex={1}>
            <Typography className="form-label">Gender</Typography>
            {isEditing ? (
              <TextField
              size="small"
                select
                name="gender"
                value={editedCelebrity.gender}
                onChange={handleGenderChange}
                fullWidth
                className="form-value"
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Transgender">Transgender</MenuItem>
                <MenuItem value="Rather not say">Rather not say</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            ) : (
              <Typography className="form-value">{celeb.gender}</Typography>
            )}
          </Box>
          <Box flex={1}>
            <Typography className="form-label">Country</Typography>
            {isEditing ? (
              <TextField
                name="country"
                value={editedCelebrity.country}
                onChange={handleInputChange}
                fullWidth
                size="small"
                className="form-value"
              />
            ) : (
              <Typography className="form-value">{celeb.country}</Typography>
            )}
          </Box>
          <Box flex={1}>
            <Typography className="form-label">Email</Typography>
            {isEditing ? (
              <TextField
                name="email"
                value={editedCelebrity.email}
                onChange={handleInputChange}
                fullWidth
                size="small"
                className="form-value"
              />
            ) : (
              <Typography className="form-value">{celeb.email}</Typography>
            )}
          </Box>
        </Box>

        <Box my={2}>
          <Typography className="form-label">Description</Typography>
          {isEditing ? (
            <TextField
              name="description"
              value={editedCelebrity.description}
              onChange={handleInputChange}
              fullWidth
              size="small"
              multiline
              rows={4}
              className="form-value"
            />
          ) : (
            <Typography className="form-value">{celeb.description}</Typography>
          )}
        </Box>

        {isAdult && !isEditing && (
          <Button
            variant="contained"
            color="primary"
            onClick={onEdit}
            sx={{ mt: 2 }}
          >
            Edit
          </Button>
        )}
        {isEditing && (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={!isChanged}
              sx={{ mt: 2 }}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleCancel}
              sx={{ mt: 2, ml: 2 }}
            >
              Cancel
            </Button>
          </>
        )}
        <Button
          variant="outlined"
          color="error"
          onClick={handleDeleteConfirmation}
          sx={{ mt: 2, ml: 2 }}
        >
          Delete
        </Button>
      </AccordionDetails>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this celebrity?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            No
          </Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Accordion>
  );
};

export default CelebrityAccordion;
