import React from 'react'
import {Link} from 'react-router-dom'

const Edit = () => {
  return (
    <div className="w-full flex  justify-start gap-6 py-10">
            <Link className="group text-cyan-500 hover:text-cyan-300 text-md hover:text-xl flex flex-row justify-start items-start mb-5 transition-all duration-500 ease-in-out" to="/">
                <svg width={24} height={24} fill="currentColor" className="bi bi-arrow-bar-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5"/>
                  </svg>Home</Link>
            <div className="main mx-5 text-wrap flex flex-col justify-between cursor-default w-1/2 min-auto bg-zinc-800 rounded-xl p-8 text-white">
                <div>
                    <h1 className="w-full text-2xl tracking-tighter flex justify-center items-center"> name </h1>
                    <p className="w-full text-xl mt-3">content</p> 
                </div>
                <div className="w-full flex justify-end items-center">
                    <Link className="group1 text-zinc-400 hover:text-yellow-400 text-md hover:text-xl flex flex-col m-2 justify-start items-center transition-all duration-500 ease-in-out" to="">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                        </svg>edit
                    </Link>
                </div>
            </div>  
        </div>
  )
}

export default Edit
