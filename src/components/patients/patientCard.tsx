import { DetailType } from "@lib/types"; // correggi percorso
import { generateAvatarImage } from "@lib/utils"; // correggi percorso
import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";

interface PatientCardProps {
  firstName: string;
  lastName: string;
  pid: string | number;
  opd: string | number;
  idp: string | number;
}

const PatientCard: React.FC<PatientCardProps> = ({ firstName, lastName, pid, opd, idp }) => {
  const avatarSrc = typeof pid === "number" ? generateAvatarImage(DetailType.PATIENT, pid) : "";

  return (
    <Card
      sx={{
        maxWidth: 600,
        width: "100%",
        p: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: "bold", textAlign: "center" }}>
          {firstName} {lastName}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1,
            mb: 3,
            fontSize: "0.9rem",
            color: "text.secondary",
          }}
        >
          <Typography>
            PID: <b>{pid}</b>
          </Typography>
          <Typography>|</Typography>
          <Typography>
            OPD: <b>{opd}</b>
          </Typography>
          <Typography>|</Typography>
          <Typography>
            IDP: <b>{idp}</b>
          </Typography>
        </Box>
      </CardContent>

      <Box display="flex" justifyContent="center" mt={2}>
        <Avatar
          src={avatarSrc}
          sx={{
            bgcolor: "primary.main",
            width: 96,
            height: 96,
          }}
        >
          {firstName.charAt(0)}
        </Avatar>
      </Box>
    </Card>
  );
};

export default PatientCard;
