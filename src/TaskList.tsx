import * as React from "react";
import { Box, Flex, VStack, HStack, Checkbox, Text, Button, Input, IconButton } from "@chakra-ui/react";
import { DeleteIcon, CheckIcon } from "@chakra-ui/icons";

interface Task {
  id: number;
  text: string;
  completed: boolean;
  deleted: boolean;
}

const initialTasks: Task[] = [
  { id: 1, text: "Tarefa 1", completed: false, deleted: false },
  { id: 2, text: "Tarefa 2", completed: false, deleted: false },
  { id: 3, text: "Tarefa 3", completed: false, deleted: false },
];

const TaskList: React.FC = () => {
  const [tasks, setTasks] = React.useState<Task[]>(initialTasks);
  const [newTaskText, setNewTaskText] = React.useState<string>("");

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const toggleTaskDelete = (taskId: number) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, deleted: !task.deleted } : task
    ));
  };

  const addTask = () => {
    if (newTaskText.trim() !== "") {
      const newTask: Task = { id: tasks.length + 1, text: newTaskText, completed: false, deleted: false };
      setTasks([...tasks, newTask]);
      setNewTaskText("");
    }
  };

  const removeTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <Flex align="center" justify="center" minH="100vh" bg="gray.200">
      <Box w="100%" maxW="400px" p={4} borderWidth="1px" borderRadius="lg" bg="white">
        <VStack spacing={4}>
          <Text fontSize="xl" fontWeight="bold">Lista de Tarefas</Text>
          <HStack>
            <Input
              placeholder="Inserir nova tarefa"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
            />
            <Button colorScheme="teal" onClick={addTask}>
              Inserir
            </Button>
          </HStack>
          {tasks.map(task => (
            <HStack key={task.id} spacing={4}>
              <Checkbox
                isChecked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
              />
              <Text as={task.completed ? "del" : "span"}>
                {task.text} {task.completed ? "Realizada" : "Pendente"}
                {task.completed && <CheckIcon color="green.500" />}
              </Text>
              {task.completed ? (
                <Checkbox isChecked readOnly />
              ) : (
                <IconButton
                  aria-label="Marcar como Realizada"
                  icon={<CheckIcon />}
                  colorScheme="green"
                  onClick={() => toggleTaskCompletion(task.id)}
                />
              )}
              {task.deleted ? (
                <IconButton
                  aria-label="Remover"
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  onClick={() => removeTask(task.id)}
                />
              ) : (
                <IconButton
                  aria-label="Marcar como excluída"
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  onClick={() => toggleTaskDelete(task.id)}
                />
              )}
            </HStack>
          ))}
        </VStack>
      </Box>
    </Flex>
  );
};

export default TaskList;
