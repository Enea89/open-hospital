import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { api } from "@config/api";
import { DOCTORS_PATH } from "@config/paths";
import { getPath } from "@lib/utils";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DoctorForm from "./doctorForm";

const DoctorNew: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const capitalizeName = (str: string) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const handleSave = async (data: {
    name: string;
    surname: string;
    profession: string;
    email: string;
    phoneNumber: string;
  }) => {
    setLoading(true);

    const normalizedData = {
      ...data,
      name: capitalizeName(data.name),
      surname: capitalizeName(data.surname),
      profession: capitalizeName(data.profession),
      email: data.email.toLowerCase(),
    };

    try {
      await api.doctors.createDoctor(normalizedData);
      enqueueSnackbar("Doctor created successfully!", { variant: "success" });
      navigate("/doctors");
    } catch (error: any) {
      enqueueSnackbar(`Error creating doctor: ${error.message}`, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <Breadcrumb>
          <BreadcrumbEl>
            <Link to={getPath(DOCTORS_PATH)}>Doctors</Link>
          </BreadcrumbEl>
          <BreadcrumbEl active> New</BreadcrumbEl>
        </Breadcrumb>
      </div>
      <DoctorForm onSave={handleSave} loading={loading} />
    </>
  );
};

export default DoctorNew;
