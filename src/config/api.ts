import { Configuration, DoctorApiApi, PatientApiApi, PatientRecordApiApi } from "@generated/axios";
import axios from "axios";

export function getListDoctor(page: number, size: number, sort: string, filter: any) {
  return api.doctors.getListDoctor(page, size, sort, filter);
}

/**
 * Api endpoint
 */

// Service worker basepath API
export const basePathSW = `/msw`;

/**
 * Axis setup
 */

axios.defaults.withCredentials = false;

// API always served by ENV configuration
const configuration = new Configuration({ basePath: `${process.env.WEB_SERVER}` });

function bindMethods<T extends object>(klass: T): T {
  Object.getOwnPropertyNames(klass.constructor.prototype).forEach((method) => {
    if (method !== "constructor") {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      klass[method] = klass[method].bind(klass);
    }
  });
  return klass;
}

export const api = {
  doctors: bindMethods(new DoctorApiApi(configuration)),
  patients: bindMethods(new PatientApiApi(configuration)),
  patientRecords: bindMethods(new PatientRecordApiApi(configuration)),
};
