// components/FilterPanel.tsx

import React, { useState, useCallback } from 'react';
import { Button, Checkbox, Radio, Stack, Box } from "@chakra-ui/react";

export interface FilterOption {
    id: string;
    label: string;
    count?: number;
}

export interface FilterGroup {
    id: string;
    label: string;
    type: 'checkbox' | 'radio';
    options: FilterOption[];
}

interface FilterPanelProps {
    filterGroups: FilterGroup[];
    defaultSelections?: Record<string, string | string[]>;
    onApply: (selections: Record<string, string | string[]>) => void;
    className?: string;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
    filterGroups,
    defaultSelections = {},
    onApply,
    className = '',
}) => {
    const [selections, setSelections] = useState<Record<string, string | string[]>>(defaultSelections);

    const handleSelectionChange = useCallback((groupId: string, optionId: string) => {
        setSelections(prev => {
            const group = filterGroups.find(g => g.id === groupId);
            if (!group) return prev;

            if (group.type === 'checkbox') {
                const prevSelection = prev[groupId] as string[] || [];
                return {
                    ...prev,
                    [groupId]: prevSelection.includes(optionId)
                        ? prevSelection.filter(id => id !== optionId)
                        : [...prevSelection, optionId]
                };
            } else {
                return { ...prev, [groupId]: optionId };
            }
        });
    }, [filterGroups]);

    const handleApply = useCallback(() => {
        onApply(selections);
    }, [onApply, selections]);

    return (
        <Box className={`bg-white border rounded-lg shadow-md p-4 ${className}`}>
            {filterGroups.map(group => (
                <div key={group.id} className='mb-3'>
                    <h2 className="font-bold text-lg">{group.label}</h2>
                    <Stack spacing={2}>
                        {group.options.map(option => (
                            group.type === 'checkbox' ? (
                                <Checkbox
                                    key={option.id}
                                    isChecked={(selections[group.id] as string[] || []).includes(option.id)}
                                    onChange={() => handleSelectionChange(group.id, option.id)}
                                    size="md"
                                    colorScheme="blue"
                                >
                                    {option.label} {option.count !== undefined && `(${option.count})`}
                                </Checkbox>
                            ) : (
                                <Radio
                                    key={option.id}
                                    isChecked={selections[group.id] === option.id}
                                    onChange={() => handleSelectionChange(group.id, option.id)}
                                    size="md"
                                    colorScheme="blue"
                                    value={option.id}
                                >
                                    {option.label}
                                </Radio>
                            )
                        ))}
                    </Stack>
                </div>
            ))}

            <Button colorScheme="orange" size="md" w="full" mt={4} onClick={handleApply}>
                Apply
            </Button>
        </Box>
    );
};

export default FilterPanel;