'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { aiSystemPrompt } from '@/data/portfolio';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const suggestedQuestions = [
  "What's your strongest project?",
  "What AI frameworks do you know?",
  "Tell me about PackVision AI",
  "What's your CGPA?",
  "Do you know Flutter?",
  "Are you open to relocation?",
];

export default function AIAssistant() {
  const [activeTab, setActiveTab] = useState<'chat' | 'jd'>('chat');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [jdInput, setJdInput] = useState('');
  const [jdResult, setJdResult] = useState<string | null>(null);
  const [jdLoading, setJdLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = { role: 'user', content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) throw new Error('API error');

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.response }]);
    } catch {
      // Fallback: use local knowledge base
      const fallbackResponse = generateLocalResponse(text.trim());
      setMessages((prev) => [...prev, { role: 'assistant', content: fallbackResponse }]);
    } finally {
      setLoading(false);
    }
  };

  const analyzeJD = async () => {
    if (!jdInput.trim() || jdLoading) return;
    setJdLoading(true);

    try {
      const response = await fetch('/api/jd-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription: jdInput }),
      });

      if (!response.ok) throw new Error('API error');
      const data = await response.json();
      setJdResult(data.analysis);
    } catch {
      setJdResult(generateLocalJDAnalysis(jdInput));
    } finally {
      setJdLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', margin: '-20px', padding: '0' }}>
      {/* Header */}
      <div style={{
        padding: '14px 20px',
        borderBottom: '0.5px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}>
        <span style={{ fontSize: '24px' }}>🤖</span>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 600, margin: 0 }}>DIVYANSHU-AI</h3>
          <p style={{ fontSize: '10px', color: 'var(--text-muted)', margin: 0 }}>
            Powered by Claude API · <span style={{ color: 'var(--accent-green)' }}>● Online</span>
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '0.5px solid var(--border-subtle)' }}>
        {(['chat', 'jd'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1,
              padding: '8px',
              fontSize: '12px',
              fontWeight: activeTab === tab ? 600 : 400,
              color: activeTab === tab ? 'var(--accent-blue)' : 'var(--text-muted)',
              background: activeTab === tab ? 'rgba(94, 155, 240, 0.06)' : 'transparent',
              border: 'none',
              borderBottom: activeTab === tab ? '2px solid var(--accent-blue)' : '2px solid transparent',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
            }}
          >
            {tab === 'chat' ? '💬 Chat' : '📋 JD Analyser'}
          </button>
        ))}
      </div>

      {/* Chat tab */}
      {activeTab === 'chat' && (
        <>
          <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {messages.length === 0 && (
              <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                  Ask me anything about Divyanshu M. Patel
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
                  {suggestedQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="pill"
                      style={{ cursor: 'pointer', fontSize: '11px' }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}>
                  {msg.role === 'assistant' && (
                    <div style={{ fontSize: '9px', color: 'var(--accent-blue)', marginBottom: '4px', fontWeight: 600 }}>
                      DIVYANSHU-AI
                    </div>
                  )}
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div className="chat-bubble-ai" style={{ padding: '12px 20px' }}>
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div style={{ padding: '12px 16px', borderTop: '0.5px solid var(--border-subtle)', display: 'flex', gap: '8px' }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
              placeholder="Ask about Divyanshu..."
              className="input-field"
              style={{ flex: 1 }}
            />
            <button
              onClick={() => sendMessage(input)}
              className="btn-primary"
              disabled={loading || !input.trim()}
            >
              Send
            </button>
          </div>
        </>
      )}

      {/* JD Analyser tab */}
      {activeTab === 'jd' && (
        <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
          <textarea
            value={jdInput}
            onChange={(e) => setJdInput(e.target.value)}
            placeholder="Paste a job description here..."
            className="input-field"
            style={{ minHeight: '120px', marginBottom: '12px', resize: 'vertical' }}
          />
          <button
            onClick={analyzeJD}
            className="btn-primary"
            disabled={jdLoading || !jdInput.trim()}
            style={{ width: '100%', marginBottom: '16px' }}
          >
            {jdLoading ? 'Analysing...' : 'Analyse Fit →'}
          </button>

          {jdResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
              style={{ padding: '16px', whiteSpace: 'pre-wrap', fontSize: '12px', lineHeight: 1.7, color: 'var(--text-secondary)' }}
            >
              {jdResult}
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}

// Local fallback responses when API isn't available
function generateLocalResponse(question: string): string {
  const q = question.toLowerCase();
  if (q.includes('cgpa') || q.includes('grade'))
    return "My CGPA is 8.14 out of 10 from C.K. Pithawala College of Engineering and Technology. I'm also pursuing an Honours degree in Data Science from Gujarat Technological University with Grade AB.";
  if (q.includes('packvision') || q.includes('packaging'))
    return "PackVision AI is my most impactful project — an end-to-end pharmaceutical packaging inspection system using computer vision. I built dual-stream defect detection with EfficientNetV2B2 + custom CNN, autoencoder anomaly detection with SSIM and VGG perceptual loss, and YOLO models for bottle localisation. Full-stack delivery included a Flutter scanning app, FastAPI backend, and ReactJS dashboard.";
  if (q.includes('strongest') || q.includes('best project'))
    return "My strongest project is PackVision AI — a complete pharmaceutical packaging inspection system using computer vision that I built during my internship at Upnext Software. It uses EfficientNetV2B2, YOLO, and autoencoders, with TFLite on-device inference. It's been used for 1,240+ inspections in production.";
  if (q.includes('flutter'))
    return "Yes, I have hands-on experience with Flutter and Dart! I built the mobile scanning app for PackVision AI using Flutter, integrating camera functionality, Google ML Kit, and TFLite on-device inference.";
  if (q.includes('ai framework') || q.includes('ai') || q.includes('machine learning'))
    return "I work extensively with TensorFlow/Keras, YOLO, OpenCV, and Scikit-learn. I've built production CNN models, autoencoders, and object detection systems. I also have experience with OpenAI API, n8n automation, and TFLite for on-device ML.";
  if (q.includes('relocation') || q.includes('remote'))
    return "I'm based in Surat, Gujarat, India and I'm open to relocation, remote work, or hybrid arrangements. I'm flexible and excited to work with great teams wherever they are.";
  if (q.includes('experience') || q.includes('work'))
    return "I have experience as a Freelance Developer (current), AI/ML + SDE Intern at Upnext Software, and AI Intern at Nerdshouse Technologies. I've built production systems including ERPs, e-commerce platforms, and AI-powered automation.";
  return "I'm Divyanshu M. Patel, a Full-Stack MERN Developer with a CGPA of 8.14/10. I've built SaaS platforms, AI learning assistants, and real client websites. Feel free to ask me about my projects, skills, or experience!";
}

function generateLocalJDAnalysis(jd: string): string {
  const jdLower = jd.toLowerCase();
  const mySkills = [
    'python', 'javascript', 'react', 'fastapi', 'tensorflow', 'pytorch', 'yolo',
    'opencv', 'deep learning', 'machine learning', 'computer vision', 'cnn', 'flutter',
    'node', 'sql', 'mysql', 'rest api', 'git', 'linux', 'docker', 'ci/cd', 'html', 'css',
    'scikit-learn', 'pandas', 'numpy', 'electron',
  ];
  const matched = mySkills.filter((s) => jdLower.includes(s));
  const score = Math.min(95, Math.max(40, Math.round((matched.length / Math.max(mySkills.length * 0.4, 1)) * 100)));

  return `MATCH SCORE: ${score}%\n${'█'.repeat(Math.floor(score / 5))}${'░'.repeat(20 - Math.floor(score / 5))}\n\n✅ Matched Skills (${matched.length}):\n${matched.map(s => `   ${s}`).join('\n') || '   (analyzing...)'}\n\n📝 Note: For a detailed analysis with cover letter generation, please configure the Claude API key in .env.local`;
}
