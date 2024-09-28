import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import React from 'react';
import Routers from '@/routes';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <Routers />
    </ChakraProvider>
  </React.StrictMode>,
);
