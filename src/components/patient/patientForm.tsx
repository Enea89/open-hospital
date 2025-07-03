import SaveIcon from "@mui/icons-material/Save";
import { Box, Button, FormControlLabel, Grid, MenuItem, Paper, Switch, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

interface PatientFormProps {
  title?: string;
  loading?: boolean;
  initialValues?: {
    name: string;
    surname: string;
    address: string;
    opd: number | string;
    idp: number | string;
    bloodGroup: string;
    isChronicPatient: boolean;
    notes: string;
  };
  onSave?: (data: {
    name: string;
    surname: string;
    address: string;
    opd: string;
    idp: string;
    bloodGroup: string;
    isChronicPatient: boolean;
    notes: string;
  }) => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ title = "NEW PATIENT", loading, initialValues, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    address: "",
    opd: "",
    idp: "",
    bloodGroup: "",
    isChronicPatient: false,
    notes: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    surname: false,
    address: false,
    opd: false,
    idp: false,
    bloodGroup: false,
  });

  useEffect(() => {
    if (initialValues) {
      setFormData({
        name: initialValues.name || "",
        surname: initialValues.surname || "",
        address: initialValues.address || "",
        opd: String(initialValues.opd ?? ""),
        idp: String(initialValues.idp ?? ""),
        bloodGroup: initialValues.bloodGroup || "",
        isChronicPatient: initialValues.isChronicPatient ?? false,
        notes: initialValues.notes || "",
      });
    }
  }, [initialValues]);

  const capitalize = (str: string) => (str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "");

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    let value: string | boolean = event.target.value;
    if (field === "name" || field === "surname") {
      value = capitalize(value);
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field in errors) {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      isChronicPatient: event.target.checked,
    }));
  };

  const validate = () => {
    let valid = true;
    const newErrors = {
      name: false,
      surname: false,
      address: false,
      opd: false,
      idp: false,
      bloodGroup: false,
    };

    if (!formData.name.trim()) {
      newErrors.name = true;
      valid = false;
    }
    if (!formData.surname.trim()) {
      newErrors.surname = true;
      valid = false;
    }
    if (!formData.address.trim()) {
      newErrors.address = true;
      valid = false;
    }
    if (!formData.opd.trim()) {
      newErrors.opd = true;
      valid = false;
    }
    if (!formData.idp.trim()) {
      newErrors.idp = true;
      valid = false;
    }
    if (!formData.bloodGroup.trim()) {
      newErrors.bloodGroup = true;
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSave = () => {
    if (!validate()) return;
    if (onSave) onSave(formData);
    else console.log("Saving default:", formData);
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

  const bloodGroups = ["APlus", "BPlus", "AMinus", "BMinus", "AbPlus", "AbMinus", "ZeroPlus", "ZeroMinus"];

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
              label="Address"
              value={formData.address}
              onChange={handleChange("address")}
              error={errors.address}
              helperText={errors.address ? "Address is required" : ""}
              required
              sx={inputSx}
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="OPD"
              value={formData.opd}
              onChange={handleChange("opd")}
              error={errors.opd}
              helperText={errors.opd ? "OPD is required" : ""}
              required
              sx={inputSx}
              size="small"
              type="number"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="IDP"
              value={formData.idp}
              onChange={handleChange("idp")}
              error={errors.idp}
              helperText={errors.idp ? "IDP is required" : ""}
              required
              sx={inputSx}
              size="small"
              type="number"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              select
              fullWidth
              label="Blood Group"
              value={formData.bloodGroup}
              onChange={handleChange("bloodGroup")}
              error={errors.bloodGroup}
              helperText={errors.bloodGroup ? "Blood group is required" : ""}
              required
              sx={inputSx}
              size="small"
            >
              {bloodGroups.map((group) => (
                <MenuItem key={group} value={group}>
                  {group}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={<Switch checked={formData.isChronicPatient} onChange={handleToggle} color="primary" />}
              label="Chronic Patient"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={5}
              label="Notes"
              value={formData.notes}
              onChange={handleChange("notes")}
              sx={inputSx}
              placeholder="Enter relevant patient notes here..."
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
            {loading ? "Saving..." : "Save"}
          </Button>
          <Button variant="outlined" onClick={() => window.history.back()} sx={{ minWidth: 60, height: 36 }}>
            Back
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default PatientForm;
