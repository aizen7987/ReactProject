// src/components/Chat.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { useSocket } from '../contexts/SocketContext';
import axios from 'axios';

const Chat: React.FC<{ route: any }> = ({ route }) => {
  const { userId, otherUserId, userRole } = route.params; 
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true); 
  const socket = useSocket(); 

  useEffect(() => {
    console.log('Conectando al socket...');
    socket.on('connect', () => {
      console.log('Conectado al socket:', socket.id);
      socket.emit('registerUser', userId);
    });

    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://192.168.5.41:3001/api/messages/${userId}/${otherUserId}`);
        console.log('Mensajes recuperados:', response.data);
        setMessages(response.data);
      } catch (error) {
        console.error('Error al obtener mensajes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    socket.on('receiveMessage', (data) => {
      console.log('Mensaje recibido a través del socket:', data); 
      // Solo agregar el mensaje si no es del usuario actual
      if (data.sender_id !== userId) {
        setMessages((prevMessages) => {
          const messageExists = prevMessages.some(msg => msg.id === data.id);
          if (!messageExists) {
            return [...prevMessages, data];
          }
          return prevMessages; 
        });
      }
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [userId, socket]); 

  const sendMessage = async () => {
    if (message.trim() === '') return; 
    const data = {
      sender_id: userId, 
      receiver_id: otherUserId,
      message,
    };
    console.log('Enviando mensaje:', data);
    
    try {
      socket.emit('sendMessage', data); 
      setMessages((prevMessages) => [...prevMessages, data]); 
      setMessage(''); 
    } catch (error) {
      console.error('Error al enviar el mensaje:', error); 
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat con {userRole === 'student' ? 'Tutor' : 'Estudiante'}</Text>
      {loading ? ( 
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
          renderItem={({ item }) => (
            <Text style={styles.message}>
              {item.sender_id === userId ? 'Tú: ' : userRole === 'student' ? 'Tutor: ' : 'Estudiante: '}{item.message}
            </Text>
          )}
        />
      )}
      <TextInput
        placeholder="Escribe un mensaje"
        value={message}
        onChangeText={setMessage}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={sendMessage}>
        <Text style={styles.buttonText}>Enviar</Text> 
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  message: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: '#e1ffc7', 
  },
  button: {
    backgroundColor: '#007BFF', 
    padding: 15,
    borderRadius: 5,
    width: '100%', 
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff', 
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Chat;