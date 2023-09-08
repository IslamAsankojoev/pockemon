type IResponseList<T> = {
	count: number
	next: string
	previous: string
	results: T[]
}