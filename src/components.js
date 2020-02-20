import styled from 'styled-components'

export const colors = {
	primary: '#8781EA',
	mutedPrimary: '#9692EA',
	light: '#FFFFFF',
	medium: '#EEEEEE',
	dark: '#DDDDDD',
	text:'#3E3C63',
}

export const toneColors = [
	'#AAAAAA', '#73C8E7', '#8CD45F', '#E7CD00', '#E96B71'
]

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	padding: 1vw;
	min-height: 0;
	height: 100%;
	background: ${colors.light};
`

export const Text = styled.p`
	font-size: ${props => (props.size || 1)}em;
	font-family: Noto Sans SC;
	font-weight: ${props => props.bold ? 'bold' : 'normal'};
	word-break: break-all;
	color: ${props => (props.color || colors.text)};
`

export const Bar = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: stretch;
	min-height: min-content;
`

export const Block = styled.div`
	/* for parent */
	flex: 1;
	/* for children */
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: start;
	/* other */
	padding-left: 2vw;
	padding-right: 2vw;
	margin: 1vw;
	border-radius: 1vw;
	background: ${colors.light};
`

export const ViewBar = styled(Bar)`
	padding: 1vw;
	border-radius: 1vw;
	background: ${colors.medium};
`
export const SubCharButton = styled.div`
	font-size: 1em;
	padding-left: 2vh;
	padding-right: 2vh;
	margin: 1vw;
	border: none;
	outline: none;
	border-radius: 1vw;
	background: ${colors.primary};
`
