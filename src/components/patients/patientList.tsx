import { PatientDTO } from "@generated/axios";
import { Box, Grid } from "@mui/material";
import React from "react";
import PatientCard from "./patientCard";

interface PatientListProps {
  patients: PatientDTO[];
}

const PatientList: React.FC<PatientListProps> = ({ patients }) => {
  return (
    <Grid container spacing={3}>
      {patients.map((patient) => (
        <Grid item key={patient.id} xs={12} sm={12} md={6} lg={6} xl={4}>
          <Box display="flex" justifyContent="center">
            <PatientCard
              name={patient.name ?? ""}
              surname={patient.surname ?? ""}
              pid={patient.id ?? ""}
              opd={patient.opd ?? ""}
              idp={patient.idp ?? ""}
            />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default PatientList;
