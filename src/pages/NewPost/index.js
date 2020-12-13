import React, { useState, useLayoutEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../contexts/auth';
import {
  Container,
  Input,
  Button,
  ButtonText
} from './styles';

export default function () {
  const { user } = useContext(AuthContext);

  const navigation = useNavigation();
  const [post, setPost] = useState('');

  useLayoutEffect(() => {
    const options = navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => handlePost()}
        >
          <ButtonText>Compartilhar</ButtonText>
        </Button>
      )
    })
  }, [navigation, post]);

  async function handlePost() {
    if (post === '') {
      console.log('Seu post contem conteudo inválido');
      return;
    }

    let avatarUrl = null;
    try {
      let res = await storage().ref('users').child(user?.uid).getDownloadURL();
      avatarUrl = res;

    } catch (error) {
      avatarUrl = null;
    }

    await firestore().collection('posts')
      .add({
        created: new Date(),
        content: post,
        autor: user.name,
        likes: 0,
        avatarUrl,
        userId: user.uid,
      }).then(() => {
        setPost('');
        console.log('Post criado com sucesso!');
      }).catch((error) => {
        console.log(error);
      })

    navigation.goBack();

  }

  return (
    <Container>
      <Input
        placeholder='O que está acontecendo?'
        placeholderTextColor='#DDD'
        multiline={true}
        maxLength={300}
        value={post}
        onChangeText={(text) => setPost(text)}
        autoCorrect={false}
      >
      </Input>
    </Container>
  );
}