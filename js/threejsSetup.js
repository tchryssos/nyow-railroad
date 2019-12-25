import * as THREE from 'three'

//// SETUP - START ////
// Scene and camera
export const scene = new THREE.Scene()
export const camera = new THREE.PerspectiveCamera(
	75, window.innerWidth / window.innerHeight, 0.1, 1000,
)
camera.position.z = 5
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
	objColor = 0x00ff00,
}) => {
	const geometry = new THREE.BoxGeometry(objX, objY, objZ)
	const material = new THREE.MeshBasicMaterial({ color: objColor })
	const cube = new THREE.Mesh(geometry, material)
	cube.position.set(posX, posY, posZ)
	scene.add(cube)
}
//// BUILDING - END ////


//// ANIMATING - START ////
export const animate = () => {
	requestAnimationFrame(animate)
	renderer.render(scene, camera)
}
//// ANIMATING - END ////
