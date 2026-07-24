import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import './index.css'
import './responsive.css'  // Add this line
import App from './App.jsx'
import AboutPage from './components/AboutPage.jsx'
import ProjectsPage from './components/ProjectsPage.jsx'
import BlogIndexPage from './components/BlogIndexPage.jsx'
import BlogPost from './components/BlogPost.jsx'
import ConnectPage from './components/ConnectPage.jsx'
import SoundPage from './components/SoundPage.jsx'
import { getPost } from './content/posts.js'

function elementForPath(pathname) {
  if (pathname === '/about' || pathname === '/about/') {
    return <AboutPage />
  }
  if (pathname === '/projects' || pathname === '/projects/') {
    return <ProjectsPage />
  }
  if (pathname === '/connect' || pathname === '/connect/') {
    return <ConnectPage />
  }
  if (pathname === '/sound' || pathname === '/sound/') {
    return <SoundPage />
  }
  if (pathname === '/blog' || pathname === '/blog/') {
    return <BlogIndexPage />
  }
  if (pathname.startsWith('/blog/')) {
    const slug = pathname.replace(/^\/blog\//, '').replace(/\/$/, '')
    const post = getPost(slug)
    if (post) return <BlogPost post={post} />
  }
  return <App />
}

hydrateRoot(
  document.getElementById('root'),
  <StrictMode>
    {elementForPath(window.location.pathname)}
  </StrictMode>,
)
