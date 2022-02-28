import React, { useContext, useEffect } from "react";
import { useState } from "react";
import AppointmentsTable from "../../components/AppointmentsTable";
import DoctorsList from "../../components/DoctorsList";
import FormAddDoctor from "../../components/FormAddDoctor";
import FormEditDoctor from "../../components/FormEditDoctor";
import FormSecretaryCreateAppointment from "../../components/FormSecretaryCreateAppointment";
import FormSecretaryEditAppointment from "../../components/FormSecretaryEditAppointment";
import Header from "../../components/Header";

import { AuthContext } from "../../contexts/auth";

import { 
  getDoctors, 
  getSecretaryAppointments, 
  createDoctor, 
  secretaryCreateAppointment,
  editDoctor,
  deleteDoctor,
  secretaryEditAppointment,
  secretaryDeleteAppointment
} from "../../services/api";

const HomePage = () => {
    const { authenticated, logout, user } = useContext(AuthContext)
    const [doctors, setDoctors] = useState([])
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    const [doctorToCreateName, setDoctorToCreateName] = useState('');
    const [doctorToCreateEmail, setDoctorToCreateEmail] = useState('');

    const [appointmentPatient, setAppointmentPatient] = useState('');
    const [appointmentDoctor, setAppointmentDoctor] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');

    const [doctorToChange, setDoctorToChange] = useState(null);
    const [showDoctorToChangeFields, setShowDoctorToChangeFields] = useState(false);
    const [doctorNewName, setDoctorNewName] = useState(null);

    const [showAppointmentToChangeFields, setShowAppointmentToChangeFields] = useState(false);
    const [appointmentToChange, setAppointmentToChange] = useState(null);
    const [appointmentToChangeDate, setAppointmentToChangeDate] = useState(null);
    const [appointmentsForDate, setAppointmentsForDate] = useState(null);
    const [appointmentNewPatient, setAppointmentNewPatient] = useState('');
    const [appointmentNewDate, setAppointmentNewDate] = useState('');

    useEffect(() => {
        console.log(user, appointments);
        if(user.userType === 2){
            (async () => {
                const allDoctors = await getDoctors();
                setDoctors(allDoctors.data.doctors);

                const allAppointments =  await getSecretaryAppointments();
                console.log(allAppointments.data, allDoctors.data)
                setAppointments(allAppointments.data);
                
                setLoading(false);
            })();
        }
    }, [])

    useEffect(() => {
      if(doctorToChange !== null) {
        setShowDoctorToChangeFields(true)
        setDoctorNewName(doctors.find((doctor) => doctor.id == doctorToChange).name)
      }else{
      setShowDoctorToChangeFields(false)
      setDoctorNewName('Digite o novo nome do doutor')
      }
    }, [doctorToChange])


    useEffect(() => {
    if(appointmentToChangeDate !== null) {
      setAppointmentsForDate(appointments.filter(appointment => appointmentToChangeDate === appointment.date));
    }
    }, [appointmentToChangeDate])
    
    useEffect(() => {
    if(appointmentToChange !== null) {
      setShowAppointmentToChangeFields(true);
      setAppointmentNewPatient(appointments.find((ap) => ap.id == appointmentToChange).patientName)

    }else {
      setShowAppointmentToChangeFields(false);
      setAppointmentNewPatient('Digite o novo nome do paciente')
      setAppointmentNewDate('')
    }

    }, [appointmentToChange])

    const handleCreateDoctor = async (e) => {
        console.log('oi')
        e.preventDefault();

        await createDoctor(doctorToCreateName, doctorToCreateEmail)
        const allDoctors = await getDoctors();
        await setDoctors(allDoctors.data.doctors);
        await setDoctorToCreateName('');
        await setDoctorToCreateEmail('')
    }

    const handleCreateAppointment = async (e) => {
      e.preventDefault();
      var date = new Date(appointmentDate); 

      // console.log(appointmentPatient, appointmentDoctor, date.toISOString())

      await secretaryCreateAppointment(appointmentPatient, appointmentDoctor, date.toISOString())
      const allAppointments =  await getSecretaryAppointments();
      await setAppointments(allAppointments.data);
      await setAppointmentPatient('');
      await setAppointmentDoctor(null);
      await setAppointmentDate('');
    }

    const handleEditDoctor = async (e) => {
      e.preventDefault();

      await editDoctor(parseInt(doctorToChange), doctorNewName)
      const allDoctors = await getDoctors();
      setDoctors(allDoctors.data.doctors);
      await setShowDoctorToChangeFields(false)
      await setDoctorToChange(null)
    }
  
    const handleDeleteDoctor = async (e) => {
      e.preventDefault();

      console.log(doctorToChange);
      await deleteDoctor(doctorToChange);

      const allDoctors = await getDoctors();
      setDoctors(allDoctors.data.doctors);

      const allAppointments =  await getSecretaryAppointments();
      setAppointments(allAppointments.data);

      await setDoctorToChange(null)
      await setShowDoctorToChangeFields(false);
    }

    const handleEditAppointment = async (e) => {
      e.preventDefault();
      var date = new Date(appointmentNewDate);

      if(!appointmentNewDate) {
        await secretaryEditAppointment(
          0, 
          appointmentNewPatient, 
          parseInt(appointmentToChange)
        )
      } else {
        await secretaryEditAppointment(
          date, 
          appointmentNewPatient, 
          parseInt(appointmentToChange)
        )
      }

      const allAppointments =  await getSecretaryAppointments();
      await setAppointments(allAppointments.data);
      const allDoctors = await getDoctors();
      await setDoctors(allDoctors.data.doctors);
      await setAppointmentToChangeDate(null)
      await setAppointmentsForDate(null)
      await setAppointmentToChange(null)
    }

    const handleSecretaryDeleteAppointment = async (e) => {
      e.preventDefault();

      console.log(appointmentToChange)
      await secretaryDeleteAppointment(appointmentToChange);

      const allAppointments =  await getSecretaryAppointments();
      setAppointments(allAppointments.data);

      await setAppointmentToChange(null)
      await setShowAppointmentToChangeFields(false);
    }

    if(loading) {
        <div className="loading">Carregando dados</div>
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
          <div className="flex w-full flex-1 flex-col items-center justify-center text-center">
            <Header />
            <div className="bg-white flex w-full">
              <FormAddDoctor 
                setDoctorToCreateName={setDoctorToCreateName} 
                setDoctorToCreateEmail={setDoctorToCreateEmail} 
                doctorToCreateName={doctorToCreateName} 
                doctorToCreateEmail={doctorToCreateEmail}
                handleCreateDoctor={handleCreateDoctor}
              />
              <FormSecretaryCreateAppointment
                setAppointmentDoctor={setAppointmentDoctor}
                setAppointmentPatient={setAppointmentPatient}
                setAppointmentDate={setAppointmentDate}
                doctors={doctors}
                appointmentDoctor={appointmentDoctor}
                appointmentPatient={appointmentPatient}
                appointmentDate={appointmentDate}
                handleCreateAppointment={handleCreateAppointment}
              />     
            </div>

            <div className="flex w-full flex-1 flex-col items-center justify-center text-center">
              <div className="bg-white flex w-full">
                <FormEditDoctor 
                  setDoctorToChange={setDoctorToChange}
                  doctorToChange={doctorToChange}
                  doctors={doctors}
                  showDoctorToChangeFields={showDoctorToChangeFields}
                  handleEditDoctor={handleEditDoctor}
                  doctorNewName={doctorNewName}
                  setDoctorNewName={setDoctorNewName}
                  handleDeleteDoctor={handleDeleteDoctor}
                />
                <FormSecretaryEditAppointment 
                  appointments={appointments}
                  appointmentToChange={appointmentToChange}
                  appointmentToChangeDate={appointmentToChangeDate}
                  appointmentsForDate={appointmentsForDate}
                  setAppointmentToChange={setAppointmentToChange}
                  setAppointmentToChangeDate={setAppointmentToChangeDate}
                  handleEditAppointment={handleEditAppointment}
                  appointmentNewPatient={appointmentNewPatient}
                  setAppointmentNewPatient={setAppointmentNewPatient}
                  setAppointmentNewDate={setAppointmentNewDate}
                  handleSecretaryDeleteAppointment={handleSecretaryDeleteAppointment}
                />
              </div>
            </div>

            <div className="flex w-full flex-1 flex-col items-center justify-center text-center">
              <div className="bg-white flex w-full">
                  <DoctorsList doctors={doctors}></DoctorsList>
                  <AppointmentsTable doctors={doctors} appointments={appointments} />
              </div>
            </div>
          </div>
        </div>
    )
}

export default HomePage;