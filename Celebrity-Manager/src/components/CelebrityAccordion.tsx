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
  Grid,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

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
        expandIcon={isExpanded ? <RemoveIcon /> : <AddIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Box display={"flex"} alignItems={"center"} gap={2} flex={1}>
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
              size="small"
              className="form-value"
            />
          ) : (
            <Typography className="celeb-name">{celeb.fullname}</Typography>
          )}
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          {/* Age Field */}
          <Grid item xs={12} sm={6} md={3}>
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
              <Typography className="form-value">{celeb.age} Years</Typography>
            )}
          </Grid>

          {/* Gender Field */}
          <Grid item xs={12} sm={6} md={3}>
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
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="Transgender">Transgender</MenuItem>
                <MenuItem value="Rather not say">Rather not say</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            ) : (
              <Typography className="form-value capitalize">
                {celeb.gender}
              </Typography>
            )}
          </Grid>

          {/* Country Field */}
          <Grid item xs={12} sm={6} md={3}>
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
          </Grid>

          {/* Email Field */}
          <Grid item xs={12} sm={6} md={3}>
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
          </Grid>

          {/* Description Field */}
          <Grid item xs={12}>
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
              <Typography className="form-value">
                {celeb.description}
              </Typography>
            )}
          </Grid>
        </Grid>

        {/* Edit/Delete Buttons */}
        <Box display="flex" justifyContent="flex-end" mt={2}>
          {isAdult && !isEditing && (
            <IconButton
              color="primary"
              onClick={onEdit}
              aria-label="edit"
              sx={{ mr: 1 }}
            >
              <ModeEditOutlinedIcon />
            </IconButton>
          )}
          {isEditing && (
            <>
              <IconButton
                color="error"
                onClick={handleCancel}
                aria-label="cancel"
              >
                <CancelOutlinedIcon />
              </IconButton>

              <IconButton
                color="success"
                onClick={handleSave}
                disabled={!isChanged}
                aria-label="save"
                sx={{ mr: 1 }}
              >
                <CheckCircleOutlineOutlinedIcon />
              </IconButton>
            </>
          )}
          {!isEditing && (
            <IconButton
              color="error"
              onClick={handleDeleteConfirmation}
              aria-label="delete"
            >
              <DeleteOutlinedIcon />
            </IconButton>
          )}
        </Box>
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
