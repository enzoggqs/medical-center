const FormEditDoctor = ({
    setDoctorToChange,
    doctorToChange,
    doctors,
    showDoctorToChangeFields,
    handleEditDoctor,
    doctorNewName,
    setDoctorNewName,
    handleDeleteDoctor
}) => {
    return(
        <div className="w-1/2 py-5 px-28 mb-10">
            <div className="py-5">
            <div className="py-5">
                <h2 className="text-3xl font-bold text-red-400 mb-2">Editar/Excluir Doutor</h2>
                <div className="border-2 w-20 border-red-400 inline-block"></div>
            </div>
            </div>
            <h2 className="text-lg font-bold text-red-400 mb-4">Selecione o doutor que deseja modificar ou excluir</h2>
            <div className="rounded-full border-2 2xl:w-1/2 md:w-64 mx-auto bg-gray-100 p-2 flex items-center mb-8">
            <select
                name="doctorName" 
                placeholder="Nome do Doutor" 
                className="pl-2 bg-gray-100 outline-none flex-1 text-black"
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
                <div className="rounded-full border-2 bg-gray-100 p-2 flex items-center mb-5">
                    <input 
                    name="patientName" 
                    placeholder="Novo nome do doutor" 
                    className="pl-2 bg-gray-100 outline-none flex-1 text-black"
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
    )
}

export default FormEditDoctor;