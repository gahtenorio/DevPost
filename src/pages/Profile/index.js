import React, { useContext, useState } from 'react';
import { Modal } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../contexts/auth';
import Header from '../../components/Header';
import Feather from 'react-native-vector-icons/Feather';
import {
  Container,
  UploadButton,
  UploadText,
  Avatar,
  Name,
  Email,
  Button,
  ButtonText,
  ModalContainer,
  ButtonBack,
  Input
} from './styles';


export default function Profile() {
  const { signOut, user, storageUser, setUser } = useContext(AuthContext);
  const [url, setUrl] = useState(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(user?.name);

  // Atualizar perfil
  async function updateProfile() {
    if (name === '') {
      return;
    }

    await firestore().collection('users')
      .doc(user.uid).update({
        name: name
      })

    // Buscar todos os posts desse usuario
    const postDocs = await firestore().collection('posts')
      .where('userId', '==', user.uid).get();

    // Percorrer e atualizar os nomes do autor desse post
    postDocs.forEach(async doc => {
      await firestore().collection('posts').doc(doc.id).update({
        autor: name
      })
    })

    let data = {
      uid: user.uid,
      name: name,
      email: user.email,
    };
    setUser(data);
    storageUser(data);
    setOpen(false);
  }

  return (
    <Container>
      <Header />

      {
        url ?
          (
            <UploadButton
              onPress={() => { }}
            >
              <UploadText>+</UploadText>
              <Avatar
                Source={{ uri: url }}
              />
            </UploadButton>
          ) :
          (
            <UploadButton
              onPress={() => { }}
            >
              <UploadText>+</UploadText>
            </UploadButton>
          )
      }

      <Name numberOfLines={1}>{user?.name}</Name>
      <Email numberOfLines={1}>{user?.email}</Email>

      <Button
        bg="#428CFD"
        onPress={() => setOpen(true)}
      >
        <ButtonText color='#FFF'>Atualizar Perfil</ButtonText>
      </Button>

      <Button
        bg='#F1F1F1'
        onPress={() => signOut()}
      >
        <ButtonText color='#3B3B3B'>Sair</ButtonText>
      </Button>

      <Modal
        visible={open}
        animationType='slide'
        transparent={true}
      >
        <ModalContainer>
          <ButtonBack
            onPress={() => setOpen(false)}
          >
            <Feather
              name='arrow-left'
              size={22}
              color='#121212'
            />
            <ButtonText color='#121212'>Voltar</ButtonText>
          </ButtonBack>

          <Input
            placeholder={user?.name}
            value={name}
            onChangeText={(text) => setName(text)}
          />

          <Button
            bg='#428CFD'
            onPress={updateProfile}
          >
            <ButtonText color='#F1F1F1'>Atualizar</ButtonText>
          </Button>
        </ModalContainer>

      </Modal>
    </Container>
  );
}