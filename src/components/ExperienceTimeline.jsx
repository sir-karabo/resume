import React from 'react';
import './ExperienceTimeline.css';
import { MdWork, MdSchool } from 'react-icons/md';

const ExperienceTimeline = ({ experience, education }) => {
    return (
        <section className="section-container">
            <h2 className="section-title">BScIT Resume</h2>

            <div className="timeline-section">
                <h3 className="subsection-title">Corporate Experience</h3>
                <div className="timeline">
                    {experience.map((job) => (
                        <div key={job.id} className="timeline-item">
                            <div className="timeline-icon">
                                <MdWork />
                            </div>
                            <div className="timeline-content">
                                <div className="timeline-header">
                                    <h4 className="role-title">{job.role}</h4>
                                    <span className="job-type">{job.type}</span>
                                </div>
                                <div className="timeline-meta">
                                    <span className="company">{job.company}</span>
                                    <span className="location">{job.location}</span>
                                    <span className="date">{job.period}</span>
                                </div>
                                <p className="job-description">{job.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="timeline-section">
                <h3 className="subsection-title">Education</h3>
                <div className="timeline">
                    {education.map((edu) => (
                        <div key={edu.id} className="timeline-item">
                            <div className="timeline-icon education-icon">
                                <MdSchool />
                            </div>
                            <div className="timeline-content">
                                <h4 className="role-title">{edu.degree}</h4>
                                <div className="timeline-meta">
                                    <span className="company">{edu.institution}</span>
                                    <span className="location">{edu.location}</span>
                                    <span className="date">{edu.period}</span>
                                </div>
                                {edu.focus && <p className="job-description">{edu.focus}</p>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExperienceTimeline;
