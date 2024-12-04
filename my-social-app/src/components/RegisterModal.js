// src/components/RegisterModal.js

import React, { useState } from 'react';

function RegisterModal({ onClose, onRegisterSuccess }) {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('woman'); // 'woman' или 'man'
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const register = () => {
    // Базовая валидация
    if (!name || !password || !email || !gender) {
      alert("Пожалуйста, заполните все обязательные поля.");
      return;
    }

    fetch('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, gender, age: Number(age), password, email })
    })
    .then(async res => {
      const contentType = res.headers.get("Content-Type");
      if (!res.ok) {
        // Если статус не 2xx, пытаемся разобрать как JSON
        if (contentType && contentType.includes("application/json")) {
          const errorData = await res.json();
          const errorMessage = errorData.error || 'Ошибка при регистрации.';
          throw new Error(errorMessage);
        } else {
          // Если не JSON, пытаемся разобрать как текст
          const errorText = await res.text();
          throw new Error(errorText);
        }
      }

      // Разбираем ответ как JSON
      if (contentType && contentType.includes("application/json")) {
        return res.json();
      } else {
        // Если не JSON, бросаем ошибку
        const responseText = await res.text();
        throw new Error(`Неожиданный формат ответа: ${responseText}`);
      }
    })
    .then(data => {
      if (data.token) {
        // Сохранение токена, например, в localStorage
        localStorage.setItem('token', data.token);
        onRegisterSuccess(data.token);
        onClose();
      } else {
        alert('Ошибка при регистрации.');
      }
    })
    .catch(err => {
      console.error('Ошибка при регистрации:', err);
      // Если сервер возвращает сообщение об ошибке, показываем его
      if (err.message) {
        alert(err.message);
      } else {
        alert('Произошла ошибка при регистрации.');
      }
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Регистрация</h2>
        <input 
          type="text" 
          placeholder="Имя пользователя" 
          className="block w-full border border-gray-300 rounded mb-3 px-3 py-2"
          value={name} 
          onChange={e => setName(e.target.value)} 
        />
        <select 
          className="block w-full border border-gray-300 rounded mb-3 px-3 py-2"
          value={gender} 
          onChange={e => setGender(e.target.value)}
        >
          <option value="woman">Женщина</option>
          <option value="man">Мужчина</option>
        </select>
        <input 
          type="number" 
          placeholder="Возраст"
          className="block w-full border border-gray-300 rounded mb-3 px-3 py-2"
          value={age} 
          onChange={e => setAge(e.target.value)} 
        />
        <input 
          type="email"
          placeholder="Email"
          className="block w-full border border-gray-300 rounded mb-3 px-3 py-2"
          value={email} 
          onChange={e => setEmail(e.target.value)} 
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
            onClick={register}
          >
            Зарегистрироваться
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

export default RegisterModal;
