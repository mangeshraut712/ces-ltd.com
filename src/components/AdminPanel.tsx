'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface ContentItem {
  id: string;
  title: string;
  type: 'project' | 'news' | 'certificate';
  status: 'draft' | 'published' | 'archived';
  lastModified: string;
  author: string;
}

const mockContent: ContentItem[] = [
  {
    id: '1',
    title: 'Sahara Solar Complex Update',
    type: 'project',
    status: 'published',
    lastModified: '2024-11-05',
    author: 'Admin',
  },
  {
    id: '2',
    title: 'New AI-Predictive Features',
    type: 'news',
    status: 'draft',
    lastModified: '2024-11-04',
    author: 'Tech Team',
  },
  {
    id: '3',
    title: 'Carbon Credit Certificate Q4',
    type: 'certificate',
    status: 'published',
    lastModified: '2024-11-03',
    author: 'Sustainability Dept',
  },
];

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [content, setContent] = useState<ContentItem[]>(mockContent);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [showNewContentForm, setShowNewContentForm] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple demo authentication
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials. Use admin/admin123 for demo.');
    }
  };

  const updateContentStatus = (id: string, newStatus: ContentItem['status']) => {
    setContent(prev =>
      prev.map(item =>
        item.id === id ? { ...item, status: newStatus, lastModified: new Date().toISOString().split('T')[0] } : item
      )
    );
  };

  const deleteContent = (id: string) => {
    if (confirm('Are you sure you want to delete this content?')) {
      setContent(prev => prev.filter(item => item.id !== id));
    }
  };

  const addNewContent = (newItem: Omit<ContentItem, 'id' | 'lastModified'>) => {
    const contentItem: ContentItem = {
      ...newItem,
      id: Date.now().toString(),
      lastModified: new Date().toISOString().split('T')[0],
    };
    setContent(prev => [...prev, contentItem]);
    setShowNewContentForm(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-sm rounded-lg p-8 w-full max-w-md border border-white/20"
        >
          <h2 className="text-2xl font-bold text-white text-center mb-6">CES Ltd. Admin Panel</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter username"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
                required
              />
            </div>

            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Login
            </motion.button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-400">
            Demo credentials: admin / admin123
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">CES Ltd. Admin Panel</h1>
            <p className="text-gray-300">Manage content and monitor system performance</p>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowNewContentForm(true)}
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-shadow"
            >
              + New Content
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 rounded-lg p-6 border border-white/20">
            <div className="text-2xl font-bold text-white">{content.length}</div>
            <div className="text-gray-300 text-sm">Total Content Items</div>
          </div>

          <div className="bg-white/10 rounded-lg p-6 border border-white/20">
            <div className="text-2xl font-bold text-green-400">
              {content.filter(c => c.status === 'published').length}
            </div>
            <div className="text-gray-300 text-sm">Published Items</div>
          </div>

          <div className="bg-white/10 rounded-lg p-6 border border-white/20">
            <div className="text-2xl font-bold text-yellow-400">
              {content.filter(c => c.status === 'draft').length}
            </div>
            <div className="text-gray-300 text-sm">Draft Items</div>
          </div>

          <div className="bg-white/10 rounded-lg p-6 border border-white/20">
            <div className="text-2xl font-bold text-blue-400">98.5%</div>
            <div className="text-gray-300 text-sm">System Uptime</div>
          </div>
        </div>

        {/* Content Management */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-bold text-white">Content Management</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Author</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Modified</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {content.map((item) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-white">{item.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300 capitalize">{item.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        item.status === 'published' ? 'bg-green-100 text-green-800' :
                        item.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">{item.author}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">{item.lastModified}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => setSelectedContent(item)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        Edit
                      </button>
                      {item.status === 'draft' && (
                        <button
                          onClick={() => updateContentStatus(item.id, 'published')}
                          className="text-green-400 hover:text-green-300"
                        >
                          Publish
                        </button>
                      )}
                      <button
                        onClick={() => deleteContent(item.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* New Content Form Modal */}
        {showNewContentForm && (
          <NewContentForm
            onClose={() => setShowNewContentForm(false)}
            onSubmit={addNewContent}
          />
        )}

        {/* Edit Content Modal */}
        {selectedContent && (
          <EditContentForm
            content={selectedContent}
            onClose={() => setSelectedContent(null)}
            onUpdate={(updatedContent) => {
              setContent(prev =>
                prev.map(item =>
                  item.id === updatedContent.id ? updatedContent : item
                )
              );
              setSelectedContent(null);
            }}
          />
        )}
      </div>
    </div>
  );
}

// New Content Form Component
function NewContentForm({
  onClose,
  onSubmit
}: {
  onClose: () => void;
  onSubmit: (item: Omit<ContentItem, 'id' | 'lastModified'>) => void;
}) {
  const [formData, setFormData] = useState({
    title: '',
    type: 'project' as ContentItem['type'],
    status: 'draft' as ContentItem['status'],
    author: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/10 backdrop-blur-sm rounded-lg p-6 w-full max-w-md border border-white/20"
      >
        <h3 className="text-xl font-bold text-white mb-4">Create New Content</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as ContentItem['type'] }))}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="project">Project</option>
              <option value="news">News</option>
              <option value="certificate">Certificate</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Author</label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-shadow"
            >
              Create
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// Edit Content Form Component
function EditContentForm({
  content,
  onClose,
  onUpdate
}: {
  content: ContentItem;
  onClose: () => void;
  onUpdate: (content: ContentItem) => void;
}) {
  const [formData, setFormData] = useState(content);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ ...formData, lastModified: new Date().toISOString().split('T')[0] });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/10 backdrop-blur-sm rounded-lg p-6 w-full max-w-md border border-white/20"
      >
        <h3 className="text-xl font-bold text-white mb-4">Edit Content</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as ContentItem['status'] }))}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-shadow"
            >
              Update
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}