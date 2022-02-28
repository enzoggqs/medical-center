import React, { useContext, useEffect } from "react";
import { useState } from "react";
import AppointmentsTable from "../../components/AppointmentsTable";
import DoctorsList from "../../components/DoctorsList";
import FormAddDoctor from "../../components/FormAddDoctor";
import FormEditDoctor from "../../components/FormEditDoctor";
import FormSecretaryCreateAppointment from "../../components/FormSecretaryCreateAppointment";
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
                <div className="w-1/2 bg-red-400 text-white py-5 px-28">
                  <div className="py-5">
                    <div className="py-5">
                      <h2 className="text-3xl font-bold text-white mb-2">Editar/Excluir Consulta</h2>
                      <div className="border-2 w-20 border-white inline-block"></div>
                    </div>
                  </div>
                  <h2 className="text-lg font-bold text-white mb-4">Selecione a consulta que deseja modificar ou excluir</h2>
                  <h2 className="text-lg font-bold text-white mb-4 pt-4">Data</h2>
                  <div className="bg-gray-100 p-2 rounded-full border-2 flex items-center mb-4 mx-auto 2xl:w-1/2 md:w-64 mx-auto">
                    <select
                      name="appointmentDate" 
                      placeholder="Nome do Doutor" 
                      className="pl-2 bg-gray-100 outline-none flex-1 text-black"
                      onChange={e => setAppointmentToChangeDate(e.target.value)}
                      required
                      value={appointmentToChangeDate ? appointmentToChangeDate : "DEFAULT"}
                    >
                      <option value="DEFAULT" disabled>Selecione a data da consulta</option>
                      {
                          appointments.map((appointment) => (
                            <option key={appointment.id} value={appointment.date}>{appointment.date.slice(0, 10).split("-").reverse().join("-").replace(/-/g, "/")}</option>
                          ))
                      }
                    </select>
                  </div>
                  {
                    appointmentsForDate && (
                      <div>
                      <h2 className="text-lg font-bold text-white mb-4">Paciente</h2>
                        <div className="rounded-full border-2 bg-gray-100 p-2 flex items-center mb-8 2xl:w-1/2 md:w-64 mx-auto">
                          <select
                            name="doctorName" 
                            placeholder="Nome do Doutor" 
                            className="pl-2 bg-gray-100 outline-none flex-1 text-black"
                            onChange={e => setAppointmentToChange(e.target.value)}
                            required
                            value={appointmentToChange ? appointmentToChange : "DEFAULT"}            
                          >
                            <option value="DEFAULT" disabled>Selecione o paciente</option>
                            {
                                appointmentsForDate.map((appointment) => (
                                  <option key={appointment.id} value={appointment.id}>{appointment.patientName}</option>
                                ))
                            }
                          </select>
                        </div>
                      </div>
                    )
                  }
                  {
                    appointmentToChange && (
                      <form className="mx-auto 2xl:w-1/2 md:w-64" onSubmit={handleEditAppointment}>
                        <h2 className="text-lg font-bold text-white mb-4">Novo nome do paciente</h2>
                        <div className="border-2 rounded-full bg-gray-100 p-2 flex items-center mb-5">
                          <input 
                            name="newPatientName" 
                            placeholder="Novo nome do paciente" 
                            className="pl-2 bg-gray-100 outline-none flex-1 text-black"
                            value={appointmentNewPatient}
                            onChange={e => setAppointmentNewPatient(e.target.value)} 
                            required         
                          ></input>
                        </div>
                        <h2 className="text-lg font-bold text-white mb-4">Nova data da consulta</h2>
                        <div className="rounded-full border-2 bg-gray-100 p-2 flex items-center mb-5">
                          <input
                            type="date"
                            name="newAppointmentDate" 
                            className="pl-2 bg-gray-100 outline-none flex-1 text-black"
                            // value={appointmentNewDate}
                            onChange={e => setAppointmentNewDate(e.target.value)}         
                          ></input>
                        </div>
                        <div className="flex-row">
                          <button 
                          type="submit"
                          className="hover:bg-white hover:text-red-400 mb-5 mt-5 border-2 border-white text-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-red-400 hover:text-white"
                          >
                            Editar
                          </button>
                          <button 
                          onClick={handleSecretaryDeleteAppointment}
                          className="hover:bg-white hover:text-red-400 border-2 border-white text-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-red-400 hover:text-white"
                          >
                            Excluir
                          </button>
                        </div>
                      </form> 
                    )
                  }
                  </div>
              </div>
            </div>

            <div className="flex w-full flex-1 flex-col items-center justify-center text-center">
              <div className="bg-white flex w-full">
                <div className="w-1/2 p-5">
                  <div className="py-10">
                    <div className="py-10">
                      <h2 className="text-3xl font-bold text-red-400 mb-2">Lista de doutores cadastrados</h2>
                      <div className="border-2 w-20 border-red-400 inline-block"></div>
                    </div>
                  </div>
                  <DoctorsList doctors={doctors}></DoctorsList>
                </div>
                <div className="w-1/2 bg-red-400 text-white py-8">
                  <div className="py-10">
                    <div className="py-10">
                      <h2 className="text-3xl font-bold text-white mb-2">Lista de consultas cadastradas</h2>
                      <div className="border-2 w-20 border-white inline-block"></div>
                    </div>
                  </div>
                  <AppointmentsTable doctors={doctors} appointments={appointments} />
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}

export default HomePage;