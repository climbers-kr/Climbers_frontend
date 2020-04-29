import React from 'react';
import LinkWrapperFab from "../../common/LinkedFab";

export default function WritePostButton() {
    return (
        <>
            <LinkWrapperFab
                color="primary"
                aria-label="add"
                variant="extended"
                to="/community/write"
            >
                새 게시글
            </LinkWrapperFab>
        </>
    );
}
