import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { PATIENTS_PATH } from "@config/paths";
import { getPath } from "@lib/utils";
import { Link } from "react-router-dom";
import PatientForm from "./patientForm";

const patientNew: React.FC = () => {
  return (
    <>
      <div>
        <Breadcrumb>
          <BreadcrumbEl>
            <Link to={getPath(PATIENTS_PATH)}>Patients</Link>
          </BreadcrumbEl>
          <BreadcrumbEl active> New</BreadcrumbEl>
        </Breadcrumb>
      </div>
      <PatientForm />
    </>
  );
};

export default patientNew;
