import React from 'react';
import Button from "@material-ui/core/Button";

const WriteActionButton=({onPublish})=>{

    return (
        <>
            <Button
                type="submit"
                fullWidth
                color="primary"
                variant="contained"
                onClick={onPublish}
            >게시</Button>
        </>
    )
};

export default WriteActionButton;