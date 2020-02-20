import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import {
	Bar,
	Block,
	Text,
	ViewBar,
	SubCharButton,
	toneColors
} from '../components'

import CharIllustration from './CharIllustration'

import DB from '../kernel/DB'


const ViewChar = props => {
	const charInfo = DB.infoMap[props.id]

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
					: DB.infoMap[subCharId].rad
				}
			</Text>
		</SubCharButton>

	return (
		<>
			<ViewBar>
				<Block>
					<CharIllustration
						char={charInfo.char}
					/>
				</Block>
				<Block>
					<Text
						size='1.2'
						color={toneColors[charInfo.tone]}
						bold={true}
						>
						{charInfo.sound}
					</Text>
				</Block>
				<Block>
					<Text>
						{charInfo.en}
					</Text>
				</Block>
			</ViewBar>
			<ViewBar>
				<Block>
					<Text>
						{ charInfo.subchars.length > 0
							?
							'Sub-characters'
							:
							'No sub-characters'
						}
					</Text>
					<Bar>
						{ charInfo.subchars
								.map(makeSubChar)
						}
					</Bar>
				</Block>
				<Block>
					<Text>
						{ charInfo.primitive === ''
							? 'No primitive meaning'
							: 'Primitive meanings: '
						}
						{charInfo.primitive}
					</Text>
				</Block>
			</ViewBar>
		</>
	)
}

export default ViewChar