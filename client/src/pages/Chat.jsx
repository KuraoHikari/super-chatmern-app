import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { allUsersRoute } from '../utils/ApiRouter';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
const Chat = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  useEffect(() => {
    setCurrentUsers();
  }, []);
  useEffect(() => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        getAllUsers();
      } else {
        navigate('/set-avatar');
      }
    }
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  const getAllUsers = async () => {
    const { data } = await axios.get(`${allUsersRoute}/${currentUser._id}`);
    console.log(data);
    setContacts(data);
  };
  const setCurrentUsers = async () => {
    const user = await JSON.parse(localStorage.getItem('chat-app-user'));
    setCurrentUser(user);
  };
  return (
    <Container>
      <div className="container">
        <Contacts contactsData={contacts} currentUser={currentUser} changeChat={handleChatChange} />
        {currentChat === undefined ? <Welcome currentUser={currentUser} /> : <ChatContainer currentChat={currentChat} currentUser={currentUser} />}
      </div>
    </Container>
  );
};
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 84vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
export default Chat;
