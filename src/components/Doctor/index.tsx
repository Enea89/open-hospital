import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { api } from "@config/api";
import { DOCTORS_PATH } from "@config/paths";
import useGetDetail from "@hooks/useGetDetail";
import { getPath } from "@lib/utils";
import { Avatar, Box, Card, CardContent, Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import React from "react";
import { Link, useParams } from "react-router-dom";

interface Doctor {
  id?: number;
  name?: string;
  surname?: string;
  email?: string;
  phoneNumber?: string;
  avatar?: string;
  profession?: string;
}

const emptyDoctor: Doctor = {
  id: undefined,
  name: "",
  surname: "",
  email: "",
  phoneNumber: "",
  avatar: "",
  profession: "",
};

const Doctor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const doctorId = Number(id);

  const [doctor, loading] = useGetDetail(api.doctors.getDoctor, emptyDoctor, doctorId);

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(DOCTORS_PATH)}>Doctors</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>{loading ? "Loading..." : `${doctor.name} ${doctor.surname}`}</BreadcrumbEl>
      </Breadcrumb>
      <Box sx={{ px: 4, py: 2 }}>
        {/* Doctor Info Card */}
        <Card sx={{ display: "flex", mb: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
            <Avatar
              alt={`${doctor.name} ${doctor.surname}`}
              src={doctor.avatar}
              sx={{ width: 64, height: 64, mr: 2 }}
            />
            <Box>
              <Typography variant="h6">
                {doctor.name} <b>{doctor.surname}</b>
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {doctor.profession || "Professione non specificata"}
              </Typography>
            </Box>
          </Box>
        </Card>

        {/* Contact Info + Last Patients */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Contacts
                </Typography>
                <Typography variant="body2">📞 {doctor.phoneNumber || "N/A"}</Typography>
                <Typography variant="body2">📧 {doctor.email || "N/A"}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Last Visited Patients
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Enrico Costanzi" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Carlo Marchiori" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Doctor;
