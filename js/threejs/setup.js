import {
	Scene, PerspectiveCamera, WebGLRenderer,
} from 'three'

// Scene
export const scene = new Scene()

// Camera
export const camera = new PerspectiveCamera(
	75, window.innerWidth / window.innerHeight, 0.1, 1000,
)
camera.position.z = 7
camera.position.y = 4

// Renderer
export const renderer = new WebGLRenderer()
renderer.setSize( window.innerWidth, window.innerHeight)
renderer.setClearColor (0xf0fcff, 1)
document.body.appendChild(renderer.domElement)

export const animate = () => {
	requestAnimationFrame(animate)
	renderer.render(scene, camera)
}
