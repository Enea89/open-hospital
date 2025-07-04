import { PatientDTO, PatientDTOBloodGroupEnum } from "@generated/axios";
import { getBloodType } from "@lib/utils";
import SaveIcon from "@mui/icons-material/Save";
import { Box, Button, FormControlLabel, Grid, MenuItem, Paper, Switch, TextField, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";

type FormData = {
  name: string;
  surname: string;
  address: string;
  opd: number | "";
  idp: number | "";
  bloodGroup: PatientDTOBloodGroupEnum | "";
  isChronicPatient: boolean;
  notes: string;
};

type Errors = Record<keyof Omit<FormData, "isChronicPatient" | "notes">, boolean>;

interface Props {
  title?: string;
  loading?: boolean;
  initialValues?: Partial<PatientDTO>;
  onSave: (data: Omit<PatientDTO, "pid">) => void;
}

const PatientForm: React.FC<Props> = ({ title = "NEW PATIENT", loading, initialValues, onSave }) => {
  const [form, setForm] = useState<FormData>({
    name: "",
    surname: "",
    address: "",
    opd: "",
    idp: "",
    bloodGroup: "",
    isChronicPatient: false,
    notes: "",
  });
  const [errors, setErrors] = useState<Errors>({
    name: false,
    surname: false,
    address: false,
    opd: false,
    idp: false,
    bloodGroup: false,
  });

  useEffect(() => {
    if (!initialValues) return;
    setForm({
      name: initialValues.name ?? "",
      surname: initialValues.surname ?? "",
      address: initialValues.address ?? "",
      opd: initialValues.opd ?? "",
      idp: initialValues.idp ?? "",
      bloodGroup: initialValues.bloodGroup ?? "",
      isChronicPatient: initialValues.chronicPatient ?? false,
      notes: initialValues.notes ?? "",
    });
  }, [initialValues]);

  const capitalize = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "");

  const handleChange = useCallback(
    <K extends keyof FormData>(field: K) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        let val: any;
        if (field === "isChronicPatient") {
          val = e.target.checked;
        } else if (field === "opd" || field === "idp") {
          val = e.target.value === "" ? "" : Number(e.target.value);
        } else if (field === "name" || field === "surname") {
          val = capitalize(e.target.value);
        } else {
          val = e.target.value;
        }
        setForm((prev) => ({ ...prev, [field]: val }));
        if (field in errors) {
          setErrors((prev) => ({ ...prev, [field]: false }));
        }
      },
    [errors]
  );

  const validate = () => {
    const newErr: Errors = {
      name: !form.name.trim(),
      surname: !form.surname.trim(),
      address: !form.address.trim(),
      opd: form.opd === "" || form.opd === null || isNaN(Number(form.opd)),
      idp: form.idp === "" || form.idp === null || isNaN(Number(form.idp)),
      bloodGroup: form.bloodGroup === "",
    };
    setErrors(newErr);
    return !Object.values(newErr).some((v) => v);
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave({
      name: form.name,
      surname: form.surname,
      address: form.address,
      opd: Number(form.opd),
      idp: Number(form.idp),
      bloodGroup: form.bloodGroup as PatientDTOBloodGroupEnum,
      chronicPatient: form.isChronicPatient,
      notes: form.notes,
    });
  };

  const inputSx = {
    "& .MuiInputBase-input": { py: "6px", fontSize: "0.875rem" },
    "& .MuiInputLabel-root": { fontSize: "0.9rem" },
  };

  const bloodGroups = Object.values(PatientDTOBloodGroupEnum);

  const fieldLabels: Record<keyof Errors, string> = {
    name: "Name",
    surname: "Surname",
    address: "Address",
    opd: "OPD",
    idp: "IDP",
    bloodGroup: "Blood Group",
  };

  return (
    <Box maxWidth={900} mx="auto" px={2}>
      <Typography variant="h6" mb={2} textAlign="left">
        {title}
      </Typography>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Grid container spacing={2} mb={2}>
          {(["name", "surname", "address"] as const).map((field) => (
            <Grid item xs={12} sm={4} key={field}>
              <TextField
                fullWidth
                label={fieldLabels[field]}
                value={form[field]}
                onChange={handleChange(field)}
                error={errors[field]}
                helperText={errors[field] ? `${fieldLabels[field]} is required` : ""}
                required
                size="small"
                sx={inputSx}
              />
            </Grid>
          ))}
          {(["opd", "idp"] as const).map((field) => (
            <Grid item xs={12} sm={4} key={field}>
              <TextField
                type="number"
                fullWidth
                label={field.toUpperCase()}
                value={form[field]}
                onChange={handleChange(field)}
                error={errors[field]}
                helperText={errors[field] ? `${fieldLabels[field]} is required` : ""}
                required
                size="small"
                sx={inputSx}
              />
            </Grid>
          ))}
          <Grid item xs={12} sm={4}>
            <TextField
              select
              fullWidth
              label="Blood Group"
              value={form.bloodGroup}
              onChange={handleChange("bloodGroup")}
              error={errors.bloodGroup}
              helperText={errors.bloodGroup ? "Required" : ""}
              required
              size="small"
              sx={inputSx}
            >
              {bloodGroups.map((bg) => (
                <MenuItem key={bg} value={bg}>
                  {getBloodType(bg as PatientDTOBloodGroupEnum)}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Switch checked={form.isChronicPatient} onChange={handleChange("isChronicPatient")} />}
              label="Chronic Patient"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Notes"
              multiline
              rows={3}
              fullWidth
              value={form.notes}
              onChange={handleChange("notes")}
              size="small"
              sx={inputSx}
            />
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="flex-end">
          <Button variant="contained" onClick={handleSave} disabled={loading} startIcon={<SaveIcon />}>
            Save
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default PatientForm;
