
import DB from './DB'

let questionIds
const QUIZ_LENGTH = 12
// const MIN_REPS = 6
// const DIFFICULTY_THRESHOLD = 1/2
const MAX_TIME = 20 * 1000
const OPTIMAL_TIME = 4 * 1000


const scrambleList = list => {
	for(let i=list.length-1; i>0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		const temp = list[i]
		list[i] = list[j]
		list[j] = temp
	}
}

// const orderByUrgency = (charId1, charId2) => {
// 	const urgency = charId => {
// 		const score = DB.scores[charId]
// 		if(score.reps < MIN_REPS) {
// 			return 1
// 		} else {
// 			return score.difficulty
// 		}
// 	}
// 	return urgency(charId2) - urgency(charId1)
// }
// 
// const toStudy = charId => {
// 	const score = DB.scores[charId]
// 	if(score.reps < MIN_REPS) {
// 		return true
// 	}
// 	if(score.difficulty > DIFFICULTY_THRESHOLD) {
// 		return true
// 	}
// 	return false
// }
// 
// const getQuestions = () => {
// 	questionIds = Object.keys(DB.scores)
// 	.sort(orderByUrgency)
// 	.slice(0, QUIZ_LENGTH)
// 	.filter(toStudy)
// 
// 	let nextIdToStudy = DB.scores.length + 1
// 	for(let i=questionIds.length; i<QUIZ_LENGTH; i++) {
// 		questionIds.push(nextIdToStudy)
// 		nextIdToStudy += 1
// 	}
// 
// 	scrambleList(questionIds)
// 
// 	const questions = questionIds
// 	.map(charId => DB.charInfoMap[charId])
// 
// 	return questions
// }

const getQuestions = () => {
	let newScores = DB.scores
	if(DB.scores.length < DB.charInfoList.length) {
		const newIdsToStudyCount = DB.charInfoList.length - DB.scores.length
		const newIdsToStudy = []
		let nextIdToStudy = DB.scores.length + 1
		for(let i=0; i<newIdsToStudyCount; i++) {
			newIdsToStudy.push(nextIdToStudy)
			nextIdToStudy += 1
		}
		newScores = DB.scores.concat(newIdsToStudy)
	}
	DB.updateScores(newScores)

	questionIds = DB.scores
	.slice(0, QUIZ_LENGTH)

	scrambleList(questionIds)

	const questions = questionIds
	.map(charId => DB.charInfoMap[charId])

	return questions
}


const computeDifficulty = result => {
	const difficulty =
		result.correct === false ? 1
		: result.time > MAX_TIME ? 1
		: result.time < OPTIMAL_TIME ? 0
		: (result.time - OPTIMAL_TIME) / (MAX_TIME - OPTIMAL_TIME)
	return difficulty
}

const reportResults = results => {
	const difficulties = results
	.map(computeDifficulty)

	const newScores = [...DB.scores]
	for(let i=0; i<results.length; i++) {
		const charId = questionIds[i]
		newScores.splice(newScores.indexOf(charId), 1)
	}
	for(let i=0; i<results.length; i++) {
		const charId = questionIds[i]
		const insertIndex = Math.floor((1 - difficulties[i]) * (newScores.length - results.length + 1))
		newScores.splice(insertIndex, 0, charId)
	}
	DB.updateScores(newScores)
}

// const reportResults = results => {
// 	global.results = results
// 	const difficulties = global.results
// 	.map(computeDifficulty)
// 
// 	const scoresToChange = {}
// 	for(let i=0; i<global.results.length; i++) {
// 		const charId = global.questionIds[i]
// 		const currentScore = DB.scores[charId]
// 			? DB.scores[charId]
// 			: {
// 					reps: 0,
// 					difficulty: null,
// 				}
// 		const newScore = {
// 			reps: currentScore.reps + 1,
// 			difficulty: difficulties[i]
// 		}
// 		scoresToChange[charId] = newScore
// 	}
// 	DB.updateScores(scoresToChange)
// }

// const summary = {
// 
// }
// const getSummary = () => {
// 	return summary
// }
// const updateSummary = () => {
// 	summary.lastQuizRatioFinished =
// 		Results.length / QuestionIds.length
// 	summary.lastQuizRaioCorrect = Results
// 	.filter(result => result.correct)
// 	.length / Results.length || 0
// 	summary.times = Results
// 	.map(result => result.time)
// 	console.log('summary is', summary)
// }


export default {
	getQuestions,
	reportResults,
}






