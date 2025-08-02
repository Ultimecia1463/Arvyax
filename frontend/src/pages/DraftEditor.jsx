import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Toast from '../components/Toast';
import { sessionAPI } from '../services/sessionAPI';
import { useAutoSave } from '../hooks/useAutoSave';

const DraftEditor = () => {
  const { id } = useParams();
  const [form, setForm] = useState({ title: '', description: '', video_url: '' });
  const [toast, setToast] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      if (id) {
        try {
          const { data } = await sessionAPI.getMySession(id);
          setForm({
            title: data.session.title || '',
            description: data.session.description || '',
            video_url: data.session.video_url || '',
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
      await sessionAPI.saveDraft({ ...data, _id: id });
    } catch (err) {
      setToast({ message: 'Autosave failed: ' + err.message, type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    try {
      await sessionAPI.publishSession({ ...form, _id: id });
      setToast({ message: 'Session published!', type: 'success' });
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    }
  };

  useAutoSave(form, handleAutoSave);

  return (
    <div>
      <Navigation />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">
          {id ? 'Edit Session' : 'Create New Session'}
        </h1>
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Video URL</label>
            <input
              type="url"
              name="video_url"
              value={form.video_url}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div className="flex items-center justify-between mt-6">
            <span className="text-sm text-gray-500">
              {saving ? 'Saving...' : 'Autosaves every 5 seconds'}
            </span>
            <button
              type="button"
              onClick={handlePublish}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
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
