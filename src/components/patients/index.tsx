import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { Action, patientsFilterReducer } from "@components/patients/lib";
import PatientList from "@components/patients/patientList";
import { api } from "@config/api";
import { PatientDTO, PatientFilterDTO } from "@generated/axios";
import useGetList from "@hooks/useGetList";
import { Button, Grid, Typography } from "@mui/material";
import React, { Dispatch, useMemo, useReducer } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import aggiunto

interface IPatientsFilterContext {
  filter: PatientFilterDTO;
  dispatch: Dispatch<Action>;
}

export const PatientsFilterContext = React.createContext<IPatientsFilterContext>({
  filter: {},
  dispatch: (_action: Action) => {},
});

const Patients: React.FC = () => {
  const navigate = useNavigate();

  const handleAddPatient = () => {
    navigate("/patients/new");
  };

  const [filter, dispatch] = useReducer(patientsFilterReducer, {});
  const patientContextValue = useMemo(() => ({ filter, dispatch }), [filter, dispatch]);

  const [patients, loading] = useGetList<PatientDTO, PatientFilterDTO>(api.patients.getListPatient, filter);

  return (
    <PatientsFilterContext.Provider value={patientContextValue}>
      <Breadcrumb>
        <BreadcrumbEl active>Patients</BreadcrumbEl>
      </Breadcrumb>

      <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
        <Grid item>
          <Typography variant="h5" fontWeight="bold">
            PATIENTS DATABASE
          </Typography>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="primary" onClick={handleAddPatient}>
            + ADD NEW PATIENT
          </Button>
        </Grid>
      </Grid>

      {loading ? <p>Loading...</p> : <PatientList patients={patients} />}
    </PatientsFilterContext.Provider>
  );
};

export default Patients;
