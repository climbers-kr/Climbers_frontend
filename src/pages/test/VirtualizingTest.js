import React from 'react';
import ReactDOM from 'react-dom';
import {AutoSizer, List} from 'react-virtualized';
import styled from 'styled-components';

const ListBlock=styled.div`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: red;
    padding: 100px;
`;

const Row=styled.div`
    background: skyblue;
    display: flex;
    flex-direction: column;
    width: 200px;
    @media(min-width: 960px) {
      width: 500px;
      background: peru;
    }
    @media(min-width: 1280px) {
      width: 700px;
    }

`

const list = [
    'Brian Vaughn','Brian Vaughn','Brian Vaughn','Brian Vaughn','Brian Vaughn','Brian Vaughn',
    'Brian Vaughn','Brian Vaughn','Brian Vaughn','Brian Vaughn','Brian Vaughn','Brian Vaughn',
    'Brian Vaughn','Brian Vaughn','Brian Vaughn','Brian Vaughn','Brian Vaughn','Brian Vaughn',
    // And so on...
];

function rowRenderer({key, index, style}) {
    return (
        <Row key={key} style={style}>
            {list[index]}
        </Row>
    );
}

// Render your list
export default function VirtualizingTest() {
    return(
        <ListBlock>
            <AutoSizer>
                {({height, width}) => (
                    <List
                        height={height}
                        rowCount={list.length}
                        rowHeight={height/4}
                        rowRenderer={rowRenderer}
                        width={width}
                    />
                )}
            </AutoSizer>
        </ListBlock>


    )
}
