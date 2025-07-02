import Billing from "@components/Billing";
import Doctor from "@components/Doctor";
import DoctorNew from "@components/Doctor/doctorNew";
import Doctors from "@components/Doctors";
import Home from "@components/Home";
import News from "@components/News";
import Patient from "@components/Patient";
import Patients from "@components/Patients";
import Pharmacy from "@components/Pharmacy";
import Ward from "@components/Ward";
import {
  BILLING_PATH,
  DASHBOARD_PATH,
  DOCTORS_PATH,
  HOME_PATH,
  NEWS_PATH,
  PATIENTS_PATH,
  PHARMACY_PATH,
  WARD_PATH,
} from "@config/paths";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={HOME_PATH}>
        <Route index element={<Navigate to={DASHBOARD_PATH} />} />
        <Route path={DASHBOARD_PATH} element={<Home />} />
        <Route path={PATIENTS_PATH}>
          <Route index element={<Patients />} />
          <Route path=":id" element={<Patient />} />

          {/*<Route path="new" element={<PatientNew />} />
          <Route path=":id/edit" element={<PatientEdit />} />
          <Route path={`:id/${PATIENTS_RECORDS_PATH}/new`} element={<PatientRecordNew />} /> */}
        </Route>
        <Route path={DOCTORS_PATH}>
          <Route index element={<Doctors />} />
          <Route path=":id" element={<Doctor />} />
          {/* <Route path=":id/edit" element={<DoctorEdit />}*/}
          <Route path="new" element={<DoctorNew />} />
        </Route>
        <Route path={PHARMACY_PATH} element={<Pharmacy />} />
        <Route path={WARD_PATH} element={<Ward />} />
        <Route path={BILLING_PATH} element={<Billing />} />
        <Route path={NEWS_PATH} element={<News />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
