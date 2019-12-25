import * as THREE from 'three'
import {
	Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial,
	Mesh,
} from 'three'
import times from 'ramda/src/times'
import { green3, randomGreen } from './colors'
import { randomOrNegativeNumber, randomNumber } from './util'

//// SETUP - START ////
// Scene and camera
export const scene = new Scene()
export const camera = new PerspectiveCamera(
	75, window.innerWidth / window.innerHeight, 0.1, 1000,
)
camera.position.z = 200
camera.position.y = 5
export const renderer = new WebGLRenderer()

// Setup renderer
renderer.setSize( window.innerWidth, window.innerHeight)
renderer.setClearColor (0xf0fcff, 1)
document.body.appendChild(renderer.domElement)
//// SETUP - END ////


//// BUILDING - START ////
// Adding to scenes
export const addCube = ({
	posX = 0, posY = 0, posZ = 0,
	objX = 0.5, objY = 0.5, objZ = 0.5,
	objColor = randomGreen(),
}) => {
	const geometry = new BoxGeometry(objX, objY, objZ)
	const material = new MeshBasicMaterial({ color: objColor })
	const cube = new Mesh(geometry, material)
	cube.position.set(posX, posY, posZ)
	scene.add(cube)
}

export const generateNObjects = (n, generatorFunc) => {
	const generator = (nthTime) => {
		generatorFunc({
			posX: randomOrNegativeNumber(nthTime),
			posZ: randomNumber(nthTime),
		})
	}
	times(generator, n)
}
//// BUILDING - END ////


//// ANIMATING - START ////
export const animate = () => {
	requestAnimationFrame(animate)
	renderer.render(scene, camera)
}
//// ANIMATING - END ////
