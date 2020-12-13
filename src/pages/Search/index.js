import React, { useState, useEffect } from 'react';
import SearchList from '../../components/SearchList';
import firestore from '@react-native-firebase/firestore';
import Feather from 'react-native-vector-icons/Feather';
import {
  Container,
  Input,
  AreaInput,
  List
} from './styles';

export default function Search() {
  const [input, setInput] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (input === '' || input === undefined) {
      setUsers([]);
      return;
    }

    const subscriber = firestore().collection('users')
      .where('name', '>=', input)
      .where('name', '<=', input + "\uf8ff")
      .onSnapshot(snapshot => {
        const listsUsers = [];

        snapshot.forEach(doc => {
          listsUsers.push({
            ...doc.data(),
            id: doc.id
          });
        });

        setUsers(listsUsers);
        console.log(listsUsers);

      })

    return () => subscriber();

  }, [input]);

  return (
    <Container>

      <AreaInput>
        <Feather
          name='search'
          color='#E52246'
          size={20}
        />
        <Input
          placeholder='Procurando alguém?'
          placeholderTextColor='#353840'
          value={input}
          onChangeText={(text) => setInput(text)}

        />
      </AreaInput>

      <List
        showsVerticalScrollIndicator={false}
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SearchList data={item} />}
      />

    </Container>
  );
}