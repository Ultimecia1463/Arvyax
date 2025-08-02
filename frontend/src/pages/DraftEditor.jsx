import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Toast from '../components/Toast'
import { sessionAPI } from '../services/sessionAPI'
import { useAutoSave } from '../hooks/useAutoSave'

const DraftEditor = () => {
  const { id } = useParams()
  const [form, setForm] = useState({
    title: '',
    description: '',
    video_url: '',
    tags: '',
    difficulty: 'Beginner'
  })
  const [toast, setToast] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchSession = async () => {
      if (!id) return
      try {
        const session = (await sessionAPI.getMySession(id)) || {}
        setForm({
          title: session.title || '',
          description: session.description || '',
          video_url: session.video_url || '',
          tags: Array.isArray(session.tags) ? session.tags.join(', ') : '',
          difficulty: session.difficulty || 'Beginner'
        })
      } catch (err) {
        console.error(err)
        setToast({ message: err.message + ' title error', type: 'error' })
      }
    }
    fetchSession()
  }, [id])

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleAutoSave = async (data) => {
    try {
      setSaving(true)
      await sessionAPI.saveDraft({ ...data, id })
    } catch (err) {
      setToast({ message: 'Autosave failed: ' + err.message, type: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const handlePublish = async () => {
    try {
      const tagsArray = form.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag)
      await sessionAPI.publishSession({ ...form, tags: tagsArray, id })
      setToast({ message: 'Session published!', type: 'success' })
    } catch (err) {
      setToast({ message: err.message, type: 'error' })
    }
  }

  useAutoSave(form, handleAutoSave)

  return (
    <div className="min-h-screen bg-base-200 bg-[radial-gradient(#b5b8bd_1px,transparent_1px)] [background-size:16px_16px]">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mt-4 text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold font-heading text-gray-900 dark:text-white text-center sm:text-left">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-accent from-primary">
            {id ? 'Edit Session' : 'Create New Session'}
          </span>
        </h1>

        <form className="mt-8 space-y-4 bg-transparent backdrop-blur-[1.5px] shadow-lg border border-base-300 rounded-lg p-4 sm:p-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-base-content">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Give your session a clear, catchy title"
              className="mt-1 w-full border border-primary rounded-lg shadow-sm px-3 sm:px-4 py-2 focus:outline-none focus:ring focus:ring-secondary"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-base-content">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              placeholder="Write a brief summary of your session"
              className="mt-1 w-full border border-primary rounded-lg shadow-sm px-3 sm:px-4 py-2 focus:outline-none focus:ring focus:ring-secondary"
              required
            />
          </div>

          {/* Video URL */}
          <div>
            <label className="block text-sm font-medium text-base-content">Video URL</label>
            <input
              type="url"
              name="video_url"
              value={form.video_url}
              onChange={handleChange}
              placeholder="https://example.com"
              className="mt-1 w-full border border-primary rounded-lg shadow-sm px-3 sm:px-4 py-2 focus:outline-none focus:ring focus:ring-secondary"
            />
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-sm font-medium text-base-content">Difficulty</label>
            <select
              name="difficulty"
              value={form.difficulty}
              onChange={handleChange}
              className="mt-1 w-full border border-primary rounded-lg shadow-sm px-3 sm:px-4 py-2 focus:outline-none focus:ring focus:ring-secondary"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-base-content">Tags</label>
            <input
              type="text"
              name="tags"
              value={form.tags}
              onChange={handleChange}
              placeholder="(comma-separated): exercise, relaxation, nutrition, focus"
              className="mt-1 w-full border border-primary rounded-lg shadow-sm px-3 sm:px-4 py-2 focus:outline-none focus:ring focus:ring-secondary"
            />
            <p className="text-xs sm:text-sm text-gray-500 mt-2">Separate tags with commas</p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-sm text-base-content/50 order-2 sm:order-1">
              {saving ? 'Saving...' : 'Autosaves every 10 seconds'}
            </span>
            <button
              type="button"
              onClick={handlePublish}
              className="btn btn-outline btn-primary w-full sm:w-auto order-1 sm:order-2"
            >
              Publish
            </button>
          </div>
        </form>
      </div>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  )
}

export default DraftEditor
