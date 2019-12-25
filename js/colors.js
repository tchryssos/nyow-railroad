import nth from 'ramda/src/nth'

// Color Consts
export const brown = 0x4a2f18
export const darkGreen = 0x103b26
export const green = 0x248757
export const lightGreen = 0x2db573
export const yellow = 0xd2ed21
export const red = 0xad1d1d
export const darkRed = 0x751717
export const darkPurple = 0x371047

// Color Palettes
export const greens = [darkGreen, green, lightGreen]

// Color Funcs
export const randomGreen = () => nth(Math.floor(Math.random() * greens.length), greens)
