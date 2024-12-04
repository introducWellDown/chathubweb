// src/App.js

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PostList from './components/PostList';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import AddPostModal from './components/AddPostModal';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isAddPostOpen, setIsAddPostOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [postUpdateTrigger, setPostUpdateTrigger] = useState(0);

  useEffect(() => {
    if(token) {
      // Запросить данные пользователя
      fetch('/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => {
        if (!res.ok) {
          throw new Error('Не удалось получить данные пользователя');
        }
        return res.json();
      })
      .then(data => {
        setUser(data);
      })
      .catch(err => {
        console.error('Ошибка при получении пользователя:', err);
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      });
    }
  }, [token]);

  const handleLoginSuccess = (receivedToken) => {
    localStorage.setItem('token', receivedToken);
    setToken(receivedToken);
    setIsLoginOpen(false);
  };

  const handleRegisterSuccess = (receivedToken) => {
    localStorage.setItem('token', receivedToken);
    setToken(receivedToken);
    setIsRegisterOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const openAddPost = () => {
    if(!token) return;
    setIsAddPostOpen(true);
  };

  const handlePostAdded = () => {
    // Обновляем триггер, чтобы PostList перезагрузил посты
    setPostUpdateTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header 
        user={user} 
        onLoginClick={() => setIsLoginOpen(true)} 
        onRegisterClick={() => setIsRegisterOpen(true)} 
        onLogout={handleLogout}
        onAddPostClick={openAddPost}
      />

      <main className="flex-1 flex justify-center p-6">
        <div className="w-full max-w-2xl">
          <PostList postUpdateTrigger={postUpdateTrigger} />
        </div>
      </main>

      {isLoginOpen && (
        <LoginModal 
          onClose={() => setIsLoginOpen(false)} 
          onLoginSuccess={handleLoginSuccess} 
        />
      )}
      {isRegisterOpen && (
        <RegisterModal 
          onClose={() => setIsRegisterOpen(false)} 
          onRegisterSuccess={handleRegisterSuccess}
        />
      )}
      {isAddPostOpen && token && (
        <AddPostModal
          onClose={() => setIsAddPostOpen(false)}
          token={token}
          onPostAdded={handlePostAdded}
        />
      )}
    </div>
  );
}

export default App;
