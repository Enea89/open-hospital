import { Button, Grid, Typography } from "@mui/material";
import React, { useMemo, useReducer } from "react";
import { useNavigate } from "react-router-dom";

import { getListDoctor } from "../../config/api";
import { DoctorFilterDTO } from "../../generated/axios";
import useGetList from "../../hooks/useGetList";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import BreadcrumbEl from "../Breadcrumb/BreadcrumbEl";
import DoctorFilterForm from "./doctorFilterForm";
import DoctorList from "./doctorList";
import { Action, doctorsFilterReducer } from "./lib";

interface IDoctorsFilterContext {
  filter: DoctorFilterDTO;
  dispatch: React.Dispatch<Action>;
}

export const DoctorsFilterContext = React.createContext<IDoctorsFilterContext>({
  filter: {} as DoctorFilterDTO,
  dispatch: () => {},
});

const Doctors: React.FC = () => {
  const [filter, dispatch] = useReducer(doctorsFilterReducer, {} as DoctorFilterDTO);
  const doctorsContextValue = useMemo(() => ({ filter, dispatch }), [filter, dispatch]);

  const [doctors, loading, reload] = useGetList(getListDoctor, filter);

  const navigate = useNavigate();

  const handleNewDoctorClick = () => {
    navigate("/doctors/new");
  };

  return (
    <DoctorsFilterContext.Provider value={doctorsContextValue}>
      <Breadcrumb>
        <BreadcrumbEl active>Doctors</BreadcrumbEl>
      </Breadcrumb>

      <Grid container alignItems="center" justifyContent="space-between" mb={2}>
        <Grid item>
          <Typography variant="h6" fontWeight="bold">
            DOCTORS DATABASE
          </Typography>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="primary" onClick={handleNewDoctorClick}>
            + Add New Doctor
          </Button>
        </Grid>
      </Grid>

      <DoctorFilterForm />

      {loading ? <p>Loading...</p> : <DoctorList doctors={doctors} />}
    </DoctorsFilterContext.Provider>
  );
};

export default Doctors;
