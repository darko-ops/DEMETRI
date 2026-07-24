import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'
import AboutPage from './components/AboutPage.jsx'
import ProjectsPage from './components/ProjectsPage.jsx'
import BlogIndexPage from './components/BlogIndexPage.jsx'
import BlogPost from './components/BlogPost.jsx'
import ConnectPage from './components/ConnectPage.jsx'
import SoundPage from './components/SoundPage.jsx'
import { POSTS, getPost } from './content/posts.js'

export { POSTS }

function elementFor(pathname) {
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

// Rendered at build time by prerender.js and injected into static HTML.
export function render(pathname = '/') {
  return renderToString(
    <StrictMode>
      {elementFor(pathname)}
    </StrictMode>,
  )
}
