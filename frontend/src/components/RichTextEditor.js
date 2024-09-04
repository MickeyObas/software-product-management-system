import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

export default function RichTextEditorWithAttachments() {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editorContent, setEditorContent] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [savedContent, setSavedContent] = useState('');

  const handleOpenEditor = () => {
    setIsEditorOpen(true);
  };

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

  const uploadImage = async (base64Data) => {
    try {
      const response = await fetch('YOUR_IMAGE_UPLOAD_ENDPOINT', {
        method: 'POST',
        body: JSON.stringify({ image: base64Data }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Image upload failed');
      }
  
      const data = await response.json();
      return data.imageUrl; // Assuming your API returns the URL of the uploaded image
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };
  

  const handleAttachmentChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments((prevAttachments) => [...prevAttachments, ...files]);
  };

  const handleSave = async () => {
    // Extract images and replace base64 data with URLs
    const imagePromises = [];
    const updatedContent = editorContent.replace(/<img src="data:image\/[^;]+;base64,([^"]+)"[^>]*>/g, (match, base64Data) => {
      const imagePromise = uploadImage(base64Data).then(imageUrl => {
        if (imageUrl) {
          return `<img src="${imageUrl}" />`;
        }
        return match;
      });
      imagePromises.push(imagePromise);
      return match; // Keep original until imageUrl is obtained
    });
  
    // Wait for all images to be uploaded
    const newContent = await Promise.all(imagePromises).then(replacements => {
      let content = editorContent;
      replacements.forEach((replacement, index) => {
        content = content.replace(/<img src="data:image\/[^;]+;base64,([^"]+)"[^>]*>/, replacement);
      });
      return content;
    });
  
    // Save the content with updated images
    console.log('Editor content:', newContent);
    console.log('Attachments:', attachments);
    // Implement your save logic here
    setSavedContent(newContent);
  };



  return (
    <div className="rich-text-editor-container">
      {!isEditorOpen ? (
        <div className="fake-text-area" onClick={handleOpenEditor}>
          Click here to add content...
        </div>
      ) : (
        <div className="editor-wrapper">
          <ReactQuill
            value={editorContent}
            onChange={handleEditorChange}
            modules={{
              toolbar: [
                [{ 'header': '1'}, {'header': '2'}],
                ['bold', 'italic', 'underline'],
                [{'list': 'ordered'}, {'list': 'bullet'}],
                ['link', 'image'],
                ['clean']
              ],
            }}
            placeholder="Start writing..."
          />
          <button onClick={handleSave}>Save</button>
          {savedContent && (
            <div className="saved-content">
            <h2>Saved Content</h2>
            <div dangerouslySetInnerHTML={{ __html: savedContent }} />
            </div>
        )}
        </div>
      )}
    </div>
  );
}
