import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

function App() {
  return (
    <div className="h-screen bg-black flex items-center justify-center bg-gray-100">
      <div>
        <h1 className="text-6xl font-bold text-blue-500 mb-4">Home Page</h1>
        <Button colorScheme="teal" size="sm">
          <Link to="/about" className="text-white font-bold">Go to About</Link>
        </Button>
      </div>
    </div>
  );
}

export default App;
