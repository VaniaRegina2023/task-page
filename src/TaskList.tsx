
import * as React from "react";
import { Box, Flex, VStack, HStack, Checkbox, Text, Button, Input, IconButton } from "@chakra-ui/react";
import { DeleteIcon, CheckIcon } from "@chakra-ui/icons";
import axios from "axios";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = React.useState<string>("");

  // Função para buscar as tarefas da API
  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://sua-api.com/tarefas'); // Substitua pela URL da sua API
      const apiTasks = response.data.map((task: any) => ({
        id: task.id,
        title: task.title,
        completed: task.completed,
      }));
      setTasks(apiTasks);
    } catch (error) {
      console.error("Erro ao buscar tarefas da API", error);
    }
  };

  React.useEffect(() => {
    fetchTasks();
  }, []);

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = () => {
    if (newTaskText.trim() !== "") {
      const newTask: Task = { id: tasks.length + 1, title: newTaskText, completed: false };
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
                {task.title}
              </Text>
              {!task.completed && (
                <IconButton
                  aria-label="Marcar como Realizada"
                  icon={<CheckIcon />}
                  colorScheme="green"
                  onClick={() => toggleTaskCompletion(task.id)}
                />
              )}
              <IconButton
                aria-label="Remover"
                icon={<DeleteIcon />}
                colorScheme="red"
                onClick={() => removeTask(task.id)}
              />
            </HStack>
          ))}
        </VStack>
      </Box>
    </Flex>
  );
};

export default TaskList;