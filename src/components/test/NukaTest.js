import React, {useCallback, useRef} from 'react';
import Carousel from 'nuka-carousel';
import styled from "styled-components";
import url from '../../images/climbing.jpg';
const CarouselBox=styled.div`
    width: 100%;
    height: 350px;

`;
const ItemDiv=styled.div`
  width: 100%;
  height: 100%;
  background: red;
  display: flex;
  flex-direction: row;
  img{
    width: 100%;
    flex: 1;
  }
`;

const FlexItem=styled.div`
    flex: 1;
`
export default function NukaTest() {
/*
    const test=(image)=>{
        console.log(image.offsetWidth, image.offsetHeight)
    }*/
    const test=useCallback(
        image=>{
            console.log(image.offsetWidth, image.offsetHeight)
        },
        [],
    );
    let imgEl=null; //이미지 크기 구하기
    return (
        <CarouselBox>
            <Carousel>
                <ItemDiv>
                    <FlexItem>
                        <img src={url} alt="test" ref={el => imgEl = el} onLoad={() => console.log(imgEl.naturalHeight)} />
                    </FlexItem>
                    <FlexItem>
                        <img src={url} alt="test"/>
                    </FlexItem>
                    <FlexItem>
                        <img src={url} alt="test"/>
                    </FlexItem>
                </ItemDiv>
                <ItemDiv src={url} alt="test"/>
                <ItemDiv src={url} alt="test"/>
                <ItemDiv src={url} alt="test"/>
                <ItemDiv src={url} alt="test"/>
            </Carousel>
        </CarouselBox>

    );

}