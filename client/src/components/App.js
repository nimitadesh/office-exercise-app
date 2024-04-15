import React from 'react';
import '../styles/app-styles.css';
import '../styles/fonts.css';

import HomePage from './home/HomePage';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import '@fontsource/inria-sans'; 
import '@fontsource/inria-sans/300-italic.css';

const theme = extendTheme ({
  fonts: {
    heading: 'Inria Sans, sans-serif',
    body: 'Inria Sans, sans-serif',
  },
})


function App() {
  return (
      <div className="App">
        <HomePage />
      </div>
  );
}
export default App;