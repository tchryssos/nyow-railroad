export const randomOrNegativeNumber = n => Math.floor(
	Math.random() * ((n * 2) + 1)
) - n

export const randomNumber = n => Math.floor(Math.random() * (n + 1))
