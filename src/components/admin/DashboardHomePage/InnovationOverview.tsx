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
      title: 'Total Inovasi',
      value: data?.data?.totalInnovations.toString(),
      icon: FiPackage,
      trend: 'neutral',
      change: 0,
    },
    {
      title: 'Sudah Setujui',
      value: (data?.data?.statusDistribution.find((item: { _id: string; count: number }) => item._id === 'approved')?.count || 0).toString(),
      icon: FiCheckCircle,
      trend: 'neutral',
      change: 0,
    },
    {
      title: 'Belum Disetujui',
      value: (data?.data?.statusDistribution.find((item: { _id: string; count: number }) => item._id === 'pending')?.count || 0).toString(),
      icon: FiCheckCircle,
      trend: 'neutral',
      change: 0,
    },
    {
      title: 'Ditolak',
      value: (data?.data?.statusDistribution.find((item: { _id: string; count: number }) => item._id === 'rejected')?.count || 0).toString(),
      icon: FiCheckCircle,
      trend: 'neutral',
      change: 0,
    },
    {
      title: "Inovasi Bulan Ini",
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
    labels: data?.data?.categoryDistribution.map((item: { _id: string; count: number }) => item._id),
    datasets: [
      {
        label: 'Total Kategori',
        data: data?.data?.categoryDistribution.map((item: { _id: string; count: number }) => item.count),
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
    labels: data?.data?.averageRatings.map((item: { _id: string; averageRating: number }) => item._id),
    datasets: [
      {
        label: 'Average Ratings',
        data: data?.data?.averageRatings.map((item: { _id: string; averageRating: number }) => item.averageRating),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  return (
    <Box>
      <Heading mb={6}>Dashboard Inovasi</Heading>
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
          title="Rata-rata Rating per Kategori"
          height={400}
        />
      </VStack>
    </Box>
  );
};


export default InnovationDashboard;