import { Link } from 'react-router-dom'
function NotFound() {
  return <div className="reading-width stack"><h1>Page not found</h1><p>The page you requested could not be found.</p><Link to="/">Return home</Link></div>
}
export default NotFound
