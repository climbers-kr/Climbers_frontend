import client from './client';

//로그인
export const login=({username, password})=>
    client.post('/api/auth/login', {username, password});

//회원가입
export const register=({username, password})=>
    client.post('/api/auth/register', {username, password});

//사용자 이름 중복 확인
export const checkUserConflict=({username})=>
    client.post('/api/auth/checkUserConflict', {username});

//전화번호 중복 확인
export const checkPhoneConflict=({phone})=>
    client.post('/api/auth/checkPhoneConflict', {phone});

//전화번호 인증 요청
export const requestPhoneAuth=({phone})=>
    client.post('/api/auth/requestPhoneAuth', {phone});

//로그인 상태 확인
export const check=()=>client.get('/api/auth/check');

//로그아웃
export const logout=()=>client.post('/api/auth/logout');