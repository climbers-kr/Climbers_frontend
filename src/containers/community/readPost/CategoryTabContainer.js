import React, {useEffect, useCallback} from 'react';
import CategoryTab from '../../../components/community/postList/CategoryTab';
import {selectCategory} from '../../../modules/posts';
import {useDispatch, useSelector} from "react-redux";
import {withRouter} from 'react-router-dom';

function CategoryTabContainer({history}){
    const dispatch=useDispatch();
    const { category }=useSelector(({posts})=>({
        category: posts.category,
    }));

    const onChangeCategory=useCallback((category)=> {
            console.log(category)
            dispatch(selectCategory(category));
        },[dispatch]);

    useEffect(()=> {
        if(category) {
            history.push(`/community?category=${category}`);
        }else{
            history.push(`/community`);
        }
    }, [history, category]);
    return (
        <CategoryTab
            onChangeCategory={onChangeCategory}
            category={category}
        />)
}
export default withRouter(CategoryTabContainer);