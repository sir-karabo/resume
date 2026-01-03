import React, { useState } from 'react';
import ExperienceTimeline from './ExperienceTimeline';
import ProjectGrid from './ProjectGrid';
import ContactForm from './ContactForm';
import { FaLinkedin, FaGithub, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import './MainContent.css';

const MainContent = ({ profile, experience, education, projects, contact }) => {
    // Navigation State
    const [activeTab, setActiveTab] = useState('career');

    return (
        <main className="main-content">
            {/* Sticky Header with Intro & Tabs */}
            <header className="content-header">
                <div className="intro-mini">
                    <h1>Hello, I'm <span className="highlight">{profile.name}</span>.</h1>
                    <p>{profile.summary}</p>
                </div>

                <nav className="minimal-nav">
                    <button
                        className={`nav-btn ${activeTab === 'career' ? 'active' : ''}`}
                        onClick={() => setActiveTab('career')}
                    >
                        Career
                    </button>
                    <button
                        className={`nav-btn ${activeTab === 'case-study' ? 'active' : ''}`}
                        onClick={() => setActiveTab('case-study')}
                    >
                        Case Studies
                    </button>
                    <button
                        className={`nav-btn ${activeTab === 'connect' ? 'active' : ''}`}
                        onClick={() => setActiveTab('connect')}
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
                        <ProjectGrid projects={projects} />
                    </div>
                )}

                {activeTab === 'connect' && (
                    <div className="slide-content fade-in">
                        <ContactForm contact={contact} />
                    </div>
                )}

            </div>
        </main>
    );
};

export default MainContent;
