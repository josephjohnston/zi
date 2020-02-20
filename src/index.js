import ReactDOM from 'react-dom'

import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import GridLoader from 'react-spinners/GridLoader'
import {
	Container,
	Text,
	colors,
} from './components'

import DB from './kernel/DB'

import Browse from './browse/Browse'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
	faChevronLeft,
	faChevronRight,
	faTimes,
	faQuestion,
	faFeatherAlt,
	faPaintBrush,
	faTimesCircle,
	faCheckCircle,
} from '@fortawesome/free-solid-svg-icons'
library.add(
	faChevronLeft,
	faChevronRight,
	faTimes,
	faQuestion,
	faFeatherAlt,
	faPaintBrush,
	faTimesCircle,
	faCheckCircle,
)

import WebFont from 'webfontloader'
WebFont.load({
	google: {
		families: ['Noto Sans SC']
	}
})

const LoadingContainer = styled(Container)`
	justify-content: center;
	align-items: center;
`


const App = () => {
	const [dataLoading, setDataLoading] = useState(true)

	useEffect(() => {
		if(dataLoading) {
			DB.subscribeToDataLoaded(() => setDataLoading(false))
		}
	})

	return (
		dataLoading
		?
		<LoadingContainer>
			<Text>Loading...</Text>
			<GridLoader
				color={colors.primary}
			/>
		</LoadingContainer>
		:
		<Browse />
	)
}

ReactDOM.render(<App />, document.getElementById('root'))
