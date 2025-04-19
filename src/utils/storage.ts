export function storeVisitedState(): void {
  window.localStorage.setItem('has-visited', 'true')
}

export function hasVisited(): boolean {
  return window.localStorage.getItem('has-visited') !== null
}
