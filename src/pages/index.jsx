import Layout from "./Layout.jsx";

import Dashboard from "./Dashboard";

import People from "./People";
import PersonDetail from "./PersonDetail";
import PeopleSkills from "./PeopleSkills";
import PeopleInterests from "./PeopleInterests";
import PeopleRecommend from "./PeopleRecommend";
import PeopleAdd from "./PeopleAdd";

import Actions from "./Actions";

import Projects from "./Projects";

import Summary from "./Summary";

import Settings from "./Settings";

import ThoughtEntry from "./ThoughtEntry";

import HypothesisDetail from "./HypothesisDetail";

import HypothesisList from "./HypothesisList";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Dashboard: Dashboard,
    
    People: People,
    PeopleSkills: PeopleSkills,
    PeopleInterests: PeopleInterests,
    PeopleRecommend: PeopleRecommend,
    PeopleAdd: PeopleAdd,
    
    Actions: Actions,
    
    Projects: Projects,
    
    Summary: Summary,
    
    Settings: Settings,
    
    ThoughtEntry: ThoughtEntry,
    
    HypothesisDetail: HypothesisDetail,
    
    HypothesisList: HypothesisList,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    // PersonDetailの場合は'PersonDetail'を返す
    if (url.includes('/people/') && urlLastPart !== 'people' && 
        !['skills', 'interests', 'recommend', 'add'].includes(urlLastPart)) {
        return 'PersonDetail';
    }

    // PeopleOS関連のページをチェック
    if (url.includes('/people/skills')) {
        return 'PeopleSkills';
    }
    if (url.includes('/people/interests')) {
        return 'PeopleInterests';
    }
    if (url.includes('/people/recommend')) {
        return 'PeopleRecommend';
    }
    if (url.includes('/people/add')) {
        return 'PeopleAdd';
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<Dashboard />} />
                
                
                <Route path="/Dashboard" element={<Dashboard />} />
                
                <Route path="/people" element={<People />} />
                <Route path="/people/:id" element={<PersonDetail />} />
                <Route path="/people/skills" element={<PeopleSkills />} />
                <Route path="/people/interests" element={<PeopleInterests />} />
                <Route path="/people/recommend" element={<PeopleRecommend />} />
                <Route path="/people/add" element={<PeopleAdd />} />
                <Route path="/People" element={<People />} />
                <Route path="/PeopleSkills" element={<PeopleSkills />} />
                <Route path="/PeopleInterests" element={<PeopleInterests />} />
                <Route path="/PeopleRecommend" element={<PeopleRecommend />} />
                <Route path="/PeopleAdd" element={<PeopleAdd />} />
                
                <Route path="/Actions" element={<Actions />} />
                
                <Route path="/Projects" element={<Projects />} />
                
                <Route path="/Summary" element={<Summary />} />
                
                <Route path="/Settings" element={<Settings />} />
                
                <Route path="/ThoughtEntry" element={<ThoughtEntry />} />
                
                <Route path="/HypothesisDetail" element={<HypothesisDetail />} />
                
                <Route path="/HypothesisList" element={<HypothesisList />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}