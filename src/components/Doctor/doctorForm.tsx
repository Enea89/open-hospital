import SaveIcon from "@mui/icons-material/Save";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
interface DoctorFormProps {
  title?: string;
  loading?: boolean;
  initialValues?: {
    name: string;
    surname: string;
    profession: string;
    email: string;
    phoneNumber: string;
  };
  onSave?: (data: { name: string; surname: string; profession: string; email: string; phoneNumber: string }) => void;
}

const DoctorForm: React.FC<DoctorFormProps> = ({ title = "New Doctor", loading, initialValues, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    profession: "",
    email: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    surname: false,
    profession: false,
    email: false,
    phoneNumber: false,
  });

  useEffect(() => {
    if (initialValues) {
      setFormData(initialValues);
    }
  }, [initialValues]);

  const capitalize = (str: string) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;

    if (field === "name" || field === "surname" || field === "profession") {
      value = capitalize(value);
    } else if (field === "email") {
      value = value.toLowerCase();
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: false }));
  };

  const validate = () => {
    let valid = true;
    const newErrors = {
      name: false,
      surname: false,
      profession: false,
      email: false,
      phoneNumber: false,
    };

    if (!formData.name.trim()) {
      newErrors.name = true;
      valid = false;
    }
    if (!formData.surname.trim()) {
      newErrors.surname = true;
      valid = false;
    }
    if (!formData.profession.trim()) {
      newErrors.profession = true;
      valid = false;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = true;
      valid = false;
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = true;
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSave = () => {
    if (!validate()) return;

    if (onSave) {
      onSave(formData);
    } else {
      console.log("Salvataggio dati (default):", formData);
    }
  };

  const inputSx = {
    "& .MuiInputBase-input": {
      paddingTop: "6px",
      paddingBottom: "6px",
      fontSize: "0.875rem",
    },
    "& .MuiInputLabel-root": {
      fontSize: "0.9rem",
    },
  };

  return (
    <Box maxWidth={900} mx="auto" px={2}>
      <Typography variant="h6" mb={2} textAlign="left">
        {title}
      </Typography>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Name"
              value={formData.name}
              onChange={handleChange("name")}
              error={errors.name}
              helperText={errors.name ? "Name is required" : ""}
              required
              sx={inputSx}
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Surname"
              value={formData.surname}
              onChange={handleChange("surname")}
              error={errors.surname}
              helperText={errors.surname ? "Surname is required" : ""}
              required
              sx={inputSx}
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Profession"
              value={formData.profession}
              onChange={handleChange("profession")}
              error={errors.profession}
              helperText={errors.profession ? "Profession is required" : ""}
              required
              sx={inputSx}
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange("email")}
              error={errors.email}
              helperText={errors.email ? "Valid email is required" : ""}
              required
              sx={inputSx}
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Phone number"
              value={formData.phoneNumber}
              onChange={handleChange("phoneNumber")}
              error={errors.phoneNumber}
              helperText={errors.phoneNumber ? "Phone number is required" : ""}
              required
              sx={inputSx}
              size="small"
            />
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="flex-start" gap={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={loading}
            sx={{ minWidth: 60, height: 36 }}
            endIcon={!loading ? <SaveIcon /> : undefined}
          >
            {loading ? "Saving..." : "Save "}
          </Button>
          <Button variant="outlined" onClick={() => window.history.back()} sx={{ minWidth: 60, height: 36 }}>
            Back
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default DoctorForm;
