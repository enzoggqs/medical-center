const FormDoctorEditAppointment = ({
    appointments,
    appointmentToChange,
    setAppointmentToChange,
    setAppointmentToChangeDate,
    appointmentToChangeDate,
    handleEditAppointment,
    appointmentsForDate,
    handleSecretaryDeleteAppointment,
    setAppointmentNewPatient,
    appointmentNewPatient,
    setAppointmentNewDate
}) => {
    return(
        <div className="w-1/2 bg-white text-red-400 py-5 px-28">
                <div className="py-5">
                    <div className="py-5">
                        <h2 className="text-3xl font-bold text-red-400 mb-2">Editar/Excluir Consulta</h2>
                        <div className="border-2 w-20 border-red-400 inline-block"></div>
                    </div>
                </div>
                <h2 className="text-lg font-bold text-red-400 mb-4">Selecione a consulta que deseja modificar ou excluir</h2>
                <h2 className="text-lg font-bold text-red-400 mb-4 pt-4">Data</h2>
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
                        {appointments.map((appointment) => (
                            <option key={appointment.id} value={appointment.date}>{appointment.date.slice(0, 10).split("-").reverse().join("-").replace(/-/g, "/")}</option>
                        ))}
                    </select>
                </div>
                {appointmentsForDate && (
                    <div>
                        <h2 className="text-lg font-bold text-red-400 mb-4">Paciente</h2>
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
                                {appointmentsForDate.map((appointment) => (
                                    <option key={appointment.id} value={appointment.id}>{appointment.patientName}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}
                {appointmentToChange && (
                    <form className="mx-auto 2xl:w-1/2 md:w-64" onSubmit={handleEditAppointment}>
                        <h2 className="text-lg font-bold text-red-400 mb-4">Novo nome do paciente</h2>
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
                        <h2 className="text-lg font-bold text-red-400 mb-4">Nova data da consulta</h2>
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
                                className="mb-5 mt-5 border-2 border-red-400 text-red-400 rounded-full px-12 py-2 inline-block font-semibold hover:bg-red-400 hover:text-white"
                            >
                                Editar
                            </button>
                            <button
                                onClick={handleSecretaryDeleteAppointment}
                                className="border-2 border-red-400 text-red-400 rounded-full px-12 py-2 inline-block font-semibold hover:bg-red-400 hover:text-white"
                            >
                                Excluir
                            </button>
                        </div>
                    </form>
                )}
            </div>
    )
}

export default FormDoctorEditAppointment