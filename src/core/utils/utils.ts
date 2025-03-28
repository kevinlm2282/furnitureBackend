export interface Page<T> {
  content: T
  totalElements: number
}

export const mapPage = <T>(page: [T, number]): Page<T> => {
  return { content: page[0], totalElements: page[1] }
}
