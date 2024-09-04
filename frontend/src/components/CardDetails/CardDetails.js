import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { fetchWithAuth } from '../utils';

const CardDetails = ({ cardId }) => {
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [images, setImages] = useState([]);
    const quillRef = useRef(null);

    useEffect(() => {
        // Fetch card details
        fetchWithAuth(`/api/cards/${cardId}/`)
            .then(response => response.json())
            .then(data => {
                setTitle(data.title);
                setDescription(data.description);
                setImages(data.images || []);
            })
            .catch(error => {
                console.error('There was an error fetching the card details!', error);
            });
    }, [cardId]);

    const handleDescriptionChange = (value) => {
        setDescription(value);
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetchWithAuth('/api/upload-image/', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            const imageUrl = data.url;
            setImages([...images, imageUrl]);

            // Insert the uploaded image into the editor
            const quill = quillRef.current.getEditor();
            const range = quill.getSelection();
            quill.insertEmbed(range.index, 'image', imageUrl);
        } catch (error) {
            console.error('There was an error uploading the image!', error);
        }
    };

    const handleSave = () => {
        const payload = {
            title,
            description,
            images,
        };

        fetchWithAuth(`/api/cards/${cardId}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => {
            alert('Card updated successfully!');
        })
        .catch(error => {
            console.error('There was an error updating the card!', error);
        });
    };

    return (
        <div className="card-details-modal">
            <h2>Edit Card: {title}</h2>
            <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Card Title"
            />
            <ReactQuill 
                value={description} 
                onChange={handleDescriptionChange}
                ref={quillRef}
            />
            <input type="file" onChange={handleImageUpload} />
            <button onClick={handleSave}>Save</button>
        </div>
    );
};

export default CardDetails;
