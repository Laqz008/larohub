'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
  Bell, 
  X, 
  Check, 
  Clock, 
  Users, 
  MapPin, 
  Calendar,
  Trophy,
  MessageCircle,
  UserPlus,
  AlertCircle,
  Star
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { GameButton } from '@/components/ui/game-button';
import { formatTime, formatDate } from '@/lib/utils';

interface Notification {
  id: string;
  type: 'game_reminder' | 'game_update' | 'player_joined' | 'player_left' | 'message' | 'game_cancelled' | 'game_starting';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  gameId?: string;
  userId?: string;
  priority: 'low' | 'medium' | 'high';
  actionUrl?: string;
}

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

// Mock notifications
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'game_starting',
    title: 'Game Starting Soon!',
    message: 'Friday Night Pickup starts in 30 minutes at Venice Beach Courts',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    isRead: false,
    gameId: '1',
    priority: 'high',
    actionUrl: '/games/1'
  },
  {
    id: '2',
    type: 'player_joined',
    title: 'New Player Joined',
    message: 'SpeedDemon joined your Saturday Morning Scrimmage',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    isRead: false,
    gameId: '2',
    userId: 'user4',
    priority: 'medium',
    actionUrl: '/games/2'
  },
  {
    id: '3',
    type: 'message',
    title: 'New Message',
    message: 'PickupKing: "Don\'t forget to bring water bottles!"',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    isRead: true,
    gameId: '1',
    priority: 'low',
    actionUrl: '/games/1'
  },
  {
    id: '4',
    type: 'game_reminder',
    title: 'Game Tomorrow',
    message: 'Elite Training Session is scheduled for tomorrow at 4:00 PM',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    isRead: true,
    gameId: '3',
    priority: 'medium',
    actionUrl: '/games/3'
  },
  {
    id: '5',
    type: 'game_update',
    title: 'Game Updated',
    message: 'Court location changed for Sunday League Championship',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    isRead: true,
    gameId: '4',
    priority: 'high',
    actionUrl: '/games/4'
  }
];

export function NotificationCenter({ isOpen, onClose, className }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread' | 'games' | 'messages'>('all');

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'game_starting': return <AlertCircle className="w-5 h-5 text-red-400" />;
      case 'game_reminder': return <Clock className="w-5 h-5 text-blue-400" />;
      case 'game_update': return <Calendar className="w-5 h-5 text-yellow-400" />;
      case 'player_joined': return <UserPlus className="w-5 h-5 text-court-400" />;
      case 'player_left': return <Users className="w-5 h-5 text-orange-400" />;
      case 'message': return <MessageCircle className="w-5 h-5 text-primary-400" />;
      case 'game_cancelled': return <X className="w-5 h-5 text-red-400" />;
      default: return <Bell className="w-5 h-5 text-primary-400" />;
    }
  };

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-blue-500';
      default: return 'border-l-primary-500';
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === notificationId ? { ...notif, isRead: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, isRead: true })));
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
  };

  const filteredNotifications = notifications.filter(notif => {
    switch (filter) {
      case 'unread': return !notif.isRead;
      case 'games': return ['game_reminder', 'game_update', 'game_starting', 'game_cancelled', 'player_joined', 'player_left'].includes(notif.type);
      case 'messages': return notif.type === 'message';
      default: return true;
    }
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return formatDate(timestamp);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Notification Panel */}
          <motion.div
            className={cn(
              'fixed top-0 right-0 h-full w-full max-w-md bg-gradient-to-br from-dark-300/95 to-dark-400/95 backdrop-blur-sm border-l border-primary-400/20 z-50',
              className
            )}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-primary-400/20">
              <div>
                <h2 className="text-xl font-display font-bold text-white">Notifications</h2>
                {unreadCount > 0 && (
                  <p className="text-sm text-primary-300">{unreadCount} unread</p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <GameButton variant="ghost" size="sm" onClick={markAllAsRead}>
                    <Check className="w-4 h-4" />
                  </GameButton>
                )}
                <GameButton variant="ghost" size="sm" onClick={onClose}>
                  <X className="w-4 h-4" />
                </GameButton>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex space-x-1 p-4 bg-dark-200/30">
              {[
                { id: 'all', label: 'All', count: notifications.length },
                { id: 'unread', label: 'Unread', count: unreadCount },
                { id: 'games', label: 'Games', count: notifications.filter(n => ['game_reminder', 'game_update', 'game_starting', 'game_cancelled', 'player_joined', 'player_left'].includes(n.type)).length },
                { id: 'messages', label: 'Messages', count: notifications.filter(n => n.type === 'message').length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id as any)}
                  className={cn(
                    'flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all',
                    filter === tab.id
                      ? 'bg-primary-500 text-white'
                      : 'text-primary-300 hover:text-primary-100 hover:bg-primary-400/10'
                  )}
                >
                  <span>{tab.label}</span>
                  {tab.count > 0 && (
                    <span className={cn(
                      'px-1.5 py-0.5 rounded-full text-xs',
                      filter === tab.id ? 'bg-white/20' : 'bg-primary-500/20'
                    )}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto">
              {filteredNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <Bell className="w-16 h-16 text-primary-400 mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">No notifications</h3>
                  <p className="text-sm text-primary-300">
                    {filter === 'unread' ? 'All caught up!' : 'You\'ll see notifications here when they arrive.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-1 p-4">
                  {filteredNotifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      className={cn(
                        'relative p-4 rounded-lg border-l-4 transition-all duration-200 cursor-pointer',
                        notification.isRead 
                          ? 'bg-dark-200/30 hover:bg-dark-200/50' 
                          : 'bg-primary-500/10 hover:bg-primary-500/20',
                        getPriorityColor(notification.priority)
                      )}
                      onClick={() => {
                        markAsRead(notification.id);
                        if (notification.actionUrl) {
                          window.location.href = notification.actionUrl;
                        }
                      }}
                      whileHover={{ x: 4 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="flex items-start space-x-3">
                        {/* Icon */}
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <h4 className={cn(
                              'font-medium truncate',
                              notification.isRead ? 'text-primary-200' : 'text-white'
                            )}>
                              {notification.title}
                            </h4>
                            <div className="flex items-center space-x-2 ml-2">
                              <span className="text-xs text-primary-400 whitespace-nowrap">
                                {getTimeAgo(notification.timestamp)}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNotification(notification.id);
                                }}
                                className="text-primary-400 hover:text-red-400 transition-colors"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                          
                          <p className={cn(
                            'text-sm mt-1 line-clamp-2',
                            notification.isRead ? 'text-primary-300' : 'text-primary-200'
                          )}>
                            {notification.message}
                          </p>

                          {/* Priority indicator */}
                          {notification.priority === 'high' && !notification.isRead && (
                            <div className="flex items-center space-x-1 mt-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                              <span className="text-xs text-red-400 font-medium">High Priority</span>
                            </div>
                          )}
                        </div>

                        {/* Unread indicator */}
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0 mt-2" />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-primary-400/20">
              <div className="flex items-center justify-between text-sm">
                <span className="text-primary-300">
                  {filteredNotifications.length} notification{filteredNotifications.length !== 1 ? 's' : ''}
                </span>
                <GameButton variant="ghost" size="sm">
                  Settings
                </GameButton>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
