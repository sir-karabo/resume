import React, { useEffect } from 'react';
import './ProjectDetail.css';
import { MdArrowBack } from 'react-icons/md';
import { getTechIcon } from './ProjectGrid';

const ProjectDetail = ({ project, onBack }) => {

    // Scroll to top when detail view opens
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!project) return null;

    return (
        <article className="project-detail-container">
            <button className="back-btn" onClick={onBack}>
                <MdArrowBack /> Back to Projects
            </button>

            <header className="detail-header">
                <h1 className="detail-title">{project.title}</h1>
                <div className="detail-meta">
                    <span>{project.year}</span>
                    <span>•</span>
                    <span>{project.role}</span>
                    <span>•</span>
                    <span>{project.category}</span>
                </div>
            </header>

            <div className="detail-image">
                <div className="detail-image-placeholder">
                    {project.title} Preview
                </div>
                {/* Real image support logic can go here later */}
            </div>

            <div className="detail-content">
                <section className="content-block">
                    <h3>The Problem</h3>
                    <p>{project.problem}</p>
                </section>

                <section className="content-block">
                    <h3>Approach & Solution</h3>
                    <p>{project.approach}</p>
                </section>

                <section className="content-block">
                    <h3>The Outcome</h3>
                    <p>{project.outcome}</p>
                </section>

                {project.link && (
                    <section className="content-block">
                        <h3>Project Link</h3>
                        <p>
                            <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)', textDecoration: 'underline' }}>
                                View Live Project / Source Code
                            </a>
                        </p>
                    </section>
                )}
            </div>

            <footer className="tech-section">
                <h3>Technologies Used</h3>
                <div className="tech-list">
                    {project.techStack && project.techStack.map((tech, idx) => (
                        <div key={idx} className="tech-item" title={tech}>
                            {getTechIcon(tech)}
                        </div>
                    ))}
                </div>
            </footer>
        </article>
    );
};

export default ProjectDetail;
