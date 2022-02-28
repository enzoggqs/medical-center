import { useEffect } from "react"

const DoctorAppointmentsTable = ({
    appointments
}) => {
    useEffect(() => {
        console.log(appointments)
    }, [])
    return (
        <div className="w-1/2 bg-white text-red-400 py-5">
            <div className="py-5">
                <div className="py-5">
                    <h2 className="text-3xl font-bold text-red-400 mb-2">Minhas próximas consultas</h2>
                    <div className="border-2 w-20 border-red-400 inline-block"></div>
                </div>
            </div>
            <div className="bg-white text-red-400 w-2/3 ml-auto mr-auto">
                {
                    appointments.length == 0 ?
                        (<h1>Carregando dados...</h1>)
                    :
                    <table className="w-full border-2 border-red-400">
                        <thead>
                            <tr>
                                <th className="border-2 border-red-400">Nome do Paciente</th>
                                <th className="border-2 border-red-400">Data da Consulta</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((appointment) => (
                                <tr key={appointment.id} className="border-2 border-red-400">
                                    <td className="border-2 border-red-400">
                                        {appointment.patientName}
                                    </td>
                                    <td className="border-2 border-red-400">
                                        {appointment.date.slice(0, 10).split("-").reverse().join("-").replace(/-/g, "/")}
                                    </td>
                                </tr>
                            )

                            )}
                        </tbody>
                    </table>
                }
            </div>
        </div>
    )
}

export default DoctorAppointmentsTable