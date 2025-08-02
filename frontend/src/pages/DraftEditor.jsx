import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Toast from '../components/Toast';
import { sessionAPI } from '../services/sessionAPI';
import { useAutoSave } from '../hooks/useAutoSave';

const DraftEditor = () => {
  const { id } = useParams();
  const [form, setForm] = useState({ title: '', description: '', video_url: '', tags: [], difficulty: '' });
  const [toast, setToast] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      if (id) {
        try {
          const session = await sessionAPI.getMySession(id);
          setForm({
            title: session.title || '',
            description: session.description || '',
            video_url: session.video_url || '',
            tags: session.tags.join(', ') || [],
            difficulty: session || 'Beginner'
          });
        } catch (err) {
          setToast({ message: err.message, type: 'error' });
        }
      }
    };
    fetchSession();
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAutoSave = async (data) => {
    try {
      setSaving(true);
      // eslint-disable-next-line no-unused-vars
      const sessionDraft = await sessionAPI.saveDraft({ ...data, _id: id });
    } catch (err) {
      setToast({ message: 'Autosave failed: ' + err.message, type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    try {
      setForm((prev) => ({
        ...prev,
        tags: prev.tags.split(',').map(tag => tag.trim())
      }));
      await sessionAPI.publishSession({ ...form, _id: id });
      setToast({ message: 'Session published!', type: 'success' });
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    }
  };

  useAutoSave(form, handleAutoSave);

  return (
    <div className='min-h-screen min-w-screen bg-base-200 bg-[radial-gradient(#b5b8bd_1px,transparent_1px)] [background-size:16px_16px]' >
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="mt-6 text-3xl font-extrabold font-heading text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-accent from-primary">{id ? 'Edit Session' : 'Create New Session'}</span>
        </h1>
        <form className="space-y-4 mt-25 mx-auto w-2xl fieldset bg-transparent backdrop-blur-[1px] shadow-[0_0_80px_rgba(0,0,0,0.2)] border-base-300 rounded-box border p-4">
          <div>
            <label className="block label text-sm font-medium text-base-content">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder='Give your session a clear, catchy title'
              className="mt-1 block w-full border border-primary rounded-lg shadow-sm px-4 py-2 focus:outline-none focus:ring focus:ring-secondary focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-base-content">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              placeholder='Write a brief summary of your session'
              className="mt-1 block w-full border border-primary rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring focus:ring-secondary focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-base-content">Video URL</label>
            <input
              type="url"
              name="video_url"
              value={form.video_url}
              onChange={handleChange}
              placeholder='https://example.com'
              className="mt-1 block w-full border border-primary rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring focus:ring-secondary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-base-content">Diffculty</label>
            <select defaultValue="Beginner" onChange={handleChange} className="mt-1 block w-full border border-primary rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring focus:ring-secondary focus:border-transparent">
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-base-content">Tags</label>
            <input
              type="text"
              name="tags"
              value={form.tags}
              onChange={handleChange}
              placeholder="(comma-separated):exercise, relaxation, nutrition, focus "
              className="mt-1 block w-full border border-primary rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring focus:ring-secondary focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-2">Separate tags with commas</p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-base-content/50">
              {saving ? 'Saving...' : 'Autosaves every 10 seconds'}
            </span>
            <button
              type="button"
              onClick={handlePublish}
              className="btn btn-outline btn-primary transition-all text-sm"
            >
              Publish
            </button>
          </div>
        </form>
      </div>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default DraftEditor;
