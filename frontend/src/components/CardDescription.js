import React, { useState } from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const CardDescription = ({ initialDescription, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editorState, setEditorState] = useState(
    initialDescription
      ? EditorState.createWithContent(convertFromRaw(initialDescription))
      : EditorState.createEmpty()
  );

  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  const handleSave = () => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    // onSave(rawContentState);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <Editor
            editorState={editorState}
            onEditorStateChange={handleEditorChange}
            toolbar={{
              inline: { inDropdown: false },
              list: { inDropdown: false },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: false },
              image: {
                uploadCallback: uploadImageCallback,
                alt: { present: true, mandatory: false },
                previewImage: true,
                inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
              },
            }}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div onClick={() => setIsEditing(true)}>
          {initialDescription ? 'Edit Description' : 'Click to add a description'}
        </div>
      )}
    </div>
  );
};

const uploadImageCallback = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve({ data: { link: e.target.result } });
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

export default CardDescription;
