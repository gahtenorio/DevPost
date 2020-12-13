import React, { useState, useContext, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../contexts/auth';
import Feather from 'react-native-vector-icons/Feather';
import Header from '../../components/Header';
import PostList from '../../components/PostsList';
import {
  Container,
  ButtonPost,
  ListPosts
} from './styles';
import { Text } from 'react-native';

export default function Home() {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscriber = firestore()
      .collection('posts')
      .orderBy('created', 'desc')
      .onSnapshot(snapshot => {
        const postList = [];

        snapshot.forEach(doc => {
          postList.push({
            ...doc.data(),
            id: doc.id,
          });
        });

        setPosts(postList);
        setLoading(false);

      })

    return () => subscriber();
  }, []);

  return (
    <Container>
      <Header />

      {
        loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={50} color='#E52246' />
          </View>
        ) :
          (
            <ListPosts
              showsVerticalScrollIndicator={false}
              data={posts}
              renderItem={({ item }) => <PostList data={item} userId={user.uid} />}
            />
          )
      }

      <ButtonPost
        onPress={() => navigation.navigate('NewPost')}
      >
        <Feather
          name='edit-2'
          color='#FFF'
          size={25}
        />
      </ButtonPost>

    </Container>
  );
}