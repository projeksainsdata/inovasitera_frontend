import React from 'react';
import { Box, Grid, Heading, VStack } from '@chakra-ui/react';
import { FiPackage, FiCheckCircle, FiCalendar, FiPieChart } from 'react-icons/fi';
import { ChartType, BaseChartData, StatCardType } from '@/lib/types/visualization.type';
import { InnovationData } from '@/lib/types/dashboard.type';
import useDataFetch from '@/hooks/useFetchData';
import { DASHBOARD_PREFIX } from '@/lib/constants/api.contants';
import OverlaySpinner from '@/components/Loading/OverlayLoading';
import { StatCard } from '@/components/Visualization/Card/DynamicStatCard';
import { DynamicChart } from '@/components/Visualization/Chart/DynamicChart';
import { ResponseApi } from '@/lib/types/api.type';

const InnovationDashboard: React.FC = () => {
  const { data, loading } = useDataFetch<ResponseApi<InnovationData>>(DASHBOARD_PREFIX.INNOVATION);
  if (loading) return <OverlaySpinner show />

  const statCards: StatCardType[] = [
    {
      title: 'Total Innovations',
      value: data?.data?.totalInnovations.toString(),
      icon: FiPackage,
      trend: 'neutral',
      change: 0,
    },
    {
      title: 'Approved Innovations',
      value: (data?.data?.statusDistribution.find(item => item._id === 'approved')?.count || 0).toString(),
      icon: FiCheckCircle,
      trend: 'neutral',
      change: 0,
    },
    {
      title: 'Pending Innovations',
      value: (data?.data?.statusDistribution.find(item => item._id === 'pending')?.count || 0).toString(),
      icon: FiCheckCircle,
      trend: 'neutral',
      change: 0,
    },
    {
      title: "This Month's Submissions",
      value: (data?.data?.monthlySubmissions[0]?.count || 0).toString(),
      icon: FiCalendar,
      trend: 'neutral',
      change: 0,
    },
    {
      title: 'Top Category',
      value: data?.data?.categoryDistribution[0]?._id || 'N/A',
      icon: FiPieChart,
      trend: 'neutral',
      change: 0,
    },
  ];

  const categoryChartData: BaseChartData = {
    labels: data?.data?.categoryDistribution.map(item => item._id),
    datasets: [
      {
        label: 'Category Distribution',
        data: data?.data?.categoryDistribution.map(item => item.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
      },
    ],
  };

  const ratingChartData: BaseChartData = {
    labels: data?.data?.averageRatings.map(item => item._id),
    datasets: [
      {
        label: 'Average Ratings',
        data: data?.data?.averageRatings.map(item => item.averageRating),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  return (
    <Box p={6}>
      <Heading mb={6}>Innovation Dashboard</Heading>
      <Grid templateColumns="repeat(4, 1fr)" gap={6} mb={6}>
        {statCards.map((card, index) => (
          <StatCard key={index} {...card} />
        ))}
      </Grid>
      <VStack spacing={6} align="stretch">
        <DynamicChart
          type={ChartType.Bar}
          data={categoryChartData}
          title="Category Distribution"
          height={400}
        />
        <DynamicChart
          type={ChartType.Line}
          data={ratingChartData}
          title="Average Ratings by Category"
          height={400}
        />
      </VStack>
    </Box>
  );
};


export default InnovationDashboard;