import { Button, Checkbox, RadioGroup, Radio, Stack } from "@chakra-ui/react";
import React from "react";

const CategorySidebar: React.FC = ({ className,close }) => {
  return (
    <div className={`${className} z-50`}>
      <div className="flex w-full justify-between md:flex-col">
        <h2 className="font-bold text-lg my-4">Kategori</h2>
        <button onClick={close} className="md:hidden">Tutup</button>
      </div>
      <Stack spacing={2}>
        <Checkbox size="sm" colorScheme="blue">
          Semua (100)
        </Checkbox>
        <Checkbox size="sm" colorScheme="blue">
          Pangan (29)
        </Checkbox>
        <Checkbox size="sm" colorScheme="blue">
          Kesehatan (19)
        </Checkbox>
      </Stack>

      <h2 className="font-bold text-lg my-4">Filter</h2>
      <RadioGroup defaultValue="ratingTerbesar">
        <Stack spacing={2}>
          <Radio size="sm" colorScheme="blue" value="ratingTerbesar">
            Rating Terbesar
          </Radio>
          <Radio size="sm" colorScheme="blue" value="aToZ">
            A-Z
          </Radio>
          <Radio size="sm" colorScheme="blue" value="ratingTerkecil">
            Rating Terkecil
          </Radio>
        </Stack>
      </RadioGroup>

      <Button colorScheme="blue" size="sm" w="full" mt={4} onClick={close}>
        Terapkan
      </Button>
    </div>
  );
};

export default CategorySidebar;
