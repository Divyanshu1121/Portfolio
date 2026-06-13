import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Mail, Phone, MapPin, Copy, Check } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('aryashah325@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('http://localhost:8000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error("Connection to backend failed:", err);
      // Fail gracefully: let user know we couldn't reach the API, but save log locally or display error
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2 className="section-title">
          Let's <span className="text-gradient">Connect</span>
        </h2>

        <div className="contact-layout">
          {/* Direct Contact Info */}
          <div className="contact-info">
            <h3 className="info-title">Let's build something remarkable together</h3>
            <p className="info-desc">
              Have a role, project, or automation challenge you want to discuss? Fill out the form or reach out directly. I usually respond within 24 hours.
            </p>

            <div className="info-list">
              <div className="info-item">
                <div className="info-icon-box">
                  <Mail size={18} />
                </div>
                <div className="info-text">
                  <span>Email</span>
                  <div className="copy-email-row">
                    <a href="mailto:aryashah325@gmail.com">aryashah325@gmail.com</a>
                    <button className="copy-btn" onClick={copyEmail} title="Copy Email">
                      {copied ? <Check size={14} className="success-icon" /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon-box">
                  <Phone size={18} />
                </div>
                <div className="info-text">
                  <span>Phone</span>
                  <a href="tel:+917405201227">+91 7405201227</a>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon-box">
                  <MapPin size={18} />
                </div>
                <div className="info-text">
                  <span>Location</span>
                  <p>Surat, Gujarat, India (395002)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="contact-card">
            {status === 'success' ? (
              <div className="form-success-state">
                <CheckCircle2 size={50} className="success-check-icon" />
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for reaching out, Arya. I will get in touch with you shortly.</p>
                <button onClick={() => setStatus('idle')} className="glow-btn">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                {status === 'error' && (
                  <div className="form-error-banner">
                    <AlertCircle size={18} />
                    <span>Failed to reach backend API. You can still reach me at <strong>aryashah325@gmail.com</strong>.</span>
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    disabled={status === 'loading'}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    disabled={status === 'loading'}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Opportunity / Collaboration"
                    disabled={status === 'loading'}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message details here..."
                    disabled={status === 'loading'}
                  />
                </div>

                <button 
                  type="submit" 
                  className="submit-btn" 
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <span className="spinner"></span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="simple-footer">
          <p>© {new Date().getFullYear()} Arya Shah. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
}
