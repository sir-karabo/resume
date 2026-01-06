import React from 'react';
import Sidebar from '@/components/Sidebar';
import MainContent from '@/components/MainContent';
import resumeData from '@/data/resume.json';
import projectsData from '@/data/projects.json';

function App() {
    return (
        <div className="app-container">
            <Sidebar
                personalInfo={resumeData.personal_info}
                skills={resumeData.core_skills}
                languages={resumeData.languages}
            />
            <MainContent
                personalInfo={resumeData.personal_info}
                summary={resumeData.professional_summary}
                experience={resumeData.professional_experience}
                education={resumeData.education}
                projects={projectsData}
            />
        </div>
    );
}

export default App;
