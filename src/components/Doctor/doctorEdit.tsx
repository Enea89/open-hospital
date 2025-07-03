import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { api } from "@config/api";
import { DOCTORS_PATH } from "@config/paths";
import useGetDetail from "@hooks/useGetDetail";
import { getPath } from "@lib/utils";
import { useSnackbar } from "notistack";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DoctorForm from "./doctorForm";

const DoctorEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const initialDoctor = {
    name: "",
    surname: "",
    profession: "",
    email: "",
    phoneNumber: "",
  };

  const [doctor, loading, refresh] = useGetDetail(api.doctors.getDoctor, initialDoctor, Number(id));

  const handleSave = async (data: typeof initialDoctor) => {
    try {
      await api.doctors.updateDoctor(Number(id), data);
      enqueueSnackbar("Doctor updated successfully!", { variant: "success" });
      navigate(getPath(DOCTORS_PATH));
    } catch (error: any) {
      enqueueSnackbar(`Error updating doctor: ${error.message}`, { variant: "error" });
    }
  };

  return (
    <>
      <div>
        <Breadcrumb>
          <BreadcrumbEl>
            <Link to={getPath(DOCTORS_PATH)}>Doctors</Link>
          </BreadcrumbEl>
          <BreadcrumbEl active> Edit</BreadcrumbEl>
        </Breadcrumb>
      </div>

      <DoctorForm
        title="EDIT DOCTOR"
        loading={loading}
        initialValues={{
          name: doctor.name || "",
          surname: doctor.surname || "",
          profession: doctor.profession || "",
          email: doctor.email || "",
          phoneNumber: doctor.phoneNumber || "",
        }}
        onSave={handleSave}
      />
    </>
  );
};

export default DoctorEdit;
