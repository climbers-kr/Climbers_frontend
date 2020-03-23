import React from 'react';
import VerticalTabs from '../components/community/CommunityTemplate';
import CommunityForm from "../components/community/CommunityForm";


const CommunityPage=()=>{
    return (
        <VerticalTabs>
            <CommunityForm
                value={true}
            />
        </VerticalTabs>
    );
};

export default CommunityPage;