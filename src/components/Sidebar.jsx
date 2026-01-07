import React from 'react';
import { FaDownload, FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { MdEmail, MdLocationOn, MdCalendarToday } from 'react-icons/md';
import './Sidebar.css';

const Sidebar = ({ personalInfo, skills, languages, onProfileClick }) => {
    return (
        <aside className="sidebar">
            <div className="sidebar-card profile-card">
                <div
                    className="profile-image-container"
                    onClick={onProfileClick}
                    style={{ cursor: 'pointer' }}
                    title="Access Admin Dashboard"
                >
                    {personalInfo.image ? (
                        <img src={personalInfo.image} alt={personalInfo.full_name} className="profile-image" />
                    ) : (
                        <div className="profile-placeholder">
                            <span>Profile Img</span>
                        </div>
                    )}
                </div>

                <h2 className="profile-name">{personalInfo.full_name}</h2>
                <p className="profile-email">{personalInfo.email}</p>
                <p className="profile-degree">{personalInfo.title}</p>

                <a href="#" className="download-btn">
                    Download CV <span className="icon"><FaDownload /></span>
                </a>
            </div>

            <div className="sidebar-card info-card">
                <h3>Information</h3>
                <ul className="info-list">
                    <li>
                        <span className="label">Location</span>
                        <span className="value">{personalInfo.location}</span>
                    </li>
                    {personalInfo.experience && (
                        <li>
                            <span className="label">Experience</span>
                            <span className="value">{personalInfo.experience}</span>
                        </li>
                    )}
                    <li>
                        <span className="label">Degree</span>
                        <span className="value">{personalInfo.degree}</span>
                    </li>
                    <li>
                        <span className="label">Availability</span>
                        <span className="value appointment-open">{personalInfo.availability}</span>
                    </li>
                </ul>
            </div>

            <div className="sidebar-card skills-card">
                <h3>Technical Skills</h3>
                <div className="skills-wrap">
                    {skills.technical && skills.technical.map((skill, index) => (
                        <span key={index} className="skill-tag">{skill}</span>
                    ))}
                </div>
            </div>

            <div className="sidebar-card skills-card">
                <h3>Support & Admin</h3>
                <div className="skills-wrap">
                    {skills.support_administration && skills.support_administration.map((skill, index) => (
                        <span key={index} className="skill-tag skill-tag-secondary">{skill}</span>
                    ))}
                </div>
            </div>

            <div className="sidebar-card languages-card">
                <h3>Language</h3>
                <div className="skills-wrap">
                    {languages.map((lang, index) => (
                        <span key={index} className="skill-tag language-tag">{lang}</span>
                    ))}
                </div>
            </div>

            <div className="sidebar-footer">
                <div className="social-links">
                    {personalInfo.linkedin && (
                        <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <FaLinkedin />
                        </a>
                    )}
                    {personalInfo.github && (
                        <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <FaGithub />
                        </a>
                    )}
                    <a href={`mailto:${personalInfo.email}`} aria-label="Email">
                        <MdEmail />
                    </a>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
