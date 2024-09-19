import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import Navbar from '../components/navbar';

function About() {
  return (
    <>
    <Navbar/>
    <div className="h-screen mt-[-90px] mb-[200px] flex items-center justify-center bg-gray-100">
      <div>
        <h1 className="text-6xl font-bold text-green-500 mb-4">About Page</h1>
        <Button colorScheme="teal" size="sm">
          <Link to="/" className="text-white">Go back to Home</Link>
        </Button>
      </div>
    </div>
    </>
  );
}

export default About;
