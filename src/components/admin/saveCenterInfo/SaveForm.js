import React from 'react';
import styled, {css} from 'styled-components';
import FormTemplate from './FormTemplate';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import LocationSearchContainer from '../../../containers/admin/saveCenterInfo/LocationSearchContainer';
import SiteBox from './SiteBox';
import PriceBox from './PriceBox';
import Select from '@material-ui/core/Select';

const InputLabel=styled.label`
    display: grid;
    grid-template-columns: 1fr 3fr;
    background: skyblue;
    width: 80%;
    align-items: center;
`;
const StyledInput=styled(OutlinedInput)`
    height: 40px;
    ${props =>
    props.right &&
    css`
        grid-column: 2 / 3;
        margin-bottom: 4px;
    `}  
`;
const testSite=[1,2,3,4 ];


const SaveForm=({type, form, onChange, onSubmit, prices, sites, onChangeSites, onChangePricess})=>{
    const [state, setState] = React.useState({
        age: '',
        name: 'hai',
    });
    const handleChange = (event) => {
        const name = event.target.name;
        console.dir(event)
        setState({
            ...state,
            [name]: event.target.value,
        });
    };
    return (
        <FormTemplate>

                <InputLabel>
                    <h3>Title</h3>
                    <StyledInput />
                </InputLabel>
                <InputLabel>
                    <h3>Location</h3>
                    <LocationSearchContainer/>
                    <StyledInput right disabled={true}/>
                    <StyledInput placeholder="상세주소 입력" right />
                </InputLabel>
                <InputLabel>
                    <h3>Contact</h3>
                    <StyledInput/>
                </InputLabel>
                <InputLabel>
                    <h3>Site</h3>
                    <SiteBox tags={sites} onChangeSites={onChangeSites}/>
                </InputLabel>
                <InputLabel>
                    <h3>Price</h3>

                    <PriceBox tags={prices} onChangeSites={onChangePricess}/>

                </InputLabel>

        </FormTemplate>
    )

};

export default SaveForm;