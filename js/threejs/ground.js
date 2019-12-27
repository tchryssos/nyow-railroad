import {
	TextureLoader, MeshBasicMaterial, Mesh, BoxGeometry,
} from 'three'
import { clayRed } from '/js/colors'
import { createRectangle } from '/js/threejs/basic'

export const createGround = () => {
	const texture = new TextureLoader().load('/ground1.png')
	const material = new MeshBasicMaterial({ map: texture })
	const geometry = new BoxGeometry(100, 100, 100)
	const ground = new Mesh(geometry, material)
	// const ground = createRectangle({
	// 	objX: 1000,
	// 	objY: 1000,
	// 	objZ: 0.01,
	// 	color: clayRed,
	// })

	// ground.rotateX(Math.PI / 2)
	return ground
}