import charInfoMap from './charInfoMap'
import radInfoMap from './radInfoMap'
import wordInfoMap from './wordInfoMap'

// const Request = XMLHttpRequest

// const secretKey = '$2a$10$0ec8HGNFv/r5eIfD24pGA.AF0aDxyCIhviAQjFU9OY8COOcjya3uG'
// const charInfoMapBinId = '5d423d0fea04da211dc5e55c'
// const radInfoMapBinId = '5d43fba23c07cc1d5d17fc62'
// const scoresBinId = '5d43ae4335e3f814032e6a08'


// const updateDB = (binId, data) => {
// 	let binName
// 	if(binId === charInfoMapBinId) {
// 		binName = 'charInfoMap'
// 	} else if (binId === radInfoMapBinId) {
// 		binName = 'radInfoMap'
// 	} else if (binId === scoresBinId) {
// 		binName = 'scores'
// 	}
// 	// console.log(`updating ${binName} with ${JSON.stringify(data)}`)
// 	const req = new Request()
// 	req.open('PUT', `https://api.jsonbin.io/b/${binId}`, true)
// 	req.setRequestHeader('Content-Type', 'application/json')
// 	req.setRequestHeader('secret-key', secretKey)
// 	req.send(JSON.stringify(data))
// }

// const getDB = (binId, cb) => {
// 	let binName
// 	if(binId === charInfoMapBinId) {
// 		binName = 'charInfoMap'
// 	} else if (binId === radInfoMapBinId) {
// 		binName = 'radInfoMap'
// 	}
// 	else if (binId === scoresBinId) {
// 		binName = 'scores'
// 	}
// 	// console.log(`getting ${binName}`)
// 	const req = new Request()
// 	req.onreadystatechange = () => {
// 		if(req.readyState === Request.DONE) {
// 			cb(JSON.parse(req.responseText))
// 		}
// 	}
// 	req.open('GET', `https://api.jsonbin.io/b/${binId}/latest`, true)
// 	req.setRequestHeader('secret-key', secretKey)
// 	req.send()
// }

// const loadAllData = cb => {
// 	const resourcesNeededCount = 2 //3
// 	let resourcesLoadedCount = 0
// 	const resourceLoaded = () => {
// 		resourcesLoadedCount += 1
// 		if(resourcesLoadedCount === resourcesNeededCount) {
// 			cb()
// 		}
// 	}
// 	getDB(charInfoMapBinId, data => {
// 		DB.charInfoMap = data
// 		for(const id in DB.charInfoMap) {
// 			DB.charInfoList.push(DB.charInfoMap[id])
// 		}
// 		resourceLoaded()
// 	})
// 	getDB(radInfoMapBinId, data => {
// 		DB.radInfoMap = data
// 		for(const id in DB.radInfoMap) {
// 			DB.radInfoList.push(DB.radInfoMap[id])
// 		}
// 		resourceLoaded()
// 	})
// 	getDB(scoresBinId, data => {
// 		DB.scores = data
// 		resourceLoaded()
// 	})
// }

const subscribeToDataLoaded = (cb) => {
	// loadAllData(cb)
	// DB.charInfoMap = charInfoMap
	// DB.charIdList = Object.keys(charInfoMap)
	// DB.radInfoMap = radInfoMap
	// DB.wordInfoMap = wordMap
	for(const id in charInfoMap) {
		DB.infoMap[id] = charInfoMap[id]
	}
	for(const id in radInfoMap) {
		DB.infoMap[id] = radInfoMap[id]
	}
	for(const word in wordInfoMap) {
		DB.infoMap[word] = wordInfoMap[word]
	}
	DB.itemList = shuffleArray([...Object.keys(charInfoMap), ...Object.keys(wordInfoMap)])
	cb()
}

// const updateScores = newScores => {
// 	DB.scores = newScores
// 	updateDB(scoresBinId, DB.scores)
// }

const shuffleArray = array => {
    for(let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}


const DB = {
	infoMap: {},
	// charInfoMap: null,
	// radInfoMap: null,
	// wordMap: null,
	// scores: null,
	itemList: [],
	subscribeToDataLoaded,
	// updateScores,
}


export default DB