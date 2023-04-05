import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import InputTask from '@/lib/InputTask';
import { TaskList } from '@/lib/TaskList';
import { useEffect, useState } from 'react';
import Lottie from 'lottie-react-web';
import loadingLottie from '@/lib/loading.json';
import { update, findIndex, propEq, remove } from 'ramda';
import { TaskSchema } from '@/models/TaskModel';
import client from '@/utils/client';


export default function Home() {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<TaskSchema[]>([]);

  const getTasks = async (): Promise<void> => {
    try{
      const response : TaskSchema[] = await client.get(`tasks`).json()
      setTasks(response)
    } catch (error) {
      console.log(error)
      setTasks([])
    }
  }

  const handleNewTask = (newTask: TaskSchema) => {
    setTasks([...tasks, newTask])
  }

  const handleUpdatedTask = (completedTask: TaskSchema) => {
    const updatedTasks = (task: TaskSchema, tasks: TaskSchema[]) => update(findIndex(propEq(task._id, 'id'))(tasks), task, tasks)
    setTasks(updatedTasks(completedTask, tasks))
  }

  const handleDeletedTask = (deletedTask: TaskSchema, tasks: TaskSchema[]) => {
    const updatedTasks = remove(findIndex(propEq(deletedTask._id, 'id'), tasks), 1, tasks)
    setTasks(updatedTasks)
  }

  useEffect(() => {
    getTasks()
    setLoading(false)
  }, [])

  return (
    <>
      <Head>
        <title>ToDo-List</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <div className={styles.mainContainer}>
      <main className={styles.main}>
        <div>
          <div className={styles.logo}>
            <h1>ToDoList</h1>
          </div>
        </div>
        <InputTask
          onCreateTask={handleNewTask}
        />
        {loading &&
          <Lottie options={{
              animationData: loadingLottie
            }}
          />
        }
        {!loading && tasks.length === 0 &&
          <p>Adicione uma tarefa</p>
        }
        {!loading && tasks.length > 0 && 
          <TaskList
            tasks={tasks}
            onDeleteTask={handleDeletedTask}
            onCompleteTask={handleUpdatedTask}
          />
        }
      </main>
    </div>
    </>
  )
}