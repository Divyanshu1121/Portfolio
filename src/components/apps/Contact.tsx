'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { contactInfo } from '@/data/portfolio';
import { staggerContainer, staggerItem } from '@/utils/animations';
import { useNotificationStore } from '@/stores/notificationStore';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const { addNotification } = useNotificationStore();

  const handleAction = (item: typeof contactInfo[0]) => {
    if (item.action === 'mailto' && item.url) {
      window.open(item.url, '_blank');
    } else if (item.action === 'link' && item.url) {
      window.open(item.url, '_blank');
    } else if (item.action === 'copy') {
      navigator.clipboard.writeText(item.value);
      addNotification({ title: 'DivyanshuOS', message: '✅ Copied to clipboard!', icon: '📋' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    // Build WhatsApp message with form details
    const waMessage = `Hi Divyanshu! 👋

*Name:* ${form.name}
*Email:* ${form.email}
*Subject:* ${form.subject}

*Message:*
${form.message}`;

    const waUrl = `https://wa.me/919173150179?text=${encodeURIComponent(waMessage)}`;

    // Small delay for UX feel, then open WhatsApp
    setTimeout(() => {
      window.open(waUrl, '_blank');
      setSent(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      addNotification({ title: 'DivyanshuOS', message: '✅ Opening WhatsApp to send your message!', icon: '💬' });
      setSending(false);
    }, 600);
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <motion.h2
        variants={staggerItem}
        style={{
          fontSize: '20px',
          fontWeight: 600,
          marginBottom: '16px',
          background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Let&apos;s build something.
      </motion.h2>

      {/* Contact Cards */}
      <motion.div
        variants={staggerItem}
        style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' }}
      >
        {contactInfo.map((item) => (
          <div
            key={item.type}
            className="card"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 14px',
              cursor: item.action !== 'none' ? 'pointer' : 'default',
            }}
            onClick={() => handleAction(item)}
          >
            {item.type === 'github' ? (
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="currentColor"
                style={{ color: 'var(--text-primary)' }}
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            ) : (
              <span style={{ fontSize: '18px' }}>{item.icon}</span>
            )}
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.label}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-primary)' }}>{item.value}</div>
            </div>
            {item.action === 'copy' && (
              <span style={{ marginLeft: 'auto', fontSize: '10px', color: 'var(--text-muted)' }}>Click to copy</span>
            )}
            {item.action === 'link' && (
              <span style={{ marginLeft: 'auto', fontSize: '10px', color: 'var(--text-muted)' }}>↗</span>
            )}
          </div>
        ))}
      </motion.div>

      {/* Availability */}
      <motion.div
        variants={staggerItem}
        className="card"
        style={{
          padding: '12px',
          marginBottom: '16px',
          borderLeft: '3px solid var(--accent-green)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
          <span style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'var(--accent-green)',
            display: 'inline-block',
            boxShadow: '0 0 8px rgba(40, 200, 64, 0.4)',
          }} />
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--accent-green)' }}>
            Open to Opportunities
          </span>
        </div>
        <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: 0 }}>
          Available for: Full-time · Internship · Freelance · Response time: &lt; 24 hours
        </p>
      </motion.div>

      {/* Contact Form */}
      {!sent ? (
        <motion.form variants={staggerItem} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Name"
            className="input-field"
            required
          />
          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Email"
            type="email"
            className="input-field"
            required
          />
          <input
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            placeholder="Subject"
            className="input-field"
            required
          />
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Message"
            className="input-field"
            rows={3}
            required
          />
          <button type="submit" className="btn-primary" disabled={sending}>
            {sending ? 'Opening WhatsApp...' : '💬 Send via WhatsApp →'}
          </button>
        </motion.form>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card"
          style={{ textAlign: 'center', padding: '24px' }}
        >
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>💬</div>
          <p style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 500 }}>
            WhatsApp opened! Your message is ready to send to Divyanshu.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
