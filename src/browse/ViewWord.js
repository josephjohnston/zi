import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import {
    Bar,
    Block,
    Text,
    ViewBar,
    SubCharButton,
} from '../components'

import CharIllustration from './CharIllustration'

import DB from '../kernel/DB'


const ItemBar = styled.div`
    display: flex;
    flex-direction: row;
`

const ListChar = props => {
    const word = props.id
    const wordInfo = DB.infoMap[word]

    const makeChar = (charId, i) =>
        <SubCharButton
            key={i}
            onClick={() => props.viewItem(charId)}
            className='pointer-on-hover'
        >
            <Text
                size='1.2'
                >
                { DB.infoMap[charId].char }
            </Text>
        </SubCharButton>

    return (
        <ViewBar>
            <Block>
                <Text
                    size='1.8'
                    >
                 { word }
                </Text>
            </Block>
            <Block>
                <Bar>
                    { wordInfo.charIds 
                        .map(makeChar)
                    }
                </Bar>
            </Block>
            <Block>
                <Text>
                    { wordInfo.en }
                </Text>
            </Block>
        </ViewBar>
    )
}

export default ListChar