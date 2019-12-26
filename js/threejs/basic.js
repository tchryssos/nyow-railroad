import {
	BoxGeometry, MeshLambertMaterial, Mesh,
} from 'three'
import times from 'ramda/src/times'
import { randomOrNegativeNumber, randomNumber } from '/js/util'
import { randomGreen } from '/js/colors'

export const createCube = ({
	posX = 0,
	posY = 0,
	posZ = 0,
	objX = 1,
	objY = 1,
	objZ = 1,
	color = randomGreen(),
	opacity = 1.0,
}) => {
	const transparent = opacity !== 1
	const geometry = new BoxGeometry(objX, objY, objZ)
	const material = new MeshLambertMaterial({
		color, transparent, opacity,
	})
	const cube = new Mesh(geometry, material)
	cube.position.set(posX, posY, posZ)
	return cube
}

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
