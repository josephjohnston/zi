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
	// padding: 1vw;
	border-radius: 1vw;
`


const ListItem = props => {
	const itemInfo = DB.infoMap[props.id]
	const IS_WORD = isNaN(props.id)

	const ListChar = () => 
		<ItemBar
			onClick={() => props.viewItem(props.id)}
			style={props.style}
			>
			<Block
				className='pointer-on-hover'
				>
				<Text
					size='1.6'
					// color={toneColors[itemInfo.tone]}
					>
					{itemInfo.char}
				</Text>
			</Block>
			<Block
				className='pointer-on-hover'
				>
				<Text>
					{itemInfo.en}
				</Text>
			</Block>
			<Block
				className='pointer-on-hover'
				>
				<Text
					size='1.2'
					bold={true}
					color={toneColors[itemInfo.tone]}
					>
					{itemInfo.sound}
				</Text>
			</Block>
		</ItemBar>

	const makeChar = (charId, i) =>
		<Text
			key={i}
			onClick={() => props.viewItem(charId, props.id)}
			className='pointer-on-hover'
			size='1.6'
			// color={toneColors[DB.infoMap[charId].tone]}
			>
			{ DB.infoMap[charId].char }
		</Text>

	const ListWord = () =>
		<ItemBar
			style={props.style}
			>
			<Block>
				<Bar>
					{ itemInfo.charIds 
						.map(makeChar)
					}
				</Bar>
			</Block>
			<Block>
				<Text>
					{ itemInfo.en }
				</Text>
			</Block>
		</ItemBar>

	return IS_WORD ? <ListWord/> : <ListChar/>

}

export default ListItem