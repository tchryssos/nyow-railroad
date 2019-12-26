import { generateTree } from '/js/threejs/trees'
import { generateNObjects } from '/js/threejs/basic'
import { animate } from '/js/threejs/setup'

generateNObjects(100, generateTree)
animate()