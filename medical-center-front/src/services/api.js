import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333",
});

export const createSecretarySession = async (email, password) => {
  return api.post("/authenticate/secretary", { email, password });
};

export const createDoctorSession = async (email, password) => {
  return api.post("/authenticate/doctor", { email, password });
};

export const getDoctors = async () => {
  return api.get("/secretary/doctors");
};

export const getSecretaryAppointments = async () => {
  return api.get("/secretary/appointments");
};

export const createDoctor = async (name, email) => {
  return api.post("/doctors", { name, email });
};

export const secretaryCreateAppointment = async (
  patientName,
  doctorId,
  date
) => {
  console.log(doctorId);
  return api.post("/secretary/appointment", { doctorId, patientName, date });
};

export const editDoctor = async (id, name) => {
  return api.put("/secretary/doctors", { id, name });
};

export const deleteDoctor = async (id) => {
  console.log(id);
  return api.delete(`/secretary/doctor/${id}`);
};

export const secretaryEditAppointment = async (date, patientName, id) => {
  console.log(patientName, id);
  if (date === 0) {
    return api.put("/secretary/appointment", { patientName, id });
  }
  return api.put("/secretary/appointment", { date, patientName, id });
};

export const secretaryDeleteAppointment = async (id) => {
  console.log(id);
  return api.delete(`/secretary/appointment/${id}`);
};

export const getDoctorAppointments = async () => {
  return api.get("/doctor/appointments");
};

export const doctorCreateAppointment = async (id, patientName, date) => {
  console.log(id, patientName, date);
  if (date === 0) {
    return api.post("doctor/appointment", { id, patientName });
  } else {
    return api.post("doctor/appointment", { id, patientName, date });
  }
};

export const doctorEditAppointment = async (date, patientName, id) => {
  console.log("entrou aqui", patientName, id);
  if (date === 0) {
    return api.put("/doctor/appointment", { patientName, id });
  }
  return api.put("/doctor/appointment", { date, patientName, id });
};

export const doctorDeleteAppointment = async (id) => {
  console.log(id);
  return api.delete(`/doctor/appointment/${id}`);
};
