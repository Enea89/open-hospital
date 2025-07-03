import { DetailType } from "@lib/types";
import { generateAvatarImage } from "@lib/utils";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import { Avatar, Box, Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

interface Doctor {
  id?: number;
  name?: string;
  surname?: string;
  email?: string;
  phoneNumber?: string;
  avatar?: string;
  profession?: string;
}

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const navigate = useNavigate();
  const avatarUrl = generateAvatarImage(DetailType.DOCTOR, doctor.id);

  const handleNavigate = () => {
    if (doctor.id) {
      navigate(`/doctors/${doctor.id}`);
    }
  };

  return (
    <Card sx={{ width: 280, borderRadius: 2 }}>
      <CardContent>
        <Stack alignItems="center" spacing={1}>
          <Avatar
            alt={`${doctor.name} ${doctor.surname}`}
            src={avatarUrl || "/default-avatar.png"}
            sx={{ width: 80, height: 80, cursor: "pointer" }}
            onClick={handleNavigate}
          />
          <Typography variant="h6" textAlign="center" sx={{ cursor: "pointer" }} onClick={handleNavigate}>
            {doctor.name}{" "}
            <Box component="span" fontWeight="bold">
              {doctor.surname}
            </Box>
          </Typography>
          <Typography color="text.secondary" textAlign="center" variant="body2" sx={{ mb: 1 }}>
            {doctor.profession}
          </Typography>
          <Typography color="error.light" textAlign="center" sx={{ fontWeight: "bold" }} variant="body2">
            <PhoneIcon sx={{ verticalAlign: "bottom" }} fontSize="small" /> {doctor.phoneNumber}
          </Typography>
          <Typography color="error.light" textAlign="center" sx={{ fontWeight: "bold" }} variant="body2">
            <MailOutlineIcon sx={{ verticalAlign: "bottom" }} fontSize="small" /> {doctor.email}
          </Typography>
        </Stack>

        <Divider sx={{ my: 2 }} />
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
