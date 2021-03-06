import { Group } from 'three'
import reduce from 'ramda/src/reduce'
import map from 'ramda/src/map'
import flatten from 'ramda/src/flatten'
import range from 'ramda/src/range'
import nth from 'ramda/src/nth'
import { treeHeight, leafSize } from '/js/constants'
import { brown } from '/js/colors'
import { createRectangle, generateNObjects } from '/js/threejs/basic'

const createTrunk = () => createRectangle({
	objX: 0.6, objZ: 0.6, objY: treeHeight, color: brown,
})

const getLeafHeightArray = () => {
	const leafHeightWholeRange = range(treeHeight - 3, treeHeight + 2)
	const leafDecimalIntervals = range(1, 1 / leafSize)
	const leafDecimalModifiers = map(interval => interval * leafSize, leafDecimalIntervals)
	return flatten(reduce(
		(acc, val) => {
			const decimals = map(
				(num) => val - num, leafDecimalModifiers,
			)
			acc.push(decimals)
			return acc
		},
		leafHeightWholeRange,
		leafHeightWholeRange,
	))
}
const leafHeightArray = getLeafHeightArray()

export const createTree = ({
	posX = 0, posY = 0, posZ = 0,
}) => {
	const leaves = generateNObjects(
		100, createRectangle, 0.03, {
			objX: leafSize,
			objY: leafSize,
			objZ: leafSize,
			opacity: 0.85,
		},
	)
	const leafGroup = new Group()
	leaves.forEach((leaf) => {
		const leafHeight = nth(
			Math.floor(Math.random() * leafHeightArray.length), leafHeightArray
		)
		leaf.position.y = leafHeight
		leafGroup.add(leaf)
	})
	const trunk = createTrunk()
	const treeGroup = new Group()
	treeGroup.add(trunk)
	treeGroup.add(leafGroup)
	treeGroup.position.set(posX, posY, posZ)
	return treeGroup
}