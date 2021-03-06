import {
	Scene, PerspectiveCamera, WebGLRenderer, DirectionalLight,
	HemisphereLight, TextureLoader,
} from 'three'
import forEach from 'ramda/src/forEach'
import { sun, clayRed, overcast } from '/js/colors'
import { treeHeight } from '/js/constants'
import { createTree } from '/js/threejs/trees'
import { createGround } from '/js/threejs/ground'
import { generateNObjects, createRectangle } from '/js/threejs/basic'

// Scene
export const scene = new Scene()

// Camera
const fov = 100
const aspect = window.innerWidth / window.innerHeight
const near = 0.1
const far = 1000
const camera = new PerspectiveCamera(
	fov, aspect, near, far,
)
camera.position.z = 100
camera.position.y = 10

// Light
const sunLight = new DirectionalLight(sun, 1)
sunLight.position.set(10, 1000, 10)
sunLight.target.position.set(0, 0, 0)
scene.add(sunLight)
scene.add(sunLight.target)

const dayLight = new HemisphereLight(overcast, clayRed, 1)
scene.add(dayLight)

// Landscape
export const generateLandscape = ({
	treeCount = 100,
}) => {
	const trees = generateNObjects(treeCount, createTree)
	forEach((item) => {
		item.position.y = treeHeight / 2
		scene.add(item)
	}, trees)
	const ground = createGround()
	scene.add(ground)
}

// Renderer
export const renderer = new WebGLRenderer()
renderer.setSize( window.innerWidth, window.innerHeight)
renderer.setClearColor (overcast, 1)
document.body.appendChild(renderer.domElement)

export const animate = () => {
	requestAnimationFrame(animate)
	renderer.render(scene, camera)
}
