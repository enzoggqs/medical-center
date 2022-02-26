import React, { useContext, useEffect } from "react";
import { useState } from "react";
import AppointmentsTable from "../../components/AppointmentsTable";
import DoctorsList from "../../components/DoctorsList";
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
        console.log(user);
        if(user.userType === 2){
            (async () => {
                const allDoctors = await getDoctors();
                setDoctors(allDoctors.data.doctors);

                const allAppointments =  await getSecretaryAppointments();
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
              <form onSubmit={handleCreateDoctor} className="w-1/2 p-5">
                <h2 className="font-bold">Menu Doutor</h2>
                <div className="py-10">
                  <div className="py-10">
                    <h2 className="text-3xl font-bold text-red-400 mb-2">Cadastrar Doutor</h2>
                    <div className="border-2 w-20 border-red-400 inline-block"></div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-gray-100 mx-auto 2xl:w-1/2 md:w-64 p-2 flex items-center mb-3">
                      <input 
                        autoComplete="off"
                        name="doctorName" 
                        placeholder="Name" 
                        className="bg-gray-100 outline-none flex-1"
                        onChange={e => setDoctorToCreateName(e.target.value)}
                        value={doctorToCreateName}
                        required
                      ></input>
                    </div>
                    <div className="bg-gray-100 mx-auto 2xl:w-1/2 md:w-64 p-2 flex items-center mb-6">
                      <input
                        type="email" 
                        name="doctorEmail" 
                        placeholder="Email" 
                        className="bg-gray-100 outline-none flex-1"
                        value={doctorToCreateEmail}
                        onChange={e => setDoctorToCreateEmail(e.target.value)}
                        required
                      ></input>
                    </div>
                    <button 
                    type="submit"
                    className="border-2 border-red-400 text-red-400 rounded-full px-12 py-2 inline-block font-semibold hover:bg-red-400 hover:text-white"
                    >
                      Cadastrar
                    </button>
                  </div>
                </div>
              </form> 

              <div className="w-1/2 bg-red-400 text-white py-5">
                <h2 className="text-black font-bold">Menu Consultas</h2>
                <form onSubmit={handleCreateAppointment}>
                  <h2 className="text-3xl font-bold mb-5">Criar consulta</h2>
                  <div className="border-2 w-20 border-white inline-block mb-10"></div>
                  <div className="mx-auto 2xl:w-1/2 md:w-64 bg-gray-100 p-2 flex items-center mb-5">
                    <input 
                      name="patientName" 
                      placeholder="Nome do paciente" 
                      className="bg-gray-100 outline-none flex-1 text-black"
                      onChange={e => setAppointmentPatient(e.target.value)}
                      value={appointmentPatient}
                      required             
                    ></input>
                  </div>
                  <div className="mx-auto 2xl:w-1/2 md:w-64 bg-gray-100 p-2 flex items-center mb-5">
                    <select 
                      name="doctorName" 
                      placeholder="Nome do Doutor" 
                      className="bg-gray-100 outline-none flex-1 text-black"
                      onChange={e => setAppointmentDoctor(e.target.value)}
                      value={appointmentDoctor ? appointmentDoctor : "DEFAULT"}
                      required        
                    >
                      <option value="DEFAULT" disabled>Nome do Doutor</option>
                      {
                          doctors.map((doctor) => (
                            <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                          ))
                      }
                    </select>
                  </div>
                  <div className="mx-auto 2xl:w-1/2 md:w-64 bg-gray-100 p-2 flex items-center mb-5">
                    <input 
                      type="datetime-local"
                      name="appointmentDate" 
                      placeholder="Data da Consulta" 
                      className="bg-gray-100 outline-none flex-1 text-black"
                      onChange={e => setAppointmentDate(e.target.value)}
                      value={appointmentDate}
                      required             
                    ></input>
                  </div>
                  <button 
                    type="submit"
                    className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-red-400"
                  >
                    Criar
                  </button>
                </form>
              </div>
            </div>

            <div className="flex w-full flex-1 flex-col items-center justify-center text-center">
              <div className="bg-white flex w-full">
                <div className="w-1/2 py-5 px-28">
                  <div className="py-5">
                    <div className="py-5">
                      <h2 className="text-3xl font-bold text-red-400 mb-2">Editar/Excluir Doutor</h2>
                      <div className="border-2 w-20 border-red-400 inline-block"></div>
                    </div>
                  </div>
                  <h2 className="text-lg font-bold text-red-400 mb-4">Selecione o doutor que deseja modificar ou excluir</h2>
                  <div className="2xl:w-1/2 md:w-64 mx-auto bg-gray-100 p-2 flex items-center mb-8">
                    <select
                      name="doctorName" 
                      placeholder="Nome do Doutor" 
                      className="bg-gray-100 outline-none flex-1 text-black"
                      onChange={e => setDoctorToChange(e.target.value)}
                      required 
                      value={doctorToChange ? doctorToChange : "DEFAULT"}       
                      >
                      <option value="DEFAULT" disabled>Selecione o nome do doutor</option>
                      {
                          doctors.map((doctor) => (
                            <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                          ))
                      }
                    </select>
                  </div>
                  
                  {
                    showDoctorToChangeFields && (
                      <form className="2xl:w-1/2 md:w-64 mx-auto" onSubmit={handleEditDoctor}>
                        <h2 className="text-lg font-bold text-red-400 mb-4">Novo nome do doutor</h2>
                        <div className="bg-gray-100 p-2 flex items-center mb-5">
                          <input 
                            name="patientName" 
                            placeholder="Novo nome do doutor" 
                            className="bg-gray-100 outline-none flex-1 text-black"
                            value={doctorNewName}
                            onChange={e => setDoctorNewName(e.target.value)} 
                            required         
                          ></input>
                        </div>
                        <div className="flex-col">
                          <button 
                          type="submit"
                          className="mb-5 mt-5 border-2 border-red-400 text-red-400 rounded-full px-12 py-2 inline-block font-semibold hover:bg-red-400 hover:text-white"
                          >
                            Editar
                          </button> 
                        </div>
                        <div className="flex-col">
                          <button 
                          onClick={handleDeleteDoctor}
                          className="border-2 border-red-400 text-red-400 rounded-full px-12 py-2 inline-block font-semibold hover:bg-red-400 hover:text-white"
                          >
                            Excluir
                          </button>
                        </div>
                      </form> 
                    )
                  }


                  </div>
                  <div className="w-1/2 bg-red-400 text-white py-5 px-28">
                  <div className="py-5">
                    <div className="py-5">
                      <h2 className="text-3xl font-bold text-white mb-2">Editar/Excluir Consulta</h2>
                      <div className="border-2 w-20 border-white inline-block"></div>
                    </div>
                  </div>
                  <h2 className="text-lg font-bold text-white mb-4">Selecione a consulta que deseja modificar ou excluir</h2>
                  <h2 className="text-lg font-bold text-white mb-4 pt-4">Data</h2>
                  <div className="bg-gray-100 p-2 flex items-center mb-4 mx-auto 2xl:w-1/2 md:w-64 mx-auto">
                    <select
                      name="appointmentDate" 
                      placeholder="Nome do Doutor" 
                      className="bg-gray-100 outline-none flex-1 text-black"
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
                        <div className="bg-gray-100 p-2 flex items-center mb-8 2xl:w-1/2 md:w-64 mx-auto">
                          <select
                            name="doctorName" 
                            placeholder="Nome do Doutor" 
                            className="bg-gray-100 outline-none flex-1 text-black"
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
                        <div className="bg-gray-100 p-2 flex items-center mb-5">
                          <input 
                            name="newPatientName" 
                            placeholder="Novo nome do paciente" 
                            className="bg-gray-100 outline-none flex-1 text-black"
                            value={appointmentNewPatient}
                            onChange={e => setAppointmentNewPatient(e.target.value)} 
                            required         
                          ></input>
                        </div>
                        <h2 className="text-lg font-bold text-white mb-4">Nova data da consulta</h2>
                        <div className="bg-gray-100 p-2 flex items-center mb-5">
                          <input
                            type="date"
                            name="newAppointmentDate" 
                            className="bg-gray-100 outline-none flex-1 text-black"
                            // value={appointmentNewDate}
                            onChange={e => setAppointmentNewDate(e.target.value)}         
                          ></input>
                        </div>
                        <div className="flex-row">
                          <button 
                          type="submit"
                          className="mb-5 mt-5 border-2 border-white text-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-red-400 hover:text-white"
                          >
                            Editar
                          </button>
                          <button 
                          onClick={handleSecretaryDeleteAppointment}
                          className="border-2 border-white text-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-red-400 hover:text-white"
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
                  {/* <ul>
                    {doctors.map((doctor) => (
                        <li className="text-xl py-1 text-red-400"
                            key={doctor.id}>
                            {doctor.id} -
                            {doctor.email} -
                            {doctor.name}
                        </li>
                    ))}
                  </ul> */}
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