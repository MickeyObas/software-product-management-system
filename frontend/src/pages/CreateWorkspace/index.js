import React, { useState } from 'react';
import { fetchWithAuth } from '../../components/utils';
import './styles.css';

const CreateWorkspace = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const workspaceData = {
      title,
      description,
    };

    try {
      const response = await fetchWithAuth('http://localhost:8000/api/workspaces/create', {
        method: 'POST',
        body: JSON.stringify(workspaceData),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(`Workspace "${data.title}" created successfully!`);
        setTitle('');
        setDescription('');
      } else {
        setError('Failed to create workspace.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while creating the workspace.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='add-workspace-container'>
      <h2>Create a New Workspace</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Workspace Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter workspace title"
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter workspace description"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Workspace'}
        </button>
      </form>
    </div>
  );
};

export default CreateWorkspace;
