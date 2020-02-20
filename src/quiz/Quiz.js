import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	Bar,
	Container,
	Text,
	colors
} from '../components'


const TopBar = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	border-radius: 1vw 1vw 0 0;
	background: ${colors.dark};
`
const CancelIcon = styled(FontAwesomeIcon)`
	margin: 2vw;
	color: ${colors.text};
`
const StatusContainer = styled.div`
	display: flex;
	flex-direction: row;
	margin: 1vw;
	padding: 1vw;
	flex: 1;
	border-radius: 1vw;
	background: ${colors.medium};
`
const StatusBar = styled.div`
	flex-basis: ${props => props.percent + '%'};
	background: ${colors.primary};
	height: 1vh;
	border-radius: 1vw;
`

const MiddleContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding-left: 2vw;
	padding-right: 2vw;
	background: ${colors.medium};
`
const AnswerContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`
const AnswerIcon = styled(FontAwesomeIcon)`
	margin-right: 2vw;
	color: ${colors.primary};
`

const QuestionBar = styled(Bar)`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	padding: 2vw;
	border-radius: 0 0 1vw 1vw;
	background: ${colors.dark};
`
const TextInput = styled.input`
	flex: 1;
	font-size: 1em;
	width: 0; // outside conatiner if not, idk
	margin: 1vw;
	align-self: stretch;
	border-radius: 1vw;
	outline: none;
	border: 1vw solid ${colors.primary};
	caret-color: ${colors.primary};
	color: ${colors.text};
	background: ${colors.medium};
`
const GiveUpIcon = styled(FontAwesomeIcon)`
	margin: 2vw;
	color: ${colors.text};
`

const Quiz = props => {
	// states
	const [questionTimer, setQuestionTimer] = useState(Date.now())
	const [submissions, setSubmissions] = useState([])
	const [currentInput, setCurrentInput] = useState('')

	const questions = props.questions

	useEffect(() => {
		if(questionTimer === null) {
			showAnswer()
		}
	})

	const report = () => {
		const results = submissions
			.map((submissionInfo, i) => {
				return {
					correct: submissionInfo.char === questions[i].char,
					time: submissionInfo.time,
				}
			})
		props.reportResults(results)
	}

	const showAnswer = () => {
		const animationTime = 1 * 1000
		const onAnimationComplete = () => {
			if(questions.length === submissions.length) {
				report()
			} else {
				setQuestionTimer(new Date())
			}
		}
		window.setTimeout(onAnimationComplete, animationTime)
	}

	const onInputChange = (submittedText) => {
		const submissionInfo = {
			char: submittedText,
			time: Date.now() - questionTimer
		}
		if(questions[submissions.length].char === submissionInfo.char) {
			setSubmissions([...submissions, submissionInfo])
			setQuestionTimer(null)
			setCurrentInput('')
		} else {
			setCurrentInput(submittedText)
		}
	}

	const onGiveUp = () => {
		const submissionInfo = {
			char: '',
			time: Date.now() - questionTimer
		}
		setSubmissions([...submissions, submissionInfo])
		setQuestionTimer(null)
		setCurrentInput('')
	}

	return (
		<Container>
			<TopBar>
				<CancelIcon
					icon='times'
					size='lg'
					onClick={report}
					className='pointer-on-hover'
				/>
				<StatusContainer>
					<StatusBar
						percent={
							submissions.length / questions.length * 100
						}
					/>
				</StatusContainer>
			</TopBar>
			<MiddleContainer>
				{ questionTimer !== null
					?
					<Text>
						{questions[submissions.length].en}
					</Text>
					:
					<AnswerContainer>
						<AnswerIcon
							icon={
								submissions[submissions.length-1].char
								===
								questions[submissions.length-1].char
								?
								'check-circle'
								:
								'times-circle'
							}
							size='lg'
						/>
						<Text>
							{questions[submissions.length-1].char}
						</Text>
					</AnswerContainer>
				}
			</MiddleContainer>
			<QuestionBar>
				<TextInput
					type='text'
					onChange={e => onInputChange(e.target.value)}
					value={currentInput}
				/>
				<GiveUpIcon
					icon='question'
					size='lg'
					disabled={questionTimer === null}
					onClick={() => {
						questionTimer !== null ? onGiveUp() : null
					}}
					className='pointer-on-hover'
				/>
			</QuestionBar>
		</Container>
	)
}


export default Quiz