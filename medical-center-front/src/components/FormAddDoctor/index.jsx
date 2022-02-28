const FormAddDoctor = ({
    doctorToCreateEmail, 
    doctorToCreateName, 
    setDoctorToCreateEmail, 
    setDoctorToCreateName, 
    handleCreateDoctor}) => 
    {
    return(
        <form onSubmit={handleCreateDoctor} className="w-1/2 p-5">
            <h2 className="font-bold">Menu Doutor</h2>
            <div className="py-10">
                <div className="py-10">
                    <h2 className="text-3xl font-bold text-red-400 mb-2">Cadastrar Doutor</h2>
                    <div className="border-2 w-20 border-red-400 inline-block"></div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="rounded-full border-2 bg-gray-100 mx-auto 2xl:w-1/2 md:w-64 p-2 flex items-center mb-4">
                        <input 
                            autoComplete="off"
                            name="doctorName" 
                            placeholder="Name" 
                            className="pl-2 bg-gray-100 outline-none flex-1"
                            onChange={e => setDoctorToCreateName(e.target.value)}
                            value={doctorToCreateName}
                            required
                        ></input>
                    </div>
                    <div className="rounded-full rounded-full border-2 bg-gray-100 mx-auto 2xl:w-1/2 md:w-64 p-2 flex items-center mb-6">
                        <input
                        type="email" 
                        name="doctorEmail" 
                        placeholder="Email" 
                        className="pl-2 bg-gray-100 outline-none flex-1"
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
    )
}

export default FormAddDoctor;