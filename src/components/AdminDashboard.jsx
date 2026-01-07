import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import { MdDashboard, MdEditDocument, MdWork, MdExitToApp, MdArrowBack } from 'react-icons/md';
import { FaRobot, FaPenFancy } from 'react-icons/fa';

const AdminDashboard = ({ onBack }) => {
    // Auth State
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('adminToken'));
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // State for Sections
    const [currentSection, setCurrentSection] = useState(null); // null (grid), 'resume', 'projects', 'ai-jobs'

    // Editor State
    const [editorContent, setEditorContent] = useState('');
    const [updateStatus, setUpdateStatus] = useState('');

    // AI Job Matcher State
    const [isSearchingJobs, setIsSearchingJobs] = useState(false);
    const [jobResults, setJobResults] = useState(null);

    // Check auth on load
    useEffect(() => {
        if (token) {
            setIsAuthenticated(true);
        }
    }, [token]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            if (res.ok) {
                const data = await res.json();
                localStorage.setItem('adminToken', data.token);
                setToken(data.token);
                setIsAuthenticated(true);
                setError('');
            } else {
                setError('Invalid credentials');
            }
        } catch (err) {
            setError('Login failed');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        setToken(null);
        setIsAuthenticated(false);
        setCurrentSection(null);
        if (onBack) onBack();
    };

    const fetchContent = async (key) => {
        setUpdateStatus('Loading...');
        setCurrentSection(key);
        try {
            const res = await fetch(`/api/data/${key}`);
            if (res.ok) {
                const data = await res.json();
                setEditorContent(JSON.stringify(data, null, 4));
                setUpdateStatus('');
            }
        } catch (err) {
            setUpdateStatus('Error loading data');
        }
    };

    const handleSave = async () => {
        setUpdateStatus('Saving...');
        try {
            const json = JSON.parse(editorContent);
            const res = await fetch(`/api/data/${currentSection}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(json)
            });

            if (res.ok) {
                setUpdateStatus('Saved successfully!');
                setTimeout(() => setUpdateStatus(''), 3000);
            } else {
                setUpdateStatus('Save failed.');
            }
        } catch (err) {
            setUpdateStatus('Invalid JSON syntax');
        }
    };

    const handleAIJobSearch = () => {
        setIsSearchingJobs(true);
        setJobResults(null);

        // Simulate AI Processing Time
        setTimeout(() => {
            setIsSearchingJobs(false);
            setJobResults([
                {
                    id: 1,
                    title: "Senior Full Stack Engineer",
                    company: "TechFlow Solutions",
                    matchScore: 95,
                    reason: "Strong match for React, Node.js, and System Architecture skills.",
                    email: "careers@techflow.example.com",
                    link: "#"
                },
                {
                    id: 2,
                    title: "Backend Specialist (fintech)",
                    company: "Vault Systems",
                    matchScore: 88,
                    reason: "Matches your background in secure transaction systems and Java.",
                    email: "hr@vaultsystems.io",
                    link: "#"
                },
                {
                    id: 3,
                    title: "Lead Remote Developer",
                    company: "Global Connect",
                    matchScore: 82,
                    reason: "Good fit for your remote work experience and leadership history.",
                    email: "jobs@globalconnect.co",
                    link: "#"
                }
            ]);
        }, 2000);
    };

    if (!isAuthenticated) {
        return (
            <div className="auth-container">
                <div className="auth-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <h2 className="admin-title" style={{ fontSize: '1.5rem', margin: 0 }}>Admin Access</h2>
                        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)' }}>
                            <MdArrowBack size={20} />
                        </button>
                    </div>
                    <form onSubmit={handleLogin}>
                        <input
                            type="text"
                            className="auth-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                        />
                        <input
                            type="password"
                            className="auth-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                        {error && <p style={{ color: 'red', fontSize: '0.9rem', marginBottom: '1rem' }}>{error}</p>}
                        <button type="submit" className="admin-btn">Login</button>
                    </form>
                </div>
            </div>
        );
    }

    // MAIN DASHBOARD LAYOUT
    return (
        <div className="admin-layout">

            {/* Sidebar Navigation */}
            <aside className="admin-sidebar">
                <div style={{ marginBottom: '3rem' }}>
                    <h2 className="admin-title" style={{ fontSize: '1.5rem' }}>Control Panel</h2>
                </div>

                <nav>
                    <div className={`admin-nav-item ${!currentSection ? 'active' : ''}`} onClick={() => setCurrentSection(null)}>
                        <MdDashboard size={20} /> Dashboard
                    </div>
                    <div className={`admin-nav-item ${currentSection === 'resume' ? 'active' : ''}`} onClick={() => fetchContent('resume')}>
                        <MdEditDocument size={20} /> Edit Resume
                    </div>
                    <div className={`admin-nav-item ${currentSection === 'projects' ? 'active' : ''}`} onClick={() => fetchContent('projects')}>
                        <FaPenFancy size={18} /> Blog / Projects
                    </div>
                    <div className={`admin-nav-item ${currentSection === 'ai-jobs' ? 'active' : ''}`} onClick={() => { setCurrentSection('ai-jobs'); setUpdateStatus(''); }}>
                        <FaRobot size={18} /> AI Job Matcher
                    </div>
                </nav>

                <div style={{ marginTop: 'auto' }}>
                    <div className="admin-nav-item" onClick={handleLogout} style={{ color: 'var(--text-light)' }}>
                        <MdExitToApp size={20} /> Logout & Exit
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="admin-content">

                {/* 1. DASHBOARD HOME (GRID) */}
                {!currentSection && (
                    <div className="fade-in">
                        <header className="admin-header">
                            <div>
                                <h1 className="admin-title">Welcome back, Admin.</h1>
                                <p style={{ color: 'var(--text-secondary)' }}>Select a tool to manage your portfolio.</p>
                            </div>
                        </header>

                        <div className="admin-grid">
                            <div className="admin-card" onClick={() => fetchContent('resume')}>
                                <MdEditDocument className="card-icon" />
                                <h3 className="card-title">Resume Editor</h3>
                                <p className="card-desc">Update your professional experience, education, and skills in real-time.</p>
                            </div>

                            <div className="admin-card" onClick={() => fetchContent('projects')}>
                                <FaPenFancy className="card-icon" />
                                <h3 className="card-title">Project Blog</h3>
                                <p className="card-desc">Write case studies, upload project details, and manage your portfolio blog.</p>
                            </div>

                            <div className="admin-card" onClick={() => setCurrentSection('ai-jobs')}>
                                <FaRobot className="card-icon" />
                                <h3 className="card-title">AI Job Matcher</h3>
                                <p className="card-desc">Let AI analyze market trends and find jobs that match your profile.</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* 2. EDITORS (RESUME & PROJECTS) */}
                {(currentSection === 'resume' || currentSection === 'projects') && (
                    <div className="fade-in">
                        <header className="admin-header">
                            <div>
                                <h2 className="admin-title">{currentSection === 'resume' ? 'Resume Data' : 'Project Blog'}</h2>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <span style={{
                                    color: updateStatus.includes('Error') || updateStatus.includes('Invalid') ? '#d32f2f' : '#388e3c',
                                    fontWeight: '500'
                                }}>
                                    {updateStatus}
                                </span>
                                <button onClick={handleSave} className="admin-btn" style={{ width: 'auto', padding: '0.8rem 2rem' }}>
                                    Save Changes
                                </button>
                            </div>
                        </header>

                        <textarea
                            className="json-editor"
                            value={editorContent}
                            onChange={(e) => setEditorContent(e.target.value)}
                        />
                        <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-light)' }}>
                            * You are editing the raw {currentSection} JSON data. Ensure syntax is correct before saving.
                        </p>
                    </div>
                )}

                {/* 3. AI JOB MATCHER */}
                {currentSection === 'ai-jobs' && (
                    <div className="fade-in">
                        <header className="admin-header">
                            <h2 className="admin-title">AI Job Intelligence</h2>
                        </header>

                        <div style={{
                            background: 'var(--bg-card)',
                            padding: '3rem',
                            borderRadius: 'var(--radius-lg)',
                            border: '1px solid var(--border-subtle)',
                            textAlign: 'center',
                            marginBottom: '2rem'
                        }}>
                            <FaRobot size={48} style={{ color: 'var(--accent-green)', marginBottom: '1rem' }} />
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: '400' }}>Find Your Next Role</h3>
                            <p style={{ maxWidth: '600px', margin: '0 auto 2rem', color: 'var(--text-secondary)' }}>
                                Our advanced AI algorithm scans over 50 job boards to find positions that match your specific skill set and experience level.
                            </p>

                            {!isSearchingJobs && !jobResults && (
                                <button onClick={handleAIJobSearch} className="admin-btn" style={{ width: 'auto', padding: '1rem 3rem' }}>
                                    Start Analysis
                                </button>
                            )}
                            {isSearchingJobs && (
                                <div style={{ color: 'var(--accent-green)', fontWeight: 'bold' }}>
                                    Processing...
                                </div>
                            )}
                        </div>

                        {jobResults && (
                            <div className="admin-grid">
                                {jobResults.map(job => (
                                    <div key={job.id} className="admin-card" style={{ cursor: 'default' }}>
                                        <div style={{ flex: 1 }}>
                                            <h4 style={{ color: 'var(--accent-green)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{job.title}</h4>
                                            <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>@{job.company}</div>
                                            <p className="card-desc" style={{ marginBottom: '1rem' }}>{job.reason}</p>
                                        </div>
                                        <div style={{ width: '100%', marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '0.85rem', fontWeight: 'bold', background: '#e0f2f1', color: '#004d40', padding: '4px 8px', borderRadius: '4px' }}>
                                                {job.matchScore}% Match
                                            </span>
                                            <a href={`mailto:${job.email}`} style={{ textDecoration: 'none', color: 'var(--font-body)', fontSize: '0.9rem', fontWeight: '500', borderBottom: '1px solid currentColor' }}>
                                                Email HR &rarr;
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

            </main>
        </div>
    );
};

export default AdminDashboard;
