
// src/components/cards/StatCard.tsx
import { Box, Flex, Text, Icon, useToken } from '@chakra-ui/react';
import { FiArrowUp, FiArrowDown, FiMinus } from 'react-icons/fi';
import { StatCardType } from '@/lib/types/dashboard.type';

export const StatCard = ({ title, value, icon: IconComponent, change, trend }: StatCardType) => {
    const [green500, red500] = useToken('colors', ['green.500', 'red.500']);

    const trendIcon = {
        up: FiArrowUp,
        down: FiArrowDown,
        neutral: FiMinus,
    };

    const trendColor = {
        up: green500,
        down: red500,
        neutral: 'gray.500',
    };

    return (
        <Box p={6} bg="white" borderRadius="lg" shadow="sm">
            <Flex justify="space-between" align="center" mb={2}>
                <Text fontSize="sm" color="gray.500">
                    {title}
                </Text>
                {IconComponent && (
                    <Box color="gray.400">
                        <IconComponent size={20} />
                    </Box>
                )}
            </Flex>
            <Text fontSize="2xl" fontWeight="bold">
                {value}
            </Text>
            {trend && (
                <Flex align="center" mt={2} color={trendColor[trend]}>
                    <Icon as={trendIcon[trend]} mr={1} />
                    <Text fontSize="sm">{change}%</Text>
                </Flex>
            )}
        </Box>
    );
};