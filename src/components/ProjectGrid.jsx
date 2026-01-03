import React from 'react';
import './ProjectGrid.css';
import {
    FaEye, FaReact, FaNodeJs, FaLaravel, FaPhp, FaVuejs, FaCss3, FaDatabase, FaJava
} from 'react-icons/fa';
import {
    SiMongodb, SiMysql, SiDotnet, SiMicrosoftsqlserver, SiVite, SiCsharp
} from 'react-icons/si';


export const getTechIcon = (techName) => {
    const normalize = techName.toLowerCase();

    if (normalize.includes('react')) return <FaReact color="#61DAFB" />;
    if (normalize.includes('node')) return <FaNodeJs color="#339933" />;
    if (normalize.includes('mongo')) return <SiMongodb color="#47A248" />;
    if (normalize.includes('laravel')) return <FaLaravel color="#FF2D20" />;
    if (normalize.includes('php')) return <FaPhp color="#777BB4" />;
    if (normalize.includes('vue')) return <FaVuejs color="#4FC08D" />;
    if (normalize.includes('mysql')) return <SiMysql color="#4479A1" />;
    if (normalize.includes('asp.net') || normalize.includes('dotnet')) return <SiDotnet color="#512BD4" />;
    if (normalize.includes('c#')) return <SiCsharp color="#239120" />; // Fallback or specific
    if (normalize.includes('sql server')) return <SiMicrosoftsqlserver color="#CC2927" />;
    if (normalize.includes('vite')) return <SiVite color="#646CFF" />;
    if (normalize.includes('css')) return <FaCss3 color="#1572B6" />;
    if (normalize === 'java' || (normalize.includes('java') && !normalize.includes('script'))) return <FaJava color="#007396" />;

    // Default fallback
    return <FaDatabase color="#ccc" />;
};

const ProjectGrid = ({ projects, onProjectClick }) => {
    return (
        <section className="section-container">
            <div className="projects-grid">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="project-card"
                        onClick={() => onProjectClick && onProjectClick(project)}
                        style={{ cursor: onProjectClick ? 'pointer' : 'default' }}
                    >
                        <div className="project-image">
                            <div className="image-placeholder">
                                {project.title}
                            </div>
                        </div>
                        <div className="project-info">
                            <h4 className="project-title">{project.title}</h4>
                            <p className="project-category">{project.category}</p>

                            <div className="project-description">
                                <p><strong>Problem:</strong> {project.problem}</p>
                                <p style={{ marginTop: '0.5rem' }}><strong>Approach:</strong> {project.approach}</p>
                                <p style={{ marginTop: '0.5rem' }}><strong>Outcome:</strong> {project.outcome}</p>
                            </div>

                            {/* Tech Stack Logos */}
                            <div className="tech-stack-logos" style={{ marginTop: '1.5rem' }}>
                                {project.techStack && project.techStack.map((tech, idx) => (
                                    <div key={idx} className="tech-logo-wrapper" title={tech}>
                                        {getTechIcon(tech)}
                                    </div>
                                ))}
                            </div>

                            {project.link && (
                                <div className="project-links">
                                    <a
                                        href={project.link}
                                        className="project-link"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        View Project <span style={{ fontSize: '0.8em' }}>↗</span>
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProjectGrid;
