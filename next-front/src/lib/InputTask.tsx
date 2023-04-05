import { useState } from 'react';
import styles from '@/styles/lib/InputTask.module.css';
import { TaskSchema } from '@/models/TaskModel';
import client from '@/utils/client';

interface InputTaskProps {
    onCreateTask: (newTask: TaskSchema) => void;
  }

const InputTask: React.FC<InputTaskProps> = ({ onCreateTask }) => {
    const [ text, setText ] = useState<any>(null)
    const addTask = async (e: any) => {
        e.preventDefault()
        if(text){
            const newTask : TaskSchema = await client.post(`tasks`, {json: {
                text: text,
                completed: false
            }}).json()
            onCreateTask(newTask)
            setText('')
        } else {
            alert('Insira uma tarefa')
        }
    }
    
    return (
        <form className={styles.insertForm}>
            <input
                id="task"
                type="text"
                value={text}
                className={styles.insertInput}
                onChange={(e) => setText(e.target.value)}
            />
            <button 
                onClick={addTask}
                className={styles.insertButton}
            >
                <span className={styles.insertPlusButton}>
                    &#43;
                </span>
            </button>
        </form>
    )
}

export default InputTask