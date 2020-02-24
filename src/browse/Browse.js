import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FixedSizeList as List } from 'react-window'
import {
	Bar,
	Container,
	Text,
	colors
} from '../components'

import DB from '../kernel/DB'

import ListItem from './ListItem'
import ViewChar from './ViewChar'
import ViewRad from './ViewRad'



const HistoryMenuBar = styled(Bar)`
	padding: 1vw;
	border-radius: 1vw 1vw 0 0;
	background: ${colors.primary};
`
const HistoryIcon = styled(FontAwesomeIcon)`
	color: ${props => props.disabled ? colors.mutedPrimary : colors.light};
`
const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	overflow: auto;
	padding: 1vw;
	border-radius: 0 0 1vw 1vw;
	border: 1vw solid ${colors.dark};
	border-top: none;
	background: ${colors.medium};
`


const Browse = props => {

	const [history, setHistory] = useState({
		past: [],
		present: {
			charId: 0,
			word: null,
		}, // 0 means list all characters, otherwise view the particular id
		future: [],
	})

	// list syncing
	const $List = useRef(null)
	useEffect(() => {
		if(history.present.charId === 0 && history.future.length > 0) {
			const itemToScroll = history.future[0]
			let itemToScrollId = itemToScroll.word ? itemToScroll.word : itemToScroll.charId
			$List.current.scrollToItem(DB.itemList.indexOf(itemToScrollId), 'smart')
		}
	})

	// history operations
	const jumpBack = () => {
		const newPast = history.past.slice(0, history.past.length-1)
		const newPresent = history.past[history.past.length-1]
		const newFuture = [history.present, ...history.future]
		setHistory({
			past: newPast,
			present: newPresent,
			future: newFuture,
		})
	}
	const jumpForward = () => {
		const newPast = [...history.past, history.present]
		const newPresent = history.future[0]
		const newFuture = history.future.slice(1)
		setHistory({
			past: newPast,
			present: newPresent,
			future: newFuture,
		})
	}
	const viewItem = (charId, word) => {
		const newPast = [...history.past, history.present]
		const newPresent = {
			charId,
			word,
		}
		const newFuture = []

		setHistory({
			past: newPast,
			present: newPresent,
			future: newFuture,
		})
	}

	return (
		<Container>
			<HistoryMenuBar>
				<HistoryIcon
					icon={'chevron-left'}
					size='lg'
					disabled={history.past.length === 0}
					onClick={() => {
						history.past.length > 0 ? jumpBack() : null
					}}
					className={history.past.length > 0 ? 'pointer-on-hover' : null}
				/>
				<HistoryIcon
					icon={'chevron-right'}
					size='lg'
					disabled={history.future.length === 0}
					onClick={() => {
						history.future.length > 0 ? jumpForward() : null
					}}
					className={history.future.length > 0 ? 'pointer-on-hover' : null}
				/>
			</HistoryMenuBar>
			<ContentContainer>
				{	history.present.charId === 0 ?
					<List
						ref={$List}
						height={window.innerHeight} // must be a number, can't rely on flex
						itemCount={DB.itemList.length}
						itemSize={72} // another number
						width='100%'
						>
						{ ({index, style}) =>
								<ListItem
									style={style}
									id={DB.itemList[index]}
									viewItem={viewItem}
								/>
						}
					</List>
					: history.present.charId > 0 ?
					<ViewChar
						id={history.present.charId}
						viewItem={viewItem}
					/>
					: history.present.charId < 0 ?
					<ViewRad
						id={history.present.charId}
						viewItem={viewItem}
					/>
					: null
				}
			</ContentContainer>
		</Container>
	)
}


export default Browse