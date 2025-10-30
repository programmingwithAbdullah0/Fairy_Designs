// 'use client'

// import React, { createContext, useContext, useState } from 'react'

// // Types define karenge
// interface Notification {
//   id: string
//   message: string
//   type: 'success' | 'error' | 'warning' | 'info'
//   duration?: number
// }

// interface NotificationContextType {
//   notifications: Notification[]
//   addNotification: (message: string, type?: Notification['type'], duration?: number) => void
//   removeNotification: (id: string) => void
// }

// // Context create karenge
// const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

// // Provider component banayenge
// export function NotificationProvider({ children }: { children: React.ReactNode }) {
//   const [notifications, setNotifications] = useState<Notification[]>([])

//   // Naya notification add karne ka function
//   const addNotification = (message: string, type: Notification['type'] = 'info', duration = 4000) => {
//     const id = Math.random().toString(36).substring(2, 9)
//     const newNotification: Notification = { id, message, type, duration }
    
//     setNotifications(prev => [...prev, newNotification])

//     // Auto remove after duration
//     if (duration > 0) {
//       setTimeout(() => {
//         removeNotification(id)
//       }, duration)
//     }
//   }

//   // Notification remove karne ka function
//   const removeNotification = (id: string) => {
//     setNotifications(prev => prev.filter(notification => notification.id !== id))
//   }

//   return (
//     <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
//       {children}
//     </NotificationContext.Provider>
//   )
// }

// // Custom hook banayenge
// export function useNotification() {
//   const context = useContext(NotificationContext)
//   if (context === undefined) {
//     throw new Error('useNotification must be used within a NotificationProvider')
//   }
//   return context
// }