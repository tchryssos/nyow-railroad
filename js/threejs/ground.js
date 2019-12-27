import {
	TextureLoader, MeshBasicMaterial, Mesh, BoxGeometry,
	RepeatWrapping,
} from 'three'

export const createGround = () => {
	const texture = new TextureLoader().load('/ground-grid.png')
	texture.repeat.set(8, 8)
	texture.wrapS = RepeatWrapping
	texture.wrapT = RepeatWrapping
	const material = new MeshBasicMaterial({ map: texture })
	const geometry = new BoxGeometry(1024, 1024, 0.1)
	const ground = new Mesh(geometry, material)
	ground.rotateX(Math.PI / 2)
	return ground
}