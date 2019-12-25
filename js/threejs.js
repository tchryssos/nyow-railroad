import * as THREE from 'three'
import times from 'ramda/src/times'
import { green3, randomGreen } from './colors'
import { randomOrNegativeNumber, randomNumber } from './util'

//// SETUP - START ////
// Scene and camera
export const scene = new THREE.Scene()
export const camera = new THREE.PerspectiveCamera(
	75, window.innerWidth / window.innerHeight, 0.1, 1000,
)
camera.position.z = 150
camera.position.y = 3
export const renderer = new THREE.WebGLRenderer()

// Setup renderer
renderer.setSize( window.innerWidth, window.innerHeight)
renderer.setClearColor (0xf0fcff, 1)
document.body.appendChild(renderer.domElement)
//// SETUP - END ////


//// BUILDING - START ////
// Adding to scenes
export const addCube = ({
	posX = 0, posY = 0, posZ = 0,
	objX = 1, objY = 1, objZ = 1,
	objColor = green3,
}) => {
	const geometry = new THREE.BoxGeometry(objX, objY, objZ)
	const material = new THREE.MeshBasicMaterial({ color: objColor })
	const cube = new THREE.Mesh(geometry, material)
	cube.position.set(posX, posY, posZ)
	scene.add(cube)
}

export const generateNObjects = (n, generatorFunc) => {
	const generator = (nthTime) => {
		generatorFunc({
			posX: randomOrNegativeNumber(nthTime),
			posZ: randomNumber(nthTime),
			objColor: randomGreen(),
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
