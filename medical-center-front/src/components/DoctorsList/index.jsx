const DoctorsList = ({doctors}) => {
    return(
        <div className="w-1/2 p-5">
            <div className="py-10">
            <div className="py-10">
                <h2 className="text-3xl font-bold text-red-400 mb-2">Lista de doutores cadastrados</h2>
                <div className="border-2 w-20 border-red-400 inline-block"></div>
            </div>
            </div>
            <div className="font-bold text-red-400 tracking-wide leading-8">
            {
                doctors.length > 0 ? 
                    (
                        <ul>
                            {doctors.map((doctor) => (
                                <li key={doctor.id} className="py-2">{doctor.name}</li>
                            ))}
                        </ul>
                    )
                : 
                <h1>Carregando dados...</h1>
                }
            </div>
        </div>
    )
}

export default DoctorsList;