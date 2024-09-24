/* eslint-disable tailwindcss/no-custom-classname */
import React from 'react';

interface FooterProps {
  className?: string;
}

const Footer = ({ className = '' }: FooterProps) => {
  return (
    <footer className={`bg-black p-4 text-white ${className}`}>
      <div className="container mx-auto">
        <p>&copy; 2024 HMSD Adyatama. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
