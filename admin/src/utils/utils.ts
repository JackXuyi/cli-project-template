export function getRoutePath(pathname: string) {
  const temp = `${pathname || ''}`.replace(/\/+/, '')
  return `/admin/${temp}`
}
