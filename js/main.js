import { generateTree } from './threejs/trees'
import { generateNObjects } from './threejs/basic'
import { animate } from './threejs/setup'

generateNObjects(1, generateTree)
animate()