import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import {
	Bar,
	Block,
	SubCharButton,
	Text,
	ViewBar,
	toneColors
} from '../components'

import DB from '../kernel/DB'


const ItemBar = styled.div`
	display: flex;
	flex-direction: row;
`

const ListItem = props => {
	// const itemInfo = DB.infoMap[props.id]
	// const IS_WORD = isNaN(props.id)

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
	// return (
	// 	<ItemBar
	// 		onClick={props.viewItem}
	// 		style={props.style}
	// 		>
	// 		<Block
	// 			className='pointer-on-hover'
	// 			>
	// 			<Text
	// 				size='1.4'
	// 				>
	// 				{ IS_WORD ? props.id : itemInfo.char }
	// 			</Text>
	// 		</Block>
	// 		{ IS_WORD
	// 			? null
	// 			: <Block
	// 				className='pointer-on-hover'
	// 				>
	// 				<Text
	// 					size='1.2'
	// 					bold={true}
	// 					color={toneColors[itemInfo.tone]}
	// 					>
	// 					{ itemInfo.sound }
	// 				</Text>
	// 			</Block>
	// 		}
	// 		<Block
	// 			className='pointer-on-hover'
	// 			>
	// 			<Text>
	// 				{IS_WORD ? itemInfo.en : itemInfo.en}
	// 			</Text>
	// 		</Block>
	// 	</ItemBar>
	// )
}

export default ListItem