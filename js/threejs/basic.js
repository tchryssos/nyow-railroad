import {
	BoxGeometry, MeshBasicMaterial, Mesh,
} from 'three'
import times from 'ramda/src/times'
import { randomOrNegativeNumber, randomNumber } from '/js/util'
import { randomGreen } from '/js/colors'

export const createCube = ({
	posX = 0, posY = 0, posZ = 0,
	objX = 1, objY = 1, objZ = 1,
	objColor = randomGreen(),
}) => {
	const geometry = new BoxGeometry(objX, objY, objZ)
	const material = new MeshBasicMaterial({ color: objColor })
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
