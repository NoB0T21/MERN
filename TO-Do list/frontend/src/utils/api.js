import axios from 'axios'

const useTodo = (setTodoData) => {
    const getTodo = async () => {
        try {
            const result = await axios.get(`${import.meta.env.VITE_URL}/`);
            setTodoData(result.data);
        }catch (err) {
            console.log(err);
        }
    }
        
    const update = async (taskId) => {
        try {
            await axios.post(`${import.meta.env.VITE_URL}/update/${taskId}`)
            getTodo()
        }catch (err) {
            console.log(err);
        }
    }

    const deleteTodo = async (taskId) => {
        try {
            axios.post(`${import.meta.env.VITE_URL}/delete/${taskId}`)
            getTodo()
            getTodo()
        }catch (err) {
            console.log(err);
        }
    }

    const addTodo = async (task, setTask, setTodoData ) => {
            try{
                await axios.post(`${import.meta.env.VITE_URL}/createtask`, task)
                setTask('')
                getTodo()
            }catch(error){
                console.log(error.message)
            }
        }
    return { getTodo, addTodo, update, deleteTodo };
}
export default useTodo