'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useNotificationStore } from '@/stores/notificationStore';
import { notificationVariants } from '@/utils/animations';

export default function NotificationSystem() {
  const { notifications, removeNotification } = useNotificationStore();

  return (
    <div
      style={{
        position: 'fixed',
        top: '36px',
        right: '12px',
        zIndex: 99997,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        pointerEvents: 'none',
      }}
    >
      <AnimatePresence>
        {notifications.map((notif) => (
          <motion.div
            key={notif.id}
            variants={notificationVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="notification-toast"
            style={{ pointerEvents: 'auto' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>
                  {notif.title}
                </span>
                <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>now</span>
              </div>
              <button
                onClick={() => removeNotification(notif.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  fontSize: '12px',
                  padding: '0 2px',
                }}
              >
                ×
              </button>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-primary)', marginTop: '4px', lineHeight: 1.4 }}>
              {notif.message}
            </p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
