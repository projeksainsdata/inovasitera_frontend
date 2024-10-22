// components/UserStatisticsDashboard.tsx
import React from 'react';
import { Box, Grid, Heading, VStack, Text, SimpleGrid } from '@chakra-ui/react';
import { FiUsers, FiUserCheck, FiLock } from 'react-icons/fi';
import { ChartType, BaseChartData, StatCardType } from '@/lib/types/visualization.type';
import { UserStatistics } from '@/types/dashboard.type';
import { DASHBOARD_PREFIX } from '@/lib/constants/api.contants';
import { ResponseApi } from '@/lib/types/api.type';
import OverlaySpinner from '@/components/Loading/OverlayLoading';
import useDataFetch from '@/hooks/useFetchData';
import { DynamicChart } from '@/components/Visualization/Chart/DynamicChart';
import { StatCard } from '@/components/Visualization/Card/DynamicStatCard';

const UserStatisticsDashboard: React.FC = () => {
    const { data, loading, error } = useDataFetch<ResponseApi<UserStatistics>>(DASHBOARD_PREFIX.USER);

    if (loading) return <OverlaySpinner show />;
    if (error) return <Text color="red.500">Error loading data: {error.message}</Text>;
    if (!data || !data.data) return <Text>No data available</Text>;

    const totalUsers = data.data.userRoleDistribution.reduce((sum, role) => sum + role.count, 0);

    const statCards: StatCardType[] = [
        {
            title: 'Total Users',
            value: totalUsers.toString(),
            icon: FiUsers,
            trend: 'neutral',
            change: 0,
        },
        {
            title: 'Innovators',
            value: (data.data.userRoleDistribution.find(role => role._id === 'innovator')?.count || 0).toString(),
            icon: FiUserCheck,
            trend: 'neutral',
            change: 0,
        },
        {
            title: 'Local Auth Users',
            value: (data.data.authMethodStats.find(method => method._id === 'local')?.count || 0).toString(),
            icon: FiLock,
            trend: 'neutral',
            change: 0,
        },
    ];

    const createChartData = (
        dataArray: any[] | undefined,
        labelKey: string,
        valueKey: string
    ): BaseChartData => {
        if (!dataArray || dataArray.length === 0) {
            return { labels: [], datasets: [{ label: 'No Data', data: [] }] };
        }

        const labels = [...new Set(dataArray.map(item => item[labelKey]))];
        const dataMap = dataArray.reduce((acc, item) => {
            acc[item[labelKey]] = (acc[item[labelKey]] || 0) + (typeof item[valueKey] === 'number' ? item[valueKey] : 1);
            return acc;
        }, {} as Record<string, number>);

        return {
            labels,
            datasets: [{
                label: labelKey,
                data: labels.map(label => dataMap[label] || 0),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                ],
            }],
        };
    };

    const roleDistributionData = createChartData(data.data.userRoleDistribution, '_id', 'count');
    const innovatorStats = data.data.innovatorStats[0] || {};
    const statusDistributionData = createChartData(innovatorStats.statusDistribution?.map(status => ({ status })), 'status', 'status');
    const fakultasDistributionData = createChartData(innovatorStats.fakultasDistribution?.map(fakultas => ({ fakultas })), 'fakultas', 'fakultas');
    const unitDistributionData = createChartData(innovatorStats.unitDistribution?.map(unit => ({ unit })), 'unit', 'unit');

    const renderChart = (chartData: BaseChartData, title: string, type: ChartType) => {
        if (chartData.labels.length === 0) {
            return <Text color="gray.500">No data available for {title}</Text>;
        }
        return (
            <DynamicChart
                type={type}
                data={chartData}
                title={title}
                height={300}
            />
        );
    };

    return (
        <Box>
            <Heading mb={6}>User Statistics Dashboard</Heading>
            <Grid templateColumns="repeat(3, 1fr)" gap={6} mb={6}>
                {statCards.map((card, index) => (
                    <StatCard key={index} {...card} />
                ))}
            </Grid>
            <SimpleGrid columns={2} spacing={6} mb={6}>
                {renderChart(roleDistributionData, "User Role Distribution", ChartType.Pie)}
                {renderChart(statusDistributionData, "Innovator Status Distribution", ChartType.Doughnut)}
                {renderChart(fakultasDistributionData, "Fakultas Distribution", ChartType.Bar)}
                {renderChart(unitDistributionData, "Prodi Distribution", ChartType.Bar)}
            </SimpleGrid>
            {data.data.newUserTrend.length === 0 && (
                <Text mt={4} color="gray.500">No new user trend data available.</Text>
            )}
        </Box>
    );
};

export default UserStatisticsDashboard;