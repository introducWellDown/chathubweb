import React, { useState } from 'react';

function LoginModal({ onClose, onLoginSuccess }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({name, password})
    })
    .then(res => res.json())
    .then(data => {
      if(data.token) {
        onLoginSuccess(data.token);
      } else {
        alert('Ошибка при входе. Проверьте логин и пароль.');
      }
    })
    .catch(err => console.error('Ошибка при авторизации:', err));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg relative">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Войти</h2>
        <input 
          type="text" 
          placeholder="Имя пользователя" 
          className="block w-full border border-gray-300 rounded mb-3 px-3 py-2"
          value={name} 
          onChange={e => setName(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Пароль" 
          className="block w-full border border-gray-300 rounded mb-4 px-3 py-2"
          value={password} 
          onChange={e => setPassword(e.target.value)}
        />
        <div className="flex justify-end space-x-3">
          <button 
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            onClick={login}
          >
            Войти
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

export default LoginModal;
