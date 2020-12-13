import React from 'react';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  Container,
  Header,
  Avatar,
  Name,
  ContentView,
  Content,
  Actions,
  LikeButton,
  Like,
  TimePost
} from './styles';

import avatarImg from '../../assets/avatar.png';

export default function PostsList({ data, userId }) {
  const navigation = useNavigation();

  function formatTimePost() {
    //converter timestamp para Data
    const datePost = new Date(data.created.seconds * 1000);
    return formatDistance(
      new Date(),
      datePost,
      {
        locale: ptBR
      }
    )
  }

  async function likePost(id, likes) {
    const docId = `${userId}_${id}`;

    //Chegar se o post já foi curtido
    const doc = await firestore().collection('likes')
      .doc(docId).get();

    if (doc.exists) {
      //Ele ja curtiu esse post
      await firestore().collection('posts')
        .doc(id).update({
          likes: likes - 1
        });

      await firestore().collection('likes')
        .doc(docId).delete();

      return;
    }

    // Criar o like no post
    await firestore().collection('likes')
      .doc(docId).set({
        postId: id,
        userId: userId,
      });

    //somar + 1 like no post
    await firestore().collection('posts')
      .doc(id).update({
        likes: likes + 1
      });
  }

  return (
    <Container>
      <Header
        onPress={() => navigation.navigate('PostsUser', { title: data.autor, userId: data.userId })}
      >
        {
          data.avatarUrl ?
            (
              <Avatar
                source={{ uri: data.avatarUrl }}
              />
            ) :
            <Avatar
              source={avatarImg}
            />
        }

        <Name>{data?.autor}</Name>
      </Header>

      <ContentView>
        <Content>{data?.content}</Content>
      </ContentView>

      <Actions>
        <LikeButton
          onPress={() => likePost(data.id, data.likes)}
        >
          <Like>
            {data?.likes === 0 ? '' : data?.likes}
          </Like>
          <Material
            name={data?.likes === 0 ? 'heart-plus-outline' : 'cards-heart'}
            size={20}
            color='#E52246'
          />
        </LikeButton>

        <TimePost>
          {formatTimePost()}
        </TimePost>
      </Actions>
    </Container>
  );
}