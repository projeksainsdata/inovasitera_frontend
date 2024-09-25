const DashboardHomePage = () => {
  return (
    <>
    <h1 className="text-center font-bold">Dashboard</h1>
    </>
  )
}

export default DashboardHomePage






















// /* eslint-disable tailwindcss/no-custom-classname */
// import { DashboardData } from '@/lib/types/models.type';
// import React from 'react';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts';
// import { PieChart, Pie, Cell } from 'recharts';

// const DashboardHomePage: React.FC<{ data: DashboardData }> = ({ data }) => {
//   const COLORS = ['#134158', '#8884d8', '#82ca9d', '#ffc658'];

//   return (
//     <div className="min-h-screen bg-white p-8">
//       <h1 className="text-colorBlue mb-8 text-4xl font-bold">Dashboard</h1>
//       <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//         {/* User Growth Chart */}
//         <div className="rounded-lg bg-white p-6 shadow-md">
//           <h2 className="text-colorBlue mb-4 text-xl font-semibold">
//             User Growth
//           </h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={data.user.userGrowth}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis
//                 dataKey="createdAt"
//                 tickFormatter={(value) => new Date(value).toLocaleDateString()}
//               />
//               <YAxis />
//               <Tooltip
//                 labelFormatter={(value) => new Date(value).toLocaleString()}
//                 formatter={(value) => [value, 'New Users']}
//               />
//               <Line
//                 type="monotone"
//                 dataKey="_count.id"
//                 stroke="#134158"
//                 strokeWidth={2}
//                 dot={{ fill: '#134158', strokeWidth: 2 }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Role Distribution Chart */}
//         <div className="rounded-lg bg-white p-6 shadow-md">
//           <h2 className="text-colorBlue mb-4 text-xl font-semibold">
//             Role Distribution
//           </h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={data.user.roleDistribution}
//                 dataKey="_count.id"
//                 nameKey="role"
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={80}
//                 fill="#8884d8"
//                 label
//               >
//                 {data.user.roleDistribution.map((entry: any, index) => (
//                   <Cell
//                     key={`cell-${index}-${entry.role}`}
//                     fill={COLORS[index % COLORS.length]}
//                   />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Article Statistics */}
//         <div className="rounded-lg bg-white p-6 shadow-md">
//           <h2 className="text-colorBlue mb-4 text-xl font-semibold">
//             Article Statistics
//           </h2>
//           <p className="text-colorBlue text-2xl font-bold">
//             {data.article.totalArticles}
//           </p>
//           <p className="text-gray-600">Total Articles</p>
//           <h3 className="text-colorBlue mb-2 mt-4 text-lg font-semibold">
//             Popular Categories
//           </h3>
//           <ul className="list-inside list-disc">
//             {data.article.popularCategories.map((category, index) => (
//               <li key={index} className="text-gray-600">
//                 {category.name} ({category._count.artikel})
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Event Statistics */}
//         <div className="rounded-lg bg-white p-6 shadow-md">
//           <h2 className="text-colorBlue mb-4 text-xl font-semibold">
//             Event Statistics
//           </h2>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <p className="text-colorBlue text-2xl font-bold">
//                 {data.event.totalEvents}
//               </p>
//               <p className="text-gray-600">Total Events</p>
//             </div>
//             <div>
//               <p className="text-colorBlue text-2xl font-bold">
//                 {data.event.ongoingEvents}
//               </p>
//               <p className="text-gray-600">Ongoing Events</p>
//             </div>
//             <div>
//               <p className="text-colorBlue text-2xl font-bold">
//                 {data.event.upcomingEvents}
//               </p>
//               <p className="text-gray-600">Upcoming Events</p>
//             </div>
//             <div>
//               <p className="text-colorBlue text-2xl font-bold">
//                 {data.event.pastEvents}
//               </p>
//               <p className="text-gray-600">Past Events</p>
//             </div>
//           </div>
//         </div>

//         {/* Merchant Growth Chart */}
//         <div className="rounded-lg bg-white p-6 shadow-md">
//           <h2 className="text-colorBlue mb-4 text-xl font-semibold">
//             Merchant Growth
//           </h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={data.merchant.merchantGrowth}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis
//                 dataKey="createdAt"
//                 tickFormatter={(value) => new Date(value).toLocaleDateString()}
//               />
//               <YAxis />
//               <Tooltip
//                 labelFormatter={(value) => new Date(value).toLocaleString()}
//                 formatter={(value) => [value, 'New Users']}
//               />
//               <Line
//                 type="monotone"
//                 dataKey="_count.id"
//                 stroke="#134158"
//                 strokeWidth={2}
//                 dot={{ fill: '#134158', strokeWidth: 2 }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Member Statistics */}
//         <div className="rounded-lg bg-white p-6 shadow-md">
//           <h2 className="text-colorBlue mb-4 text-xl font-semibold">
//             Member Statistics
//           </h2>
//           <p className="text-colorBlue text-2xl font-bold">
//             {data.member.totalMembers}
//           </p>
//           <p className="text-gray-600">Total Members</p>
//           <h3 className="text-colorBlue mb-2 mt-4 text-lg font-semibold">
//             Position Distribution
//           </h3>
//           <ul className="list-inside list-disc">
//             {data.member.positionDistribution.map((position, index) => (
//               <li key={index} className="text-gray-600">
//                 {position.position} ({position._count.id})
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardHomePage;
