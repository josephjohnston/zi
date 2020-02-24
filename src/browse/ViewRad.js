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


const ViewRad = props => {
	const radInfo = DB.infoMap[props.id]

	const makeSubChar = (subCharId, i) =>
		<SubCharButton
			key={i}
			onClick={() => props.viewItem(subCharId)}
			className='pointer-on-hover'
		>
			<Text
				size='1.2'
				>
				{ subCharId > 0
					? DB.infoMap[subCharId].char
					: '*' + DB.infoMap[subCharId].rad
				}
			</Text>
		</SubCharButton>
	return (
		<>
			<ViewBar>
				<Block>
					<Text
						size='1.4'
						// color={toneColors[itemInfo.tone]}
						>
						{radInfo.rad}
					</Text>
				</Block>
				<Block>
					<Text>
						{radInfo.en}
					</Text>
				</Block>
			</ViewBar>
			<ViewBar>
				<Block>
					<Text>
						{ radInfo.subchars.length > 0
							?
							'Sub-characters: '
							:
							'No sub-characters'
						}
					</Text>
					<Bar>
						{ radInfo.subchars
								.map(makeSubChar)
						}
					</Bar>
				</Block>
				<Block>
					<Text>
						{
							radInfo.other !== ''
							? 'Primitive meaning: '
							: 'No comments'
						}
						{radInfo.other}
					</Text>
				</Block>
			</ViewBar>
		</>
	)
}

export default ViewRad