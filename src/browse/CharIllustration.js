import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	colors,
} from '../components'
import $HanziWriter from 'hanzi-writer'


const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`
const PainIcon = styled(FontAwesomeIcon)`
	margin-bottom: 2vh;
	color: ${colors.primary};
`
const writerOptions = {
	width: 60,
	height: 60,
	padding: 0,
	showOutline: true,
	strokeAnimationSpeed: 2,
	delayBetweenStrokes: 1 * 200,
	strokeColor: colors.text,
}


const CharIllustration = props => {

	const [$writer, setWriter] = useState(null)
	const $div = useRef(null)

	useEffect(() => {
		if(!$writer) {
			setWriter(new $HanziWriter($div.current, writerOptions))
		} else {
			$writer.setCharacter(props.char)
		}
	})

	return (
		<Container>
			<div
				ref={$div}
			/>
			<PainIcon
				icon='paint-brush'
				size='1x'
				className='pointer-on-hover'
				onClick={() => $writer.animateCharacter()}
			/>
		</Container>
	)
}

export default CharIllustration