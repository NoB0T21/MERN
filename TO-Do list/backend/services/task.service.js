import taskModels from '../models/task.models.js';

export const showTask = async() => {
   const tasks = taskModels.find();
   return tasks;
}

export const createTask = async({task}) => {
   if(!task){
      throw new Error("Require all Fields");
  }
 const tasks = taskModels.create({
    task,
 });
 return tasks;
}

export const updateTask =  async ({id}) => {
   if(!id){
      throw new Error("Require all Fields");
  }
 const tasks = taskModels.findByIdAndUpdate({_id: id}, {done: true});
 return tasks;
}