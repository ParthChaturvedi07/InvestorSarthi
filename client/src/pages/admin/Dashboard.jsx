import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ProjectList } from "./ProjectList";

// Simple Toast
const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === "error" ? "bg-red-500" : "bg-green-500";

  return (
    <div
      className={`fixed top-4 right-4 ${bgColor} text-white px-4 py-2 rounded-lg shadow-lg z-50`}
    >
      {message}
    </div>
  );
};

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      setToast({ message: "Logged out successfully", type: "success" });
      setTimeout(() => navigate("/@dmin-panel/login"), 1500);
    } catch {
      setToast({ message: "Failed to logout", type: "error" });
    } finally {
      setIsLoggingOut(false);
    }
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good evening";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-800">
            Investor Sarthi Admin
          </h1>
          <div className="flex items-center space-x-4">
            <span className="hidden md:block text-slate-600">
              {user?.email}
            </span>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition disabled:opacity-50"
            >
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Greeting */}
        <section className="mb-8 bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold text-slate-800">
            {getGreeting()}, {user?.username || "Admin"} 👋
          </h2>
          <p className="text-slate-600">
            {currentTime.toLocaleString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </section>

        {/* Projects */}
        <section className="bg-white p-6 rounded-xl shadow">
          <ProjectList />
        </section>
      </main>
    </div>
  );
};

// import React, { useState, useEffect } from "react";
// import { useAuth } from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { ProjectList } from "./ProjectList";

// // Toast Component
// const Toast = ({ message, type = "success", onClose }) => {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       onClose();
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, [onClose]);

//   const bgColor = type === "error" ? "bg-red-500" : "bg-green-500";

//   return (
//     <div className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-4 rounded-lg shadow-lg z-50 transform transition-all duration-300 ease-in-out`}>
//       <div className="flex items-center justify-between">
//         <span className="text-sm font-medium">{message}</span>
//         <button
//           onClick={onClose}
//           className="ml-4 text-white hover:text-gray-200 transition-colors duration-200"
//         >
//           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// };

// // Stats Card Component
// const StatsCard = ({ title, value, icon, color = "blue", trend }) => {
//   const colorClasses = {
//     blue: "from-blue-500 to-blue-600",
//     green: "from-green-500 to-green-600",
//     purple: "from-purple-500 to-purple-600",
//     orange: "from-orange-500 to-orange-600"
//   };

//   return (
//     <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-slate-500 text-sm font-medium">{title}</p>
//           <p className="text-3xl font-bold text-slate-800 mt-1">{value}</p>
//           {trend && (
//             <div className="flex items-center mt-2 text-sm">
//               <svg className="w-4 h-4 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17l9.2-9.2M17 17V7H7" />
//               </svg>
//               <span className="text-green-600 font-medium">{trend}</span>
//             </div>
//           )}
//         </div>
//         <div className={`w-12 h-12 bg-gradient-to-r ${colorClasses[color]} rounded-xl flex items-center justify-center shadow-lg`}>
//           {icon}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Quick Actions Component
// const QuickActions = () => {
//   const actions = [
//     {
//       title: "Add New Project",
//       description: "Create a new real estate project",
//       icon: (
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
//         </svg>
//       ),
//       color: "from-blue-500 to-blue-600"
//     },
//     {
//       title: "View Reports",
//       description: "Analytics and performance reports",
//       icon: (
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//         </svg>
//       ),
//       color: "from-green-500 to-green-600"
//     },
//     {
//       title: "Manage Users",
//       description: "User accounts and permissions",
//       icon: (
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
//         </svg>
//       ),
//       color: "from-purple-500 to-purple-600"
//     },
//     {
//       title: "Settings",
//       description: "System configuration and preferences",
//       icon: (
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//         </svg>
//       ),
//       color: "from-orange-500 to-orange-600"
//     }
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//       {actions.map((action, index) => (
//         <button
//           key={index}
//           className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-left group"
//         >
//           <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
//             {action.icon}
//           </div>
//           <h3 className="font-semibold text-slate-800 mb-2">{action.title}</h3>
//           <p className="text-sm text-slate-500">{action.description}</p>
//         </button>
//       ))}
//     </div>
//   );
// };

// export const Dashboard = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const [toast, setToast] = useState(null);
//   const [isLoggingOut, setIsLoggingOut] = useState(false);
//   const [currentTime, setCurrentTime] = useState(new Date());

//   // Update time every minute
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 60000);
//     return () => clearInterval(timer);
//   }, []);

//   const showToast = (message, type = "success") => {
//     setToast({ message, type });
//   };

//   const hideToast = () => {
//     setToast(null);
//   };

//   const handleLogout = async () => {
//     setIsLoggingOut(true);
//     try {
//       showToast("Logging out...", "success");
//       await logout();
//       setTimeout(() => {
//         navigate("/@dmin-panel/login");
//       }, 1500);
//     } catch (error) {
//       showToast("Failed to logout. Please try again.", "error");
//     } finally {
//       setIsLoggingOut(false);
//     }
//   };

//   const getGreeting = () => {
//     const hour = currentTime.getHours();
//     if (hour < 12) return "Good morning";
//     if (hour < 17) return "Good afternoon";
//     return "Good evening";
//   };

//   const formatTime = (date) => {
//     return date.toLocaleString('en-US', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
//       {/* Toast Notification */}
//       {toast && (
//         <Toast
//           message={toast.message}
//           type={toast.type}
//           onClose={hideToast}
//         />
//       )}

//       {/* Header */}
//       <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-white/20 sticky top-0 z-40">
//         <div className="max-w-7xl mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             {/* Logo/Brand */}
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
//                 <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                 </svg>
//               </div>
//               <div>
//                 <h1 className="text-xl font-bold text-slate-800">Real Estate Admin</h1>
//                 <p className="text-sm text-slate-500">Management Dashboard</p>
//               </div>
//             </div>

//             {/* User Profile & Actions */}
//             <div className="flex items-center space-x-4">
//               {/* Notifications */}
//               <button className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all duration-200">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5zM10.07 2.82a3.98 3.98 0 013.86 0L20 6.5v11l-6.07 3.68a3.98 3.98 0 01-3.86 0L4 17.5v-11l6.07-3.68z" />
//                 </svg>
//                 <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//               </button>

//               {/* User Profile */}
//               <div className="flex items-center space-x-3 bg-slate-100/50 rounded-2xl p-2">
//                 <div className="w-10 h-10 bg-gradient-to-r from-slate-400 to-slate-500 rounded-xl flex items-center justify-center text-white font-semibold shadow-sm">
//                   {user?.username?.charAt(0)?.toUpperCase() || 'A'}
//                 </div>
//                 <div className="hidden md:block">
//                   <p className="text-sm font-semibold text-slate-800">{user?.username}</p>
//                   <p className="text-xs text-slate-500">{user?.email}</p>
//                 </div>
//               </div>

//               {/* Logout Button */}
//               <button
//                 onClick={handleLogout}
//                 disabled={isLoggingOut}
//                 className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-xl hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-red-200 transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
//               >
//                 {isLoggingOut ? (
//                   <div className="flex items-center space-x-2">
//                     <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                     <span className="hidden md:inline">Logging out...</span>
//                   </div>
//                 ) : (
//                   <div className="flex items-center space-x-2">
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                     </svg>
//                     <span className="hidden md:inline">Logout</span>
//                   </div>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-6 py-8">
//         {/* Welcome Section */}
//         <div className="mb-8">
//           <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-white/20">
//             <div className="flex flex-col md:flex-row md:items-center justify-between">
//               <div>
//                 <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
//                   {getGreeting()}, {user?.username}! 👋
//                 </h2>
//                 <p className="text-slate-600">Welcome back to your dashboard. Here's what's happening today.</p>
//                 <p className="text-sm text-slate-500 mt-2">{formatTime(currentTime)}</p>
//               </div>
//               <div className="mt-4 md:mt-0">
//                 <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
//                   <div className="flex items-center space-x-2">
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
//                     </svg>
//                     <span>New Project</span>
//                   </div>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <StatsCard
//             title="Total Projects"
//             value="24"
//             icon={
//               <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//               </svg>
//             }
//             color="blue"
//             trend="+12% this month"
//           />
//           <StatsCard
//             title="Active Listings"
//             value="156"
//             icon={
//               <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//               </svg>
//             }
//             color="green"
//             trend="+8% this week"
//           />
//           <StatsCard
//             title="Total Revenue"
//             value="$2.4M"
//             icon={
//               <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
//               </svg>
//             }
//             color="purple"
//             trend="+15% this quarter"
//           />
//           <StatsCard
//             title="New Inquiries"
//             value="38"
//             icon={
//               <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//               </svg>
//             }
//             color="orange"
//             trend="+5% today"
//           />
//         </div>

//         {/* Quick Actions */}
//         <div className="mb-8">
//           <h3 className="text-xl font-semibold text-slate-800 mb-4">Quick Actions</h3>
//           <QuickActions />
//         </div>

//         {/* Projects Section */}
//         <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 p-6">
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="text-xl font-semibold text-slate-800">Recent Projects</h3>
//             <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
//               View All Projects →
//             </button>
//           </div>
//           <ProjectList />
//         </div>
//       </div>
//     </div>
//   );
// };
