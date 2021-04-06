 
import React, { useContext, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';
import { useContacts } from './ContactsProvider';

const ConversationsContext = React.createContext()

export function useConversations() {
  return useContext(ConversationsContext)
}



export function ConversationsProvider({ id,children }) {
  const [conversations, setConversations] = useLocalStorage('conversations', [])
  const { contacts } = useContacts();
  const [selectedConversationIndex,setSelectedConversationIndex] =useState(0)
  function createConversation(recipient) {
    setConversations(prevConversations => {
      return [...prevConversations, {recipient, messages: []}]
    })
  }

  function addMessageToConversation({recipient,text,sender}){

  }

  function sendMessage({recipient, text}){
    addMessageToConversation({recipient,text,sender:id  })
  }
  const formattedConversations = conversations.map((conversation, index) =>{
      const recipients = conversation.recipient.map(recipient =>{
        const contact = contacts.find(contact =>{
            return contact.id === recipient
        })
        const name = (contact && contact.name) || recipient
        return {id:recipient, name}
      })
      const selected = index === selectedConversationIndex;
      return {...conversation, recipients, selected}
  })

  const value = {
    conversations:formattedConversations,
    selectedConversation:formattedConversations,
    sendMessage,
    createConversation,
    selectConversationIndex: setSelectedConversationIndex,
   
  }

  return (
    <ConversationsContext.Provider value={value}>
       {console.log(formattedConversations)}
      {children}
    </ConversationsContext.Provider>
  )
}