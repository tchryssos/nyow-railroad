import nth from 'ramda/src/nth'

// Color Consts 
// color gradients move from light to dark (0-6, for ex.)

// Green
export const green0 = 0x84e3b5
export const green1 = 0x2ae88c
export const green2 = 0x2bc47a
export const green3 = 0x289e65
export const green4 = 0x207d50
export const green5 = 0x175738
export const green6 = 0x103b26

// Red
export const red3 = 0xad1d1d
export const red6 = 0x751717

// Other
export const brown = 0x4a2f18
export const yellow = 0xd2ed21
export const darkPurple = 0x371047

// Color Palettes
export const greens = [green0, green1, green2, green3, green4, green5, green6]

// Color Funcs
export const randomGreen = () => nth(Math.floor(Math.random() * greens.length), greens)
