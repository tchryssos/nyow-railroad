import {
	Scene, PerspectiveCamera, WebGLRenderer, DirectionalLight,
} from 'three'
import forEach from 'ramda/src/forEach'
import { sun } from '/js/colors'
import { createTree } from '/js/threejs/trees'
import { generateNObjects } from '/js/threejs/basic'
// Scene
export const scene = new Scene()

// Camera
const fov = 75
const aspect = window.innerWidth / window.innerHeight
const near = 0.1
const far = 1000
const camera = new PerspectiveCamera(
	fov, aspect, near, far,
)
camera.position.z = 100
camera.position.y = 10

// Light
const light = new DirectionalLight(sun, 1)
light.position.set(10, 1000, 10)
light.target.position.set(0, 0, 0)
scene.add(light)
scene.add(light.target)

// Landscape
export const generateLandscape = ({
	treeCount = 100,
}) => {
	const trees = generateNObjects(treeCount, createTree)
	forEach((item) => scene.add(item), trees)
}

// Renderer
export const renderer = new WebGLRenderer()
renderer.setSize( window.innerWidth, window.innerHeight)
renderer.setClearColor (0xf0fcff, 1)
document.body.appendChild(renderer.domElement)

export const animate = () => {
	requestAnimationFrame(animate)
	renderer.render(scene, camera)
}
