import React from 'react';
import { ChakraProvider} from '@chakra-ui/react';
import Dashboard from './components/Dashboard'; 


const App = () => (
  <ChakraProvider>
      <Dashboard />
  </ChakraProvider>
);


export default App;
