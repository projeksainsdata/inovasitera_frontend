import React from "react";
import { IconStarFilled } from "@tabler/icons-react";
import { Link } from "react-router-dom"
import { Inovation } from "@/lib/types/inovation.type";
interface InnovationCardProps {
  inovasi: Inovation;
}

const InnovationCard: React.FC<InnovationCardProps> = ({ inovasi }) => {
  return (
    <Link to={`/inovasi/${inovasi._id}`}>
      <div className="bg-white p-3 rounded-lg shadow-md border">
        <img src={inovasi.image} className="h-40 w-full rounded-md mb-4 object-cover" />
        <div className="flex items-center justify-between mb-2">
          <span className="bg-green-500 text-white text-sm font-semibold px-2 py-1 rounded-full">
            {inovasi.category.name}
          </span>
          <span className="flex gap-2 items-center text-sm text-yellow-500">
            <IconStarFilled size={18} />{" "}
            <span className="text-base font-medium text-black">
              {inovasi.average_rating}({inovasi.count_rating})
            </span>
          </span>
        </div>
        <p className="text-base font-bold">{inovasi.title}</p>
      </div>
    </Link>
  );
};

export default InnovationCard;
