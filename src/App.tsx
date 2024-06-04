import * as React from "react";
import { Box, Heading, VStack } from "@chakra-ui/react";
import TaskList from "./TaskList";

const App: React.FC = () => {
  return (
    <Box p={5}>
      <Heading as="h1" mb={6}></Heading>
      <VStack spacing={4}>
        <TaskList />
      </VStack>
    </Box>
  );
};

export default App;
