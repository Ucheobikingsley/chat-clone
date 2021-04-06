import React,{useState} from 'react'
import {Modal,Form,Button} from 'react-bootstrap'
import {useContacts} from '../contents/ContactsProvider'
import {useConversations} from '../contents/ConversationsProvider'

export default function NewConversationModal({closeModal}) {
    
    const [selectedContactIds, setSelectedContactIds] = useState([])
    const { contacts } = useContacts()
    const {createConversation} = useConversations()
    function handleSubmit(e){
        e.preventDefault();
        createConversation(selectedContactIds);
        closeModal();   
    }
    function handleCheckBoxChange(contactId){
        setSelectedContactIds(prevSelectedContactids =>{
            if(prevSelectedContactids.includes(contactId)){
                return prevSelectedContactids.filter(prevId =>{
                    return contactId !== prevId
                })
            }else{
                return  [...prevSelectedContactids,contactId]
            }

        })
    }
    return (
        <>
        <Modal.Header closeButton>Create Conversation</Modal.Header>
         <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {contacts.map(contact =>(
                <Form.Group controlId={contact.id} key={contact.id}>
                    <Form.Check
                        type="checkbox"
                        // value={selectedContactIds.includes(contact.id)}
                        label={contact.name}
                        onChange={() => handleCheckBoxChange(contact.id)}
                    />
                </Form.Group>
            ))}
            <Button type="submit">Create</Button>
          </Form>
        </Modal.Body>
      </>
    )
}




