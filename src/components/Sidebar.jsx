import React from 'react';
import { FaDownload, FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { MdEmail, MdLocationOn, MdCalendarToday } from 'react-icons/md';
import './Sidebar.css';

const Sidebar = ({ profile, skills, languages, social }) => {
    return (
        <aside className="sidebar">
            <div className="sidebar-card profile-card">
                <div className="profile-image-container">
                    {/* Placeholder for profile image */}
                    <div className="profile-placeholder">
                        <span>Profile Img</span>
                    </div>
                </div>

                <h2 className="profile-name">{profile.fullName}</h2>
                <p className="profile-email">{profile.email}</p>
                <p className="profile-degree">{profile.degree}</p>

                <a href="#" className="download-btn">
                    Download CV <span className="icon"><FaDownload /></span>
                </a>
            </div>

            <div className="sidebar-card info-card">
                <h3>Information</h3>
                <ul className="info-list">
                    <li>
                        <span className="label">Location</span>
                        <span className="value">{profile.location}</span>
                    </li>
                    <li>
                        <span className="label">Experience</span>
                        <span className="value">{profile.experience}</span>
                    </li>
                    <li>
                        <span className="label">Availability</span>
                        <span className="value appointment-open">{profile.availability || 'Appointment Open'}</span>
                    </li>
                </ul>
            </div>

            <div className="sidebar-card skills-card">
                <h3>Skills</h3>
                <div className="skills-wrap">
                    {skills.map((skill, index) => (
                        <span key={index} className="skill-tag">{skill}</span>
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
                    {social.linkedin && (
                        <a href={social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <FaLinkedin />
                        </a>
                    )}
                    {social.github && (
                        <a href={social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <FaGithub />
                        </a>
                    )}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
