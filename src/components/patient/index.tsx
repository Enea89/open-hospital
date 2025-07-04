import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import PatientDetail from "@components/patient/patientDetail";
import { api } from "@config/api";
import { PATIENTS_PATH } from "@config/paths";
import { PatientDTO } from "@generated/axios";
import { useGetDetail } from "@hooks/useGetDetail";
import { getPath } from "@lib/utils";
import React from "react";
import { Link, useParams } from "react-router-dom";

const StaffMember: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const patientId = Number(id);

  const emptyPatient: PatientDTO = {
    id: 0,
    name: "",
    surname: "",
    address: "",
  };

  const [patient, loading, refetch] = useGetDetail(api.patients.getPatient, emptyPatient, patientId);

  if (loading) return <div>Loading patient details...</div>;
  if (!patient || patient.id === 0) return <div>Errore nel caricamento del paziente</div>;

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(PATIENTS_PATH)}>Patients</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>
          {patient.name} {patient.surname}
        </BreadcrumbEl>
      </Breadcrumb>

      <PatientDetail patient={patient} />

      <button onClick={refetch}>Ricarica dati paziente</button>
    </div>
  );
};

export default StaffMember;
