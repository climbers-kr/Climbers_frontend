import React, {useEffect} from 'react';
import DaumPostcode from 'react-daum-postcode';

export default function PostCode({onSelectLocation, handleClose}){

    useEffect(()=>{
        console.dir(PostCode);
    },[PostCode]);
    const handleComplete = (data) => {
        onSelectLocation(data); //test redux
        handleClose();
    };

    return (
        <>
            <DaumPostcode
            onComplete={handleComplete}
            width='100%'
            />
        </>
    );
}