import React, { useEffect, useState, useCallback } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./hooks/use-http";

function App() {
  const [tasks, setTasks] = useState([]);

  const transformTasks = useCallback((taskObject) => {
    const loadedTasks = [];

    for (const taskKey in taskObject) {
      loadedTasks.push({ id: taskKey, text: taskObject[taskKey].text });
    }

    setTasks(loadedTasks);
  }, []);

  const {
    isLoading,
    error,
    sendRequest: fetchTasks,
  } = useHttp(
    {
      url: "https://a-more-realistic-example-97f27-default-rtdb.europe-west1.firebasedatabase.app/tasks.json",
    },
    transformTasks
  );

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
