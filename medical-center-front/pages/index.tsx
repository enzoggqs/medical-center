import type { NextPage } from 'next'
import Head from 'next/head'
import { FaRegEnvelope } from "react-icons/fa"
import {MdLockOutline} from "react-icons/md"

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 bg-gray-100">
      <Head>
        <title>Medical Center</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl"> {/* Sign in as doctor */}
          <div className="w-1/2 p-5">
            <div className="text-left font-bold">
              <span className="text-red-400">Medical</span>Center
            </div>
            <div className="py-10">
              <div className="py-10">
                <h2 className="text-3xl font-bold text-red-400 mb-2">Acesso Secretária</h2>
                <div className="border-2 w-20 border-red-400 inline-block"></div>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                  <FaRegEnvelope className="text-gray-400 m-2"/>
                  <input type="email" name="email" placeholder="Email" className="bg-gray-100 outline-none flex-1"></input>
                </div>
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-6">
                  <MdLockOutline className="text-gray-400 m-2"/>
                  <input type="password" name="password" placeholder="Senha" className="bg-gray-100 outline-none flex-1"></input>
                </div>
                <a 
                href="#" 
                className="border-2 border-red-400 text-red-400 rounded-full px-12 py-2 inline-block font-semibold hover:bg-red-400 hover:text-white"
                >
                  Login
                </a>
              </div>
            </div>
          </div> 

          <div className="w-1/2 bg-red-400 text-white py-36 px-12 rounded-tr-2xl rounded-br-2xl"> {/* Sign in as secretary */}
            <h2 className="text-3xl font-bold mb-5">Acesso Doutores.</h2>
            <div className="border-2 w-20 border-white inline-block mb-10"></div>
            <div className="bg-gray-100 p-2 flex items-center mb-5">
                <FaRegEnvelope className="text-gray-400 m-2 inline-block"/>
                <input type="email" name="email" placeholder="Email" className="bg-gray-100 outline-none flex-1"></input>
            </div>
            <a 
              href="#" 
              className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-red-400"
            >
              Login
            </a>
          </div> 
        </div>
      </main>
    </div>
  )
}

export default Home
