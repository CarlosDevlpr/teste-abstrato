import TaskComponent from "./TaskComponent";
import { Fragment } from "react";
import styles from '@/styles/lib/TaskList.module.css'
import { TaskSchema } from "@/models/TaskModel";

type Props = {
  tasks: TaskSchema[]
  onDeleteTask: (deletedTask: TaskSchema, tasks: TaskSchema[]) => void,
  onCompleteTask: (completedTask: TaskSchema) => void
}

export const TaskList = ( {tasks, onDeleteTask, onCompleteTask}: Props) => {
  return(
    <div className={styles.taskList}>
      <Fragment>
        {tasks.map((item: TaskSchema) =>(
          <TaskComponent
            tasks={tasks}
            key={item._id}
            task={item}
            onCompleteTask={onCompleteTask}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </Fragment>
    </div>
    
  )
};