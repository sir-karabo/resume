import React, { useState } from 'react';
import ExperienceTimeline from './ExperienceTimeline';
import ProjectGrid from './ProjectGrid';
import ProjectDetail from './ProjectDetail';
import ContactForm from './ContactForm';

import { FaLinkedin, FaGithub, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import './MainContent.css';

const MainContent = ({ personalInfo, summary, experience, education, projects }) => {
    // Navigation State
    const [activeTab, setActiveTab] = useState('career');
    const [selectedProject, setSelectedProject] = useState(null);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSelectedProject(null); // Reset detail view when changing tabs
    };

    return (
        <main className="main-content">
            {/* Sticky Header with Intro & Tabs */}
            <header className="content-header">
                <div className="intro-mini">
                    <h1>Hello, I'm <span className="highlight">{personalInfo.full_name}</span>.</h1>
                    <p>{summary}</p>
                </div>

                <nav className="minimal-nav">
                    <button
                        className={`nav-btn ${activeTab === 'career' ? 'active' : ''}`}
                        onClick={() => handleTabChange('career')}
                    >
                        Career
                    </button>
                    <button
                        className={`nav-btn ${activeTab === 'case-study' ? 'active' : ''}`}
                        onClick={() => handleTabChange('case-study')}
                    >
                        Case Studies
                    </button>
                    <button
                        className={`nav-btn ${activeTab === 'connect' ? 'active' : ''}`}
                        onClick={() => handleTabChange('connect')}
                    >
                        Connect
                    </button>
                </nav>
            </header>

            {/* Content Slide Area - Only renders active tab */}
            <div className="content-viewport">

                {activeTab === 'career' && (
                    <div className="slide-content fade-in">
                        <ExperienceTimeline experience={experience} education={education} />
                    </div>
                )}

                {activeTab === 'case-study' && (
                    <div className="slide-content fade-in">
                        {selectedProject ? (
                            <ProjectDetail
                                project={selectedProject}
                                projects={projects}
                                onBack={() => setSelectedProject(null)}
                                onNavigate={setSelectedProject}
                            />
                        ) : (
                            <ProjectGrid
                                projects={projects}
                                onProjectClick={setSelectedProject}
                            />
                        )}
                    </div>
                )}

                {activeTab === 'connect' && (
                    <div className="slide-content fade-in">
                        <ContactForm contact={personalInfo} />
                    </div>
                )}

            </div>
        </main>
    );
};

export default MainContent;


