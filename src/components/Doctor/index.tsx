import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { api } from "@config/api";
import { DOCTORS_PATH } from "@config/paths";
import useGetDetail from "@hooks/useGetDetail";
import { DetailType } from "@lib/types";
import { generateAvatarImage, getPath } from "@lib/utils";
import { Avatar, Box, Card, CardContent, Divider, Typography } from "@mui/material";
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

  const avatarUrl = generateAvatarImage(DetailType.DOCTOR, doctor.id);

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(DOCTORS_PATH)}>Doctors</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>{loading ? "Loading..." : `${doctor.name} ${doctor.surname}`}</BreadcrumbEl>
      </Breadcrumb>

      <Box
        sx={{
          px: 4,
          py: 2,
          maxWidth: 900,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Doctor Info Card - larga */}
        <Card
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            p: 2,
            mb: 0,
          }}
        >
          <Avatar
            alt={`${doctor.name} ${doctor.surname}`}
            src={avatarUrl || doctor.avatar || "/default-avatar.png"}
            sx={{ width: 80, height: 80, mr: 3 }}
          />
          <Box>
            <Typography variant="h5">
              {doctor.name} <b>{doctor.surname}</b>
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {doctor.profession || "Professione non specificata"}
            </Typography>
          </Box>
        </Card>

        {/* Contact Info Card - molto più stretta e attaccata */}
        <Card
          sx={{
            backgroundColor: "#333",
            color: "#fff",
            width: "25%", // circa metà rispetto al 50% precedente
            minHeight: 180,
            mt: 0, // attaccata alla card sopra, senza margine
            alignSelf: "flex-start",
            p: 2,
            borderTopLeftRadius: 0, // per sembrare attaccata, togli il bordo sopra a sx
            borderTopRightRadius: 0, // stesso per destra
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ color: "#fff" }}>
              Contacts
            </Typography>
            <Divider sx={{ bgcolor: "white", mb: 2 }} />
            <Typography variant="body2">📞 {doctor.phoneNumber || "N/A"}</Typography>
            <Typography variant="body2" mb={2}>
              📧 {doctor.email || "N/A"}
            </Typography>

            <Typography variant="subtitle1" sx={{ mt: 3, color: "#fff", fontWeight: "bold" }}>
              LAST VISITED PATIENTS
            </Typography>
            <Divider sx={{ bgcolor: "white", mt: 1 }} />
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default Doctor;
