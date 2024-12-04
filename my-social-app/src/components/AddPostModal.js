import React, { useState } from 'react';

function AddPostModal({ onClose, token }) {
  const [body, setBody] = useState('');

  const addPost = () => {
    fetch('/posts/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ body })
    })
    .then(res => res.json())
    .then(data => {
      // Если пост успешно добавлен, просто закрываем модалку, без alert
      if(data.message === "Пост успешно добавлен") {
        onClose();
      } else {
        alert("Ошибка при добавлении поста");
      }
    })
    .catch(err => console.error('Ошибка при добавлении поста:', err));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Добавить пост</h2>
        <textarea 
          placeholder="Текст поста"
          className="block w-full border border-gray-300 rounded mb-4 px-3 py-2"
          value={body}
          onChange={e => setBody(e.target.value)}
        ></textarea>
        <div className="flex justify-end space-x-3">
          <button 
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            onClick={addPost}
          >
            Добавить
          </button>
          <button 
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            onClick={onClose}
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddPostModal;
