import Input from "@material-ui/core/Input/Input";
import Button from "@material-ui/core/Button";
import React, {useCallback} from "react";
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import Loadable from 'react-loadable';

const LoadableModal = Loadable({
    loader: () => import('../../common/AskLoginModal'),
    loading() {
        return <div>Loading...</div>
    }
});
const CommentInputBlock=styled.div`
    width: 100%;
    padding: 8px;
    border-top: 1px solid #b3b3b1;
`;
const CommentForm=styled.form`
    width: 100%;
    display: flex;
`;
const StyledInput=styled(Input)`
    flex: 1;
    margin: 0 10px 0 10px;
`;
const ButtonWrapper=styled.div`
   position: relative;
`;
const ProgressWrapper=styled.div`
   position: absolute;
   display: flex;
   top: 0;
   margin: auto;
   width: 100%;
   height: 100%;
   justify-content: center;
   align-items: center;
  
`;

function CommentInput({ submitComment, onChangeField, loading, user }) {
    //Note: reaction 로딩 상태는 loading 모듈이 아닌 posts 배열 각각의 요소 내부에서 관리
    const [input, setInput]=React.useState('');
    const [modal, setModal]=React.useState(false);
    const onUnauthorizedClick=(e)=>{
        console.log('click called')
        setModal(true);
    };
    const onCancel=()=>{
        setModal(false);
    };
    const onChange=useCallback((e)=>{
        setInput(e.target.value);
        onChangeField(e);
    }, []);

    const onSubmit=useCallback((e)=>{
        e.preventDefault();
        submitComment(input);
        setInput('');
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
                    //disabled={loading || !user}
                    disabled={loading}
                    color="secondary"
                    onClick={!user && onUnauthorizedClick}
                    //value={(post.reaction && post.reaction.comment) || ''}
                />
                <ButtonWrapper>
                    <Button
                        variant="outlined"
                        color="secondary"
                        disabled={input==='' || loading}
                        onClick={onSubmit}
                    >
                        게시
                    </Button>
                    {loading &&
                        <ProgressWrapper>
                            <CircularProgress size={24} />
                        </ProgressWrapper>
                    }
                </ButtonWrapper>
                <LoadableModal
                    visible={modal}
                    onClose={onCancel}
                    onCancel={onCancel}
                    title="simple-modal-title"
                    description="simple-modal-description"
                />

            </CommentForm>
        </CommentInputBlock>
    );
}

export default CommentInput;