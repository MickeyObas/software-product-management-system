import { useState, useEffect, useContext } from 'react';
import './styles.css';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchWithAuth } from '../../components/utils';
import { isValidUrl } from '../../components/utils';
import { useWorkspace } from '../../components/WorkspaceContext';
import { UserContext } from '../../components/UserContext';
import { useProduct } from '../../components/ProductContext';

const AddProduct = () => {

  const { currentWorkspace } = useWorkspace();
  const { user, loading } = useContext(UserContext);
  const { currentProduct, setCurrentProduct } = useProduct();

  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [type, setType] = useState('software_application');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('planning');
  const [workspace, setWorkspace] = useState(currentWorkspace?.length > 0 ? currentWorkspace.id : '');
  const [workspaces, setWorkspaces] = useState('');
  const [version, setVersion] = useState('');
  const [repositoryUrl, setRepositoryUrl] = useState('');
  const [documentationUrl, setDocumentationUrl] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Set workspace once currentWorkspace or workspaces is fetched
    if (currentWorkspace && currentWorkspace.id) {
        setWorkspace(currentWorkspace.id);
    } else if (workspaces.length > 0) {
        setWorkspace(workspaces[0].id); // Set the first workspace as default if no current workspace
    }
}, [currentWorkspace, workspaces]);


  useEffect(() => {
    const fetchWorkspaces = async () => {
        try {
            const response = await fetchWithAuth('http://localhost:8000/api/workspaces/', {
                method: 'GET',
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            setWorkspaces(data);
        } catch (error) {
            console.error("Error fetching workspaces:", error);
        }
    };

    fetchWorkspaces();
}, []);

const validateForm = () => {
  const newErrors = {};
  if (!title.trim()) {
    newErrors.title = 'Title is required';
  }
  if (!version.trim()) {
    newErrors.version = 'Version is required';
  }
  if (!repositoryUrl.trim() || !isValidUrl(repositoryUrl)) {
    newErrors.repositoryUrl = 'A valid Repository URL is required';
  }
  if (!documentationUrl.trim() || !isValidUrl(documentationUrl)) {
    newErrors.documentationUrl = ' A valid Documentation URL is required';
  }
  return newErrors;
};

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Set errors if validation fails
    } else {
      setErrors({}); // Clear errors if no validation errors

      const productData = {
        workspace: workspace, 
        title: title, 
        type: type, 
        description: description,
        owner: user.id, 
        status: status, 
        version: version, 
        repository_url: repositoryUrl, 
        documentation_url: documentationUrl, 
      };

      // Send data to API (fetch/axios)
      fetchWithAuth('http://localhost:8000/api/products/create', {
        method: 'POST',
        body: JSON.stringify(productData)
      })
      .then((response) => response.json())
      .then((data) => setCurrentProduct(data))
      .then(() => navigate(`/${user.email}/boards/`))
      .catch((err) => console.log("Whoops, an error occured: ", err))

  }};

  return (
    <div className='add-form-container'>
    <form onSubmit={handleSubmit} className="add-product-form">
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        {errors.title && <p style={{ color: 'red' }}>{errors.title}</p>}
      </div>

      <div>
        <label>Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="software_application">Software Application</option>
          <option value="web_application">Web Application</option>
          <option value="api">API</option>
          <option value="library_framework">Library/Framework</option>
          <option value="plugin_extension">Plugin/Extension</option>
          <option value="game">Game</option>
          <option value="microservice">Microservice</option>
          <option value="firmware">Firmware</option>
          <option value="digital_content">Digital Content</option>
          <option value="platform">Platform</option>
        </select>
      </div>

      <div>
        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="planning">Planning</option>
          <option value="development">Development</option>
          <option value="testing">Testing</option>
          <option value="released">Released</option>
          <option value="maintenance">Maintenance</option>
        </select>
      </div>

      <div>
        <label>Workspace</label>
        <select value={workspace} onChange={(e) => setWorkspace(e.target.value)} defaultChecked>
        {workspaces && workspaces.map((ws) => (
            <option key={ws.id} value={ws.id}>{ws.title}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && <p style={{ color: 'red' }}>{errors.description}</p>}
      </div>

      <div>
        <label>Version</label>
        <input
          type="text"
          value={version}
          onChange={(e) => setVersion(e.target.value)}
        />
        {errors.version && <p style={{ color: 'red' }}>{errors.version}</p>}
      </div>

      <div>
        <label>Repository URL</label>
        <input
          type="url"
          value={repositoryUrl}
          onChange={(e) => setRepositoryUrl(e.target.value)}
          placeholder='https://github.com/user/repo'
        />
        {errors.repositoryUrl && <p style={{ color: 'red' }}>{errors.repositoryUrl}</p>}
      </div>

      <div>
        <label>Documentation URL</label>
        <input
          type="url"
          value={documentationUrl}
          onChange={(e) => setDocumentationUrl(e.target.value)}
          placeholder='https://docs.example.com'
        />
        {errors.documentationUrl && <p style={{ color: 'red' }}>{errors.documentationUrl}</p>}
      </div>

      <button type="submit" onClick={handleSubmit}>Add Product</button>
    </form>
    </div>
  );
};

export default AddProduct;
