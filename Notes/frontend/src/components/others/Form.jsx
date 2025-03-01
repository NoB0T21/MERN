import React from 'react'

const Form = () => {
  return (
    <div className="form p-10 text-white">
        <form className='w-90 max-w-100' >
            <input className="block w-full h-15 px-5 py-3 bg-zinc-800 outline-none rounded-md" type="text" name="filename" placeholder="title goes here..."/>
            <textarea className="block w-full h-85 mt-3 px-5 py-3 resize-none bg-zinc-800 outline-none rounded-md" name="content" placeholder="Write your details"></textarea>
            <button className="bg-indigo-500 text-md mt-3 p-2 rounded-md hover:bg-indigo-600 hover:text-xl transition-all duration-500 ease-in-out">Create Notes</button>
        </form>
    </div>
  )
}

export default Form
