import React from 'react';

function Header({ user, onLoginClick, onRegisterClick, onLogout, onAddPostClick }) {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="font-bold text-xl text-purple-600">MySocialFeed</div>
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center text-white font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-gray-700 font-medium">{user.name}</span>
              </div>
              <button 
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                onClick={onAddPostClick}
              >
                Добавить пост
              </button>
              <button 
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                onClick={onLogout}
              >
                Выйти
              </button>
            </div>
          ) : (
            <>
              <button 
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                onClick={onLoginClick}
              >
                Войти
              </button>
              <button 
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                onClick={onRegisterClick}
              >
                Зарегистрироваться
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
