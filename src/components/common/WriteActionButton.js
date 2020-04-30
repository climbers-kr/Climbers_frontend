import React from 'react';
import Button from "@material-ui/core/Button";

const WriteActionButton=({onClick, label})=>{

    return (
        <>
            <Button
                type="submit"
                fullWidth
                color="primary"
                variant="contained"
                onClick={onClick}
            >{label}</Button>
        </>
    )
};

export default WriteActionButton;