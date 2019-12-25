import * as THREE from 'three'
import {
	Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial,
	Mesh, Group,
} from 'three'
import times from 'ramda/src/times'
import { green3, brown, randomGreen } from './colors'
import { randomOrNegativeNumber, randomNumber } from './util'

//// SETUP - START ////
// Scene and camera
export const scene = new Scene()
export const camera = new PerspectiveCamera(
	75, window.innerWidth / window.innerHeight, 0.1, 1000,
)
camera.position.z = 10
camera.position.y = 5
export const renderer = new WebGLRenderer()

// Setup renderer
renderer.setSize( window.innerWidth, window.innerHeight)
renderer.setClearColor (0xf0fcff, 1)
document.body.appendChild(renderer.domElement)
//// SETUP - END ////


//// BUILDING - START ////
// Adding to scenes
export const createCube = ({
	posX = 0, posY = 0, posZ = 0,
	objX = 0.5, objY = 0.5, objZ = 0.5,
	objColor = randomGreen(),
}) => {
	const geometry = new BoxGeometry(objX, objY, objZ)
	const material = new MeshBasicMaterial({ color: objColor })
	const cube = new Mesh(geometry, material)
	cube.position.set(posX, posY, posZ)
	return cube
}

export const generateTrunk = () => createCube({ objY: 3, objColor: brown })

export const generateNObjects = (n, generatorFunc, posMod = 1) => {
	const generator = (nthTime) => {
		const modNumber = nthTime * posMod
		return generatorFunc({
			posX: randomOrNegativeNumber(modNumber),
			posZ: randomNumber(modNumber),
		})
	}
	return times(generator, n)
}

export const generateTree = ({
	posX = 0, posY = 0, posZ = 0,
}) => {
	const leaves = generateNObjects(20, createCube, 0.05)
	const leafGroup = new Group()
	leaves.forEach(leaf => leafGroup.add(leaf))
	console.log(leafGroup)
	leafGroup.position.y = 2
	const trunk = generateTrunk()
	const treeGroup = new Group()
	treeGroup.add(trunk)
	treeGroup.add(leafGroup)
	treeGroup.position.set(posX, posY, posZ)
	scene.add(treeGroup)
}
//// BUILDING - END ////


//// ANIMATING - START ////
export const animate = () => {
	requestAnimationFrame(animate)
	renderer.render(scene, camera)
}
//// ANIMATING - END ////
