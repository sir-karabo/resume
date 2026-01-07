
import React, { useState } from 'react';
import './MainContent.css';

const AdminDashboard = () => {
    // Auth State
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('adminToken'));
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // State for Tabs
    const [currentSection, setCurrentSection] = useState(null); // 'resume', 'projects', 'ai-jobs'

    // Editor State
    const [editorContent, setEditorContent] = useState('');
    const [updateStatus, setUpdateStatus] = useState('');

    // AI Job Matcher State
    const [isSearchingJobs, setIsSearchingJobs] = useState(false);
    const [jobResults, setJobResults] = useState(null);

    // Check auth on load
    React.useEffect(() => {
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
    };

    const fetchContent = async (key) => {
        setUpdateStatus('Loading...');
        setCurrentSection(key);
        try {
            const res = await fetch(`/ api / data / ${key} `);
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
            const res = await fetch(`/ api / data / ${currentSection} `, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token} `
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
            <div className="section-container">
                <h2 className="section-title">Admin Login</h2>
                <div style={{ maxWidth: '400px', margin: '0 auto', background: '#f8f9fa', padding: '2rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                    <form onSubmit={handleLogin} style={{ display: 'grid', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="form-input"
                                style={{ width: '100%' }}
                                placeholder="Enter admin username"
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-input"
                                style={{ width: '100%' }}
                                placeholder="Enter admin password"
                            />
                        </div>
                        {error && <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>}
                        <button type="submit" className="submit-btn" style={{ width: '100%' }}>Login</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="section-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 className="section-title" style={{ margin: 0 }}>Admin Dashboard</h2>
                <button onClick={handleLogout} className="nav-btn" style={{ fontSize: '0.8rem', border: '1px solid var(--border-subtle)' }}>Logout</button>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                <button
                    className={`nav - btn ${currentSection === 'resume' ? 'active' : ''} `}
                    onClick={() => fetchContent('resume')}
                    style={{ border: '1px solid var(--border-subtle)', padding: '0.5rem 1rem' }}
                >
                    Edit Resume
                </button>
                <button
                    className={`nav - btn ${currentSection === 'projects' ? 'active' : ''} `}
                    onClick={() => fetchContent('projects')}
                    style={{ border: '1px solid var(--border-subtle)', padding: '0.5rem 1rem' }}
                >
                    Blog / Edit Projects
                </button>
                <button
                    className={`nav - btn ${currentSection === 'ai-jobs' ? 'active' : ''} `}
                    onClick={() => { setCurrentSection('ai-jobs'); setUpdateStatus(''); }}
                    style={{ border: '1px solid var(--border-subtle)', padding: '0.5rem 1rem' }}
                >
                    AI Job Matcher
                </button>
            </div>

            {/* AI JOB MATCHER SECTION */}
            {currentSection === 'ai-jobs' && (
                <div style={{ animation: 'fadeIn 0.3s' }}>
                    <div style={{
                        background: '#f8f9fa',
                        padding: '2rem',
                        borderRadius: '8px',
                        border: '1px solid var(--border-subtle)',
                        textAlign: 'center'
                    }}>
                        <h3 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>Find Your Perfect Role</h3>
                        <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                            Our AI analyzes your portfolio against live job boards to find the best opportunities for you.
                        </p>

                        {!jobResults && !isSearchingJobs && (
                            <button onClick={handleAIJobSearch} className="submit-btn" style={{ fontSize: '1.1rem', padding: '0.8rem 2rem' }}>
                                🤖 Analyze & Find Jobs
                            </button>
                        )}

                        {isSearchingJobs && (
                            <div style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>
                                Scanning 50+ Job Boards... Analyzing Keywords... Matching Skills...
                            </div>
                        )}
                    </div>

                    {jobResults && (
                        <div style={{ marginTop: '2rem', display: 'grid', gap: '1rem' }}>
                            <h4 style={{ color: 'var(--text-main)' }}>Top Recommendations:</h4>
                            {jobResults.map(job => (
                                <div key={job.id} style={{
                                    padding: '1.5rem',
                                    border: '1px solid var(--border-subtle)',
                                    borderRadius: '8px',
                                    background: 'white',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                    gap: '1rem'
                                }}>
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--primary-color)' }}>{job.title}</h4>
                                        <div style={{ fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.5rem' }}>@{job.company}</div>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>{job.reason}</p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{
                                            display: 'inline-block',
                                            background: '#e6fffa',
                                            color: '#004d40',
                                            padding: '0.3rem 0.8rem',
                                            borderRadius: '20px',
                                            fontSize: '0.85rem',
                                            fontWeight: 'bold',
                                            marginBottom: '0.5rem'
                                        }}>
                                            {job.matchScore}% Match
                                        </div>
                                        <br />
                                        <a href={`mailto:${job.email} `} className="submit-btn" style={{
                                            display: 'inline-block',
                                            textDecoration: 'none',
                                            fontSize: '0.85rem',
                                            padding: '0.5rem 1rem'
                                        }}>
                                            Email HR Manager
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* CONTENT EDITORS */}
            {(currentSection === 'resume' || currentSection === 'projects') && (
                <div style={{ animation: 'fadeIn 0.3s' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <h3>Editing {currentSection === 'resume' ? 'Resume Data' : 'Project Blog Posts'}</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ color: updateStatus.includes('Error') || updateStatus.includes('Invalid') ? 'red' : 'green' }}>
                                {updateStatus}
                            </span>
                            <button onClick={handleSave} className="submit-btn">Save Changes</button>
                        </div>
                    </div>
                    <textarea
                        value={editorContent}
                        onChange={(e) => setEditorContent(e.target.value)}
                        style={{
                            width: '100%',
                            height: '500px',
                            fontFamily: 'monospace',
                            fontSize: '14px',
                            padding: '1rem',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: '4px',
                            lineHeight: '1.5',
                            resize: 'vertical'
                        }}
                    />
                    <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-light)' }}>
                        Hint: You are editing the raw data. New projects will automatically appear in the Case Studies tab.
                    </p>
                </div>
            )}

            {!currentSection && (
                <div style={{
                    padding: '3rem',
                    textAlign: 'center',
                    background: '#f8f9fa',
                    borderRadius: '8px',
                    border: '1px dashed var(--border-subtle)',
                    color: 'var(--text-secondary)'
                }}>
                    Select a tool from the menu above to get started.
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
