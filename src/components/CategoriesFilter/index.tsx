// components/CategoryFilter.tsx

import React, { useState, useCallback } from 'react';
import { Button, Checkbox, Radio, Stack, Box } from "@chakra-ui/react";

export interface CategoryOption {
    id: string;
    label: string;
    count?: number;
}

export interface SortOption {
    id: string;
    label: string;
}

interface CategoryFilterProps {
    categories: CategoryOption[];
    sortOptions: SortOption[];
    defaultCategories?: string[];
    defaultSort?: string;
    onApply: (selectedCategories: string[], selectedSort: string) => void;
    className?: string;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
    categories,
    sortOptions,
    defaultCategories = [],
    defaultSort = '',
    onApply,
    className = '',
}) => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>(defaultCategories);
    const [selectedSort, setSelectedSort] = useState<string>(defaultSort);


    const handleCategoryChange = useCallback((categoryId: string) => {
        setSelectedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
    }, []);

    const handleSortChange = useCallback((sortId: string) => {
        setSelectedSort(sortId);
    }, []);

    const handleApply = useCallback(() => {
        onApply(selectedCategories, selectedSort);
    }, [onApply, selectedCategories, selectedSort]);

    return (
        <Box className={`bg-white border rounded-lg shadow-md p-4 ${className}`}>
            <h2 className="font-bold text-lg my-4">Categories</h2>
            <Stack spacing={2}>
                {categories.map(category => (
                    <Checkbox
                        key={category.id}
                        isChecked={selectedCategories.includes(category.id)}
                        onChange={() => handleCategoryChange(category.id)}
                        size="sm"
                        colorScheme="blue"
                    >
                        {category.label} {category.count !== undefined && `(${category.count})`}
                    </Checkbox>
                ))}
            </Stack>

            <h2 className="font-bold text-lg my-4">Sort By</h2>
            <Stack spacing={2}>
                {sortOptions.map(option => (
                    <Radio
                        key={option.id}
                        isChecked={selectedSort === option.id}
                        onChange={() => handleSortChange(option.id)}
                        size="sm"
                        colorScheme="blue"
                        value={option.id}
                    >
                        {option.label}
                    </Radio>
                ))}
            </Stack>

            <Button colorScheme="blue" size="sm" w="full" mt={4} onClick={handleApply}>
                Apply
            </Button>
        </Box>
    );
};

export default CategoryFilter;