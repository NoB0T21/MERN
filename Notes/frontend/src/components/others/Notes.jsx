import React from 'react'
import {Link} from 'react-router-dom'

const Notes = () => {
  return (
    <div>
        <div className="tasks w-full flex gap-6 p-10">
                
            <div className="task w-72 px-3 py-4 flex flex-col justify-start items-center rounded-md bg-zinc-800 hover:bg-zinc-700  hover:w-75 transition-all duration-500 ease-in-out">
                <div className="w-full flex justify-between items-center">
                    <h2 className="text-white text-2xl tracking-tighter">file Name</h2>
                </div>
                <div className="w-full flex justify-between mt-3 items-center">
                    <Link className="text-blue-500 inline-block hover:text-blue-600" to="#">read More.. </Link>
                    <Link className="text-zinc-400 hover:text-yellow-600 flex m-2 justify-start items-center" to="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                    </svg>edit</Link>
                </div>
            </div>
            <h2 class="text-zinc-600">no task here</h2>
        </div>
    </div>
  )
}

export default Notes
