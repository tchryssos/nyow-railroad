import {
	Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial,
	Mesh, Group,
} from 'three'
import times from 'ramda/src/times'
import range from 'ramda/src/range'
import nth from 'ramda/src/nth'
import reduce from 'ramda/src/reduce'
import map from 'ramda/src/map'
import flatten from 'ramda/src/flatten'
import { brown, randomGreen } from './colors'
import { treeHeight, leafSize } from './constants'
import { randomOrNegativeNumber, randomNumber } from './util'

//// SETUP - START ////
// Scene and camera
export const scene = new Scene()
export const camera = new PerspectiveCamera(
	75, window.innerWidth / window.innerHeight, 0.1, 1000,
)
camera.position.z = 7
camera.position.y = 4
export const renderer = new WebGLRenderer()

// Setup renderer
renderer.setSize( window.innerWidth, window.innerHeight)
renderer.setClearColor (0xf0fcff, 1)
document.body.appendChild(renderer.domElement)
//// SETUP - END ////


//// BUILDING - START ////
// Cubes - Start
export const createCube = ({
	posX = 0, posY = 0, posZ = 0,
	objX = 1, objY = 1, objZ = 1,
	objColor = randomGreen(),
}) => {
	const geometry = new BoxGeometry(objX, objY, objZ)
	const material = new MeshBasicMaterial({ color: objColor })
	const cube = new Mesh(geometry, material)
	cube.position.set(posX, posY, posZ)
	return cube
}
// Cubes - End

export const createTrunk = () => createCube({ objY: treeHeight, objColor: brown })

// N objects - Start
export const generateNObjects = (n, generatorFunc, posMod = 1, generatorProps = {}) => {
	const generator = (nthTime) => {
		const modNumber = nthTime * posMod
		return generatorFunc({
			posX: randomOrNegativeNumber(modNumber),
			posZ: randomNumber(modNumber),
			...generatorProps,
		})
	}
	return times(generator, n)
}
// N objects - End

// Trees - Start
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

export const generateTree = ({
	posX = 0, posY = 0, posZ = 0,
}) => {
	const leaves = generateNObjects(
		100, createCube, 0.05, { objX: leafSize, objY: leafSize, objZ: leafSize },
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
	scene.add(treeGroup)
}
// Trees - End
//// BUILDING - END ////


//// ANIMATING - START ////
export const animate = () => {
	requestAnimationFrame(animate)
	renderer.render(scene, camera)
}
//// ANIMATING - END ////
