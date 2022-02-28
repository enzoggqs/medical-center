import React, { useContext, useRef, useState } from "react";

import { FaRegEnvelope } from "react-icons/fa"
import {MdLockOutline} from "react-icons/md"

import { AuthContext } from "../../contexts/auth";

const LoginPage = () => {
    const { secretaryLogin, doctorLogin } = useContext(AuthContext)

    const emailRef = useRef();

    const [secretaryEmail, setSecretaryEmail] = useState('');
    const [secretaryPassword, setSecretaryPassword] = useState('');
    const [doctorEmail, setDoctorEmail] = useState('');
    const [doctorPassword, setDoctorPassword] = useState('');

    const handleSecretarySignIn = (e) => {
        e.preventDefault();
        secretaryLogin(secretaryEmail, secretaryPassword)
    }

    const handleDoctorSignIn = (e) => {
        e.preventDefault();

        doctorLogin(doctorEmail, doctorPassword);
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-2 bg-gray-100">
            <div className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
            <div className="bg-white rounded-2xl shadow-2xl flex 2xl:w-2/3 max-w-4xl"> {/* Sign in as doctor */}
            <form onSubmit={handleSecretarySignIn} className="w-1/2 p-5">
              <div className="text-left font-bold">
                <span className="text-red-400">Medical</span>Center
              </div>
              <div className="py-7">
                <div className="py-10">
                  <h2 className="text-3xl font-bold text-red-400 mb-2">Acesso Secretária</h2>
                  <div className="border-2 w-20 border-red-400 inline-block"></div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="rounded-full border-2 bg-gray-100 w-64 p-2 flex items-center mb-3">
                    <FaRegEnvelope className="text-gray-400 m-2"/>
                    <input 
                      autoComplete="off"
                      ref={emailRef}
                      type="email" 
                      name="secretaryEmail" 
                      placeholder="Email" 
                      className="bg-gray-100 outline-none flex-1"
                      onChange={e => setSecretaryEmail(e.target.value)}
                      required
                    ></input>
                  </div>
                  <div className="rounded-full border-2 bg-gray-100 w-64 p-2 flex items-center mb-6">
                    <MdLockOutline className="text-gray-400 m-2"/>
                    <input
                      type="password" 
                      name="secretaryPassword" 
                      placeholder="Senha" 
                      className="bg-gray-100 outline-none flex-1"
                      onChange={e => setSecretaryPassword(e.target.value)}
                      required
                    ></input>
                  </div>
                  <button 
                  type="submit"
                  className="border-2 border-red-400 text-red-400 rounded-full px-12 py-2 inline-block font-semibold hover:bg-red-400 hover:text-white"
                  >
                    Login
                  </button>
                </div>
              </div>
            </form> 

            <form onSubmit={handleDoctorSignIn} className="w-1/2 bg-red-400 text-white py-28 px-5 rounded-tr-2xl rounded-br-2xl"> {/* Sign in as secretary */}
              <h2 className="text-3xl font-bold mb-5 break-normal">Acesso Doutores</h2>
              <div className="border-2 w-20 border-white inline-block mb-10"></div>
                <div className="flex flex-col items-center">
                  <div className="rounded-full border-2 bg-gray-100 w-64 p-2 flex items-center mb-3">
                    <FaRegEnvelope className="text-gray-400 m-2 inline-block"/>
                    <input 
                      type="email" 
                      name="doctorEmail" 
                      placeholder="Email" 
                      className="bg-gray-100 outline-none flex-1 text-black"
                      onChange={e => setDoctorEmail(e.target.value)}
                      required             
                    ></input>
                  </div>
                  <div className="rounded-full border-2 bg-gray-100 w-64 p-2 flex items-center mb-6">
                    <MdLockOutline className="text-gray-400 m-2"/>
                    <input
                      type="password" 
                      name="doctorPassword" 
                      placeholder="Senha" 
                      className="bg-gray-100 outline-none flex-1 text-black"
                      onChange={e => setDoctorPassword(e.target.value)}
                      required
                    ></input>
                  </div>
                </div>
              <button 
                type="submit"
                className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-red-400"
              >
                Login
              </button>
            </form>
          </div>
            </div>
        </div>
    )
}

export default LoginPage;