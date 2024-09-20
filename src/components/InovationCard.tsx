import React from "react";

interface InnovationCardProps {
  category: string;
  rating: number;
  title: string;
}

const InnovationCard: React.FC<InnovationCardProps> = ({ category, rating, title }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="h-40 bg-gray-300 rounded-md mb-4"></div>
      <div className="flex items-center justify-between mb-2">
        <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
          {category}
        </span>
        <span className="text-yellow-500">★ {rating}</span>
      </div>
      <p className="text-sm font-bold">{title}</p>
    </div>
  );
};

export default InnovationCard;
