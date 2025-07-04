import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { api } from "@config/api";
import { DOCTORS_PATH } from "@config/paths";
import useGetDetail from "@hooks/useGetDetail";
import { DetailType } from "@lib/types";
import { generateAvatarImage, getEditDetailPath, getPath } from "@lib/utils";
import EditIcon from "@mui/icons-material/Edit";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import { Avatar, Box, Card, CardContent, Divider, IconButton, Typography } from "@mui/material";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleEditClick = () => {
    if (!id) {
      console.error("ID mancante");
      return;
    }
    const path = getEditDetailPath("doctors", id);
    navigate(path);
  };

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
          maxWidth: 1400,
          transform: "translateX(-35px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
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
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="h5">
                {doctor.name} <b>{doctor.surname}</b>
              </Typography>
              <IconButton color="error" onClick={handleEditClick} aria-label="edit details">
                <EditIcon />
              </IconButton>
            </Box>
            <Typography variant="subtitle1" color="text.secondary">
              {doctor.profession || "Professione non specificata"}
            </Typography>
          </Box>
        </Card>

        {/* Contact Info Card */}
        <Card
          sx={{
            backgroundColor: "#333",
            color: "#fff",
            width: "20%",
            minHeight: 225,
            mt: 0,
            alignSelf: "flex-start",
            p: 2,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ color: "#fff" }}>
              Contacts
            </Typography>
            <Divider sx={{ bgcolor: "white", mb: 2 }} />
            <Typography variant="body2">
              <PhoneIcon sx={{ color: "red", verticalAlign: "bottom", mr: 1 }} fontSize="small" />{" "}
              {doctor.phoneNumber || "N/A"}
            </Typography>
            <Typography variant="body2" mb={2} mt={1}>
              <MailOutlineIcon sx={{ color: "red", verticalAlign: "bottom", mr: 1 }} fontSize="small" />{" "}
              {doctor.email || "N/A"}
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
