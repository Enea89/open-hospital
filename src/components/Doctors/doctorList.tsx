import { Grid } from "@mui/material";
import React from "react";
import DoctorCard from "./doctorCard";

interface Doctor {
  id?: number;
  name?: string;
  surname?: string;
  email?: string;
  phoneNumber?: string;
  avatar?: string;
  profession?: string;
}

interface DoctorListProps {
  doctors: Doctor[];
}

const DoctorList: React.FC<DoctorListProps> = ({ doctors }) => {
  return (
    <Grid container spacing={2}>
      {doctors.map((doctor) => (
        <Grid item key={doctor.id} xs={12} sm={6} md={4} lg={3}>
          <DoctorCard doctor={doctor} />
        </Grid>
      ))}
    </Grid>
  );
};

export default DoctorList;
