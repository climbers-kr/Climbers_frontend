import Input from "@material-ui/core/Input/Input";
import Button from "@material-ui/core/Button";
import React from "react";
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
export default function CommentInput({comment, reaction, onChangeField, post}) {
    return (
        <CommentInputBlock>
            <CommentForm noValidate autoComplete="off">
                <StyledInput
                    placeholder="댓글 달기..."
                    reaction={reaction}
                    onChange={onChangeField}
                    name="comment"

                />
                <StyledButton variant="outlined" color="secondary" disabled={true}>
                    게시
                </StyledButton>
            </CommentForm>
        </CommentInputBlock>
    );
}