import { Box, Text } from '@chakra-ui/react';
import { Line, Bar, Pie, Doughnut, Radar } from 'react-chartjs-2';
import { ChartType, BaseChartData } from '@/lib/types/dashboard.type';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    RadialLinearScale,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    RadialLinearScale,
    Title,
    Tooltip,
    Legend
);

interface Props {
    type: ChartType;
    data: BaseChartData;
    title: string;
    height?: number;
}

export const DynamicChart = ({ type, data, title, height = 300 }: Props) => {

    const chartComponents = {
        line: Line,
        bar: Bar,
        pie: Pie,
        doughnut: Doughnut,
        radar: Radar,
    };

    const ChartComponent = chartComponents[type];

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
            title: {
                display: false,
            },
        },
    };

    return (
        <Box p={6} bg="white" borderRadius="lg" shadow="sm" h={height}>
            <Text fontSize="lg" fontWeight="bold" mb={4}>
                {title}
            </Text>
            <Box h={`${height - 80}px`}>
                <ChartComponent data={data} options={options} />
            </Box>
        </Box>
    );
};