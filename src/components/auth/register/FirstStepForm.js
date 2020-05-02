import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import React from "react";
import ErrorMessage from '../ErrorMessage';
import styled from "styled-components";
import palette from "../../../lib/styles/palette";

const Footer=styled.div`
    margin-top: 2rem;
    text-align: right;
    a{
        color: ${palette.gray[6]};
        text-decoration: underline;
        &:hover{
            color: ${palette.gray[9]};
        }
    }
`;

export default function FirstStepForm({onChange, form, usernameError, onSubmit, classes, error}){
    //const classes = useStyles();
    return (
        <form onSubmit={onSubmit} className={classes.form}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="phone"
                label="전화번호"
                type="tel"
                autoComplete="phone"
                id="phone"
                autoFocus
                onChange={onChange}
                value={form.phone}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="사용자 이름"
                name="username"
                autoComplete="username"
                onChange={onChange}
                value={form.username}
            />
            {usernameError && <ErrorMessage>{usernameError}</ErrorMessage>}
            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="이름"
                name="name"
                autoComplete="name"
                onChange={onChange}
                value={form.name}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="비밀번호"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={onChange}
                value={form.password}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="passwordConfirm"
                label="비밀번호 확인"
                type="password"
                id="passwordConfirm"
                autoComplete="new-password"
                onChange={onChange}
                value={form.passwordConfirm}
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                회원가입
            </Button>
            <Footer container>
                <Link to="/login">LOGIN</Link>
            </Footer>

        </form>
    )
};