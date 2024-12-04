import React, { useEffect, useState } from 'react';

function PostList() {
  const [posts, setPosts] = useState([]);

  const loadPosts = () => {
    fetch(`/posts/getList?page=0&size=4`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPosts(data);
        }
      })
      .catch(err => console.error('Ошибка при получении постов:', err));
  };

  useEffect(() => {
    loadPosts();
    // Интервал обновления каждые 3 секунды
    const intervalId = setInterval(() => {
      loadPosts();
    }, 300);

    return () => clearInterval(intervalId);
  }, []);

  // Функция для форматирования даты
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    // Проверяем, является ли дата валидной
    if (isNaN(date)) return 'Неверный формат даты';

    // Форматируем дату в читаемый формат
    return date.toLocaleString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {posts.map(post => (
        <div
          className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col"
          key={post.id}
        >
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 bg-purple-400 rounded-full flex items-center justify-center text-white font-bold mr-3">
              {post.author?.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="font-semibold text-gray-800">{post.author}</div>
              <div className="text-gray-500 text-sm">{formatDate(post.dateNow)}</div>
            </div>
          </div>
          <div className="text-gray-700 mb-2">{post.body}</div>
          <div className="text-gray-400 text-sm">ID поста: {post.id}</div>
        </div>
      ))}
    </div>
  );
}

export default PostList;
