import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { api } from "@config/api";
import { PATIENTS_PATH } from "@config/paths";
import { PatientDTO } from "@generated/axios";
import { getPath } from "@lib/utils";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PatientForm from "./patientForm";

type PatientCreateDTO = Omit<PatientDTO, "pid">;

const PatientNew: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSave = async (patient: PatientCreateDTO) => {
    setLoading(true);
    try {
      const res = await api.patients.createPatient(patient as unknown as PatientDTO);

      enqueueSnackbar("Patient created successfully!", {
        variant: "success",
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
        autoHideDuration: 3000,
      });

      navigate(getPath(PATIENTS_PATH));
    } catch (err: any) {
      enqueueSnackbar("Error creating patient: " + (err.message ?? "Unknown error"), {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(PATIENTS_PATH)}>Patients</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>New</BreadcrumbEl>
      </Breadcrumb>

      <PatientForm loading={loading} onSave={handleSave} />
    </>
  );
};

export default PatientNew;
