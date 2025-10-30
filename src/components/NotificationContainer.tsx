// 'use client'

// import { useNotification } from './NotificationContext'
// import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react'

// export default function NotificationContainer() {
//   const { notifications, removeNotification } = useNotification()

//   // Agar koi notification nahi hai toh kuch nahi dikhayenge
//   if (notifications.length === 0) return null

//   // Har notification type ke liye different icon
//   const getIcon = (type: string) => {
//     switch (type) {
//       case 'success':
//         return <CheckCircle className="w-5 h-5" />
//       case 'error':
//         return <XCircle className="w-5 h-5" />
//       case 'warning':
//         return <AlertCircle className="w-5 h-5" />
//       default:
//         return <Info className="w-5 h-5" />
//     }
//   }

//   // Har notification type ke liye different color scheme
//   const getStyles = (type: string) => {
//     switch (type) {
//       case 'success':
//         return 'bg-green-50 border-green-200 text-green-800'
//       case 'error':
//         return 'bg-red-50 border-red-200 text-red-800'
//       case 'warning':
//         return 'bg-yellow-50 border-yellow-200 text-yellow-800'
//       default:
//         return 'bg-blue-50 border-blue-200 text-blue-800'
//     }
//   }

//   return (
//     <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm w-full">
//       {notifications.map((notification) => (
//         <div
//           key={notification.id}
//           className={`p-4 rounded-lg border shadow-lg transform transition-all duration-300 ease-in-out ${getStyles(notification.type)}`}
//         >
//           <div className="flex items-start">
//             <div className="flex-shrink-0 mt-0.5">
//               {getIcon(notification.type)}
//             </div>
//             <div className="ml-3 flex-1">
//               <p className="text-sm font-medium">{notification.message}</p>
//             </div>
//             <button
//               onClick={() => removeNotification(notification.id)}
//               className="ml-4 flex-shrink-0 rounded-md hover:bg-black hover:bg-opacity-10 p-1 transition-colors"
//             >
//               <X className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }