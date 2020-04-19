import client from './client';
import qs from 'qs';

export const listCenters=({page, sido, sigungu})=> {
    const queryString = qs.stringify({
        page,
        sido,
        sigungu,
    });
    return client.get(`/api/centers?${queryString}`);
};

export const readCenter=id=>client.get(`/api/centers/${id}`);