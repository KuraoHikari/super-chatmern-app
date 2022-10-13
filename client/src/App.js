import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';
import SetAvatar from './pages/SetAvatar';
const ProtectedRoute = ({ redirectPath = '/', children }) => {
  if (localStorage.getItem('chat-app-user')) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};
const ProtectedRouteChat = ({ redirectPath = '/login', children }) => {
  if (!localStorage.getItem('chat-app-user')) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/register"
          element={
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/set-avatar"
          element={
            <ProtectedRouteChat>
              <SetAvatar />
            </ProtectedRouteChat>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRouteChat>
              <Chat />
            </ProtectedRouteChat>
          }
        />
        <Route path="*" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
