import DashboardHomePage from '@/components/admin/DashboardHomePage/InnovationOverview';
import LayoutAdmin from '@/components/admin/layoutAdmin/LayoutAdmin';
// import OverlaySpinner from '@/components/Loading/OverlayLoading';
// import { useAnalyticDashboard } from '@/hooks/useAnalytic';

export default function Page() {
//   const { data, error, loading } = useAnalyticDashboard();
//   if (loading) return <OverlaySpinner show={loading} />;
//   if (error) return <Error statusCode={500} title={error.message} />;

  return (
    <LayoutAdmin>
        <DashboardHomePage/>
        {/* <DashboardHomePage data={data?.data} /> */}
    </LayoutAdmin>
  );
}
