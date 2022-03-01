const FormSecretaryCreateAppointment = ({
    doctors, 
    appointmentDoctor, 
    appointmentPatient,
    appointmentDate,
    setAppointmentDoctor,
    setAppointmentPatient,
    setAppointmentDate,
    handleCreateAppointment
}) => {
    return (
        <form onSubmit={handleCreateAppointment} className="w-1/2 bg-red-400 text-white p-5">
            <h2 className="text-black font-bold">Menu Consultas</h2>
            <div className="py-10">
                <div className="py-10">
                    <h2 className="text-3xl font-bold mb-2">Criar consulta</h2>
                    <div className="border-2 w-20 border-white inline-block"></div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="rounded-full border-2 bg-gray-100 mx-auto 2xl:w-1/2 md:w-64 p-2 flex items-center mb-4">
                        <input 
                            name="patientName" 
                            placeholder="Nome do paciente" 
                            className="pl-2 bg-gray-100 outline-none flex-1 text-black"
                            onChange={e => setAppointmentPatient(e.target.value)}
                            value={appointmentPatient}
                            required             
                        ></input>
                    </div>
                    <div className="rounded-full border-2 bg-gray-100 mx-auto 2xl:w-1/2 md:w-64 p-2 flex items-center mb-4">
                        <select 
                        name="doctorName" 
                        placeholder="Nome do Doutor" 
                        className="pl-2 bg-gray-100 outline-none flex-1 text-black"
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
                    <div className="rounded-full border-2 bg-gray-100 mx-auto 2xl:w-1/2 md:w-64 p-2 flex items-center mb-6">
                        <input 
                            type="datetime-local"
                            name="appointmentDate" 
                            placeholder="Data da Consulta" 
                            className="pl-2 bg-gray-100 outline-none flex-1 text-black"
                            onChange={e => setAppointmentDate(e.target.value)}
                            value={appointmentDate}
                            required             
                        ></input>
                    </div>
                </div>
                <button 
                    type="submit"
                    className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-red-400"
                >
                    Criar
                </button>
            </div>
        </form>
    )
}

export default FormSecretaryCreateAppointment;