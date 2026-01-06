import React, { useEffect } from 'react';
import './ProjectDetail.css';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import { getTechIcon } from './ProjectGrid';

const ProjectDetail = ({ project, projects = [], onBack, onNavigate }) => {

    // Scroll to top when detail view opens or project changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [project.id]);

    // Scroll Animation Observer
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, [project]);

    if (!project) return null;

    // Navigation Logic
    const currentIndex = projects.findIndex(p => p.id === project.id);
    const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
    const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

    const handleNavigate = (targetProject) => {
        if (targetProject && onNavigate) {
            onNavigate(targetProject);
        }
    };

    // Related Projects Logic
    const relatedProjects = projects
        .filter(p => p.category === project.category && p.id !== project.id)
        .slice(0, 3); // Limit to 3

    return (
        <article className="project-detail-container">
            <div className="detail-nav-bar animate-on-scroll">
                <button className="back-btn" onClick={onBack}>
                    <MdArrowBack /> Back to Projects
                </button>

                <div className="project-nav-controls">
                    {prevProject && (
                        <button className="nav-arrow-btn" onClick={() => handleNavigate(prevProject)} title="Previous Project">
                            <MdArrowBack /> Prev
                        </button>
                    )}
                    {nextProject && (
                        <button className="nav-arrow-btn" onClick={() => handleNavigate(nextProject)} title="Next Project">
                            Next <MdArrowForward />
                        </button>
                    )}
                </div>
            </div>

            <header className="detail-header animate-on-scroll">
                <h1 className="detail-title">{project.title}</h1>
                <div className="detail-meta">
                    <span>{project.year}</span>
                    <span>•</span>
                    <span>{project.role}</span>
                    <span>•</span>
                    <span>{project.category}</span>
                </div>
            </header>

            <div className="detail-image animate-on-scroll">
                {project.image ? (
                    <img src={project.image} alt={project.title} className="detail-img-cover" />
                ) : (
                    <div className="detail-image-placeholder">
                        {project.title} Preview
                    </div>
                )}
            </div>

            <div className="detail-content">
                <section className="content-block animate-on-scroll">
                    <h3>The Problem</h3>
                    <p>{project.problem}</p>
                </section>

                <section className="content-block animate-on-scroll">
                    <h3>Approach & Solution</h3>
                    <p>{project.approach}</p>
                </section>

                <section className="content-block animate-on-scroll">
                    <h3>The Outcome</h3>
                    <p>{project.outcome}</p>
                </section>

                {project.link && (
                    <section className="content-block animate-on-scroll">
                        <h3>Project Link</h3>
                        <p>
                            <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)', textDecoration: 'underline' }}>
                                View Live Project / Source Code
                            </a>
                        </p>
                    </section>
                )}
            </div>

            <footer className="tech-section animate-on-scroll">
                <h3>Technologies Used</h3>
                <div className="tech-list">
                    {project.techStack && project.techStack.map((tech, idx) => (
                        <div key={idx} className="tech-item" title={tech}>
                            {getTechIcon(tech)}
                        </div>
                    ))}
                </div>
            </footer>

            {/* Related Projects Section */}
            {relatedProjects.length > 0 && (
                <section className="related-projects-section animate-on-scroll">
                    <h3>Related Projects</h3>
                    <div className="related-grid">
                        {relatedProjects.map(p => (
                            <div key={p.id} className="related-card" onClick={() => handleNavigate(p)}>
                                <div className="related-image">
                                    {p.image ? <img src={p.image} alt={p.title} /> : <div className="related-placeholder">{p.title}</div>}
                                </div>
                                <h4>{p.title}</h4>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </article>
    );
};

export default ProjectDetail;
