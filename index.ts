#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let toDos : string[] = [];
let conditions =  true;

console.log(chalk.bold.underline.bgBlue("\t\t Welcome to ToDo List App"));


let main = async () => {
    
    
    while(conditions){
        let ansSelect = await inquirer.prompt([{
            name : "options",
            type : "list",
            message : "What do you want select option in ToDo?",
            choices : ["Add Task", "View Task", "Update Task", "Delete Task", "Exit"],
        }
    ]
);
    
        if(ansSelect.options === "Add Task"){
            await addTask();
            
        }
        else if(ansSelect.options === "View Task"){
            await viewTask;
            console.log(toDos);
            
        }
        else if(ansSelect.options === "Update Task"){
            await updateTask();
        }
       else  if(ansSelect.options === "Delete Task"){

            await deleteTask();
        }
        else if(ansSelect.options === "Exit"){
            console.log(chalk.redBright("   Exiting....."));
            conditions = false;
        }
   }
}    

let addTask = async () =>{
    let newTask = await inquirer.prompt([{
        name : "task",
        type : "input",
        message :"What do you want add in Task ?"

    }]);
    toDos.push(newTask.task);
    console.log(chalk.greenBright("\n" + newTask.task) + " task added successfully in ToDo_List.");
}
let viewTask = async () =>{
    console.log("\n Your ToDo_List : \n");
    toDos.forEach((task ,index)=>{
        console.log(task + ":" + index);
    
    });
}

let updateTask = async () =>{
    await viewTask()
    let updateTask_index = await inquirer.prompt([{
        name : "index",
        type : "number",
        message : "Select the Index No of Task for Update"
    },

    {
        name : "newTask",
        type : "input",
        message : "Enter New Task"
    }
]);
toDos[updateTask_index.index] = updateTask_index.newTask;

console.log("Task at Index No. " + updateTask_index.index + " updated Successfully.");
}


let deleteTask = async () =>{
    await viewTask()
    let taskIndex = await inquirer.prompt([{
        name :"index",
        type:"number",
        message : "Enter the index No of Task :"

    }]);

    let deleteTask = toDos.splice(taskIndex.index,1);
    console.log(chalk.red(deleteTask )+ " this task successfully deleted in your list");
}

main();