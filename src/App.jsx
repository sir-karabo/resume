import React from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import resumeData from './data/resume.json';
import projectsData from './data/projects.json';

function App() {
    return (
        <div className="app-container">
            <Sidebar
                profile={resumeData.profile}
                skills={resumeData.skills}
                languages={resumeData.languages}
                social={resumeData.contact}
            />
            <MainContent
                profile={resumeData.profile}
                experience={resumeData.experience}
                education={resumeData.education}
                projects={projectsData}
                contact={resumeData.contact}
            />
        </div>
    );
}

export default App;
