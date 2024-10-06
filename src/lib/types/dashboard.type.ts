export interface InnovationData {
  totalInnovations: number;
  statusDistribution: { _id: string; count: number }[];
  monthlySubmissions: { _id: { month: number; year: number }; count: number }[];
  categoryDistribution: { _id: string; count: number }[];
  averageRatings: { _id: string; averageRating: number }[];
}

export interface UserStatistics {
  userRoleDistribution: { _id: string; count: number }[];
  newUserTrend: any[]; // This is empty in the provided data, but we'll keep it for future use
  innovatorStats: any[]; // This is empty in the provided data, but we'll keep it for future use
  verificationStats: { _id: boolean; count: number }[];
  authMethodStats: { _id: string; count: number }[];
}
