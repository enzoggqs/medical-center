const DoctorsList = ({doctors}) => {
    return(
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
    )
}

export default DoctorsList;