import { PatientDTO } from "@generated/axios";
import { getBloodType } from "@lib/utils";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Box, Button, Card, CardContent, Divider, Grid, IconButton, Typography } from "@mui/material";
import React from "react";

interface PatientDetailProps {
  patient: PatientDTO;
  onDelete?: () => void;
  onEditClick?: () => void;
}

const PatientDetail: React.FC<PatientDetailProps> = ({ patient, onDelete, onEditClick }) => {
  const getInitials = (name?: string, surname?: string) => {
    const n = name?.[0] || "";
    const s = surname?.[0] || "";
    return (n + s).toUpperCase();
  };

  return (
    <>
      {/* Header */}
      <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Grid item>
          <Typography variant="h6" fontWeight="bold">
            PATIENT DETAILS
          </Typography>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={onDelete}>
            DELETE
          </Button>
        </Grid>
      </Grid>

      {/* Contenitore con due card: prima larga 80%, seconda 20% sotto a sinistra */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {/* Card dettagli principali - larghezza 100% */}
        <Card
          sx={{
            maxWidth: "100%",
            borderRadius: "8px 8px 0 0",
            mb: 0, // nessun margine sotto
          }}
        >
          <CardContent sx={{ display: "flex", alignItems: "center", gap: 2, py: 2 }}>
            <Avatar sx={{ width: 64, height: 64 }}>{getInitials(patient.name, patient.surname)}</Avatar>

            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" component="div" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {patient.name}{" "}
                <Typography component="span" fontWeight="bold">
                  {patient.surname}
                </Typography>
                <IconButton size="small" onClick={onEditClick} aria-label="edit" sx={{ ml: 1 }}>
                  <EditIcon fontSize="small" sx={{ color: "red" }} />
                </IconButton>
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {patient.address || "Indirizzo non disponibile"}
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Seconda card: larghezza 20%, attaccata a sinistra */}
        <Card
          sx={{
            bgcolor: "grey.900",
            color: "white",
            borderRadius: "0 0 8px 8px",
            px: 2,
            py: 1.5,
            width: "20%",
            mt: 0,
          }}
          elevation={0}
        >
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            HEALTH INFORMATION
          </Typography>
          <Divider sx={{ bgcolor: "grey.700", mb: 1 }} />

          <Typography variant="body2" fontWeight="bold">
            PATIENT ID
          </Typography>
          <Typography variant="body2" mb={1}>
            {patient.id ?? "N/A"}
          </Typography>

          <Typography variant="body2" fontWeight="bold">
            OPD
          </Typography>
          <Typography variant="body2" mb={1}>
            {patient.opd ?? "N/A"}
          </Typography>

          <Typography variant="body2" fontWeight="bold">
            BLOOD GROUP
          </Typography>
          <Typography variant="body2" mb={1}>
            {patient.bloodGroup ? getBloodType(patient.bloodGroup) : "N/A"}
          </Typography>

          <Divider sx={{ bgcolor: "grey.700", mb: 1 }} />

          {/* Nuova sezione Notes */}
          <Typography variant="body2" fontWeight="bold" mb={0.5}>
            Notes
          </Typography>

          <Typography variant="body2" mb={1}>
            {patient.notes && patient.notes.trim() !== "" ? patient.notes : "No notes available"}
          </Typography>

          <Divider sx={{ bgcolor: "grey.700", mb: 1 }} />

          <Typography variant="body2" mb={1}>
            CHRONIC PATIENT: {patient.chronicPatient ? "YES" : "NO"}
          </Typography>
        </Card>
      </Box>
    </>
  );
};

export default PatientDetail;
