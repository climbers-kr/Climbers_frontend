import Input from "@material-ui/core/Input/Input";
import Button from "@material-ui/core/Button";
import React, {useCallback} from "react";
import styled from 'styled-components';

const CommentInputBlock=styled.div`
    width: 100%;
    padding: 8px;
    border-top: 1px solid #959593;
`;
const CommentForm=styled.form`
    width: 100%;
    display: flex;
`;
const StyledInput=styled(Input)`
    flex: 1;
    margin: 0 10px 0 10px;
`;
const StyledButton=styled(Button)`

`;
function CommentInput({ reaction, submitComment}) {

    const [input, setInput]=React.useState('');

    const onChange= e =>{
        setInput(e.target.value);

    };

    const onSubmit=useCallback((e)=>{
        e.preventDefault();
        submitComment(input);
    }, [input]);

    return (
        <CommentInputBlock>
            <CommentForm noValidate autoComplete="off" onSubmit={onSubmit}>
                <StyledInput
                    placeholder="댓글 달기..."
                    //onChange={onChangeField}
                    onChange={onChange}
                    name="comment"
                    value={input}
                />
                <StyledButton variant="outlined" color="secondary" disabled={input===''} onClick={onSubmit}>
                    게시
                </StyledButton>
            </CommentForm>
        </CommentInputBlock>
    );
}
export default React.memo(CommentInput)