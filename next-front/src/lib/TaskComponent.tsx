import { TaskSchema } from "@/models/TaskModel"
import styles from "@/styles/lib/TaskComponent.module.css"
import client from "@/utils/client"
import ky from "ky"

type Props = {
    task: TaskSchema,
    tasks: TaskSchema[],
    onCompleteTask: (completedTask: TaskSchema) => void,
    onDeleteTask: (task: TaskSchema, tasks: TaskSchema[]) => void
}

const TaskComponent = ({task, tasks, onCompleteTask, onDeleteTask}: Props) => {
    const completeTask = (id: string) => async () => {
        const completedTask : TaskSchema = await client.put(`tasks/${id}`).json()
        onCompleteTask(completedTask)
    }

    const deleteTask = (id: string) => async () => {
        const deletedTask : TaskSchema = await client.delete(`tasks/${id}`).json()
        onDeleteTask(deletedTask, tasks)
    } 

    return (
        <div className={`${styles.card} ${task.completed ? 'completed' : ''}`}>
            <div className={styles.taskText}>
                <p className={task.completed ? styles.completed : styles.notCompleted}>{task.text}</p>       
            </div>
            <div className={styles.taskControllers}>
                <button onClick={completeTask(task._id)} className={styles.done}>&#10003;</button>
                <button onClick={deleteTask(task._id)} className={styles.exclude}>&#10005;</button>
            </div>
        </div>
    )
}

export default TaskComponent