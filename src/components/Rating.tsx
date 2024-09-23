import { useState } from "react";
import { Icon, HStack } from "@chakra-ui/react";
import { IconStarFilled,IconStar } from "@tabler/icons-react";

const Rating = ({ maxRating = 5, onChange }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(null);

  const handleClick = (value) => {
    setRating(value);
    if (onChange) {
      onChange(value); // Call onChange prop if provided to pass the rating to the parent
    }
  };

  const handleMouseEnter = (value) => {
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(null);
  };

  return (
    <HStack spacing={1}>
      {Array.from({ length: maxRating }, (_, index) => {
        const value = index + 1; // Rating starts at 1, not 0
        return (
          <Icon
            key={index}
            as={IconStarFilled}
            boxSize={8}
            color={value <= (hoverRating || rating) ? "yellow.400" : "gray.300"}
            cursor="pointer"
            onClick={() => handleClick(value)}
            onMouseEnter={() => handleMouseEnter(value)}
            onMouseLeave={handleMouseLeave}
          />
        );
      })}
    </HStack>
  );
};

export default Rating;
