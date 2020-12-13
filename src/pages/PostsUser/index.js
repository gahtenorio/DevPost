import React, { useLayoutEffect, useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { ActivityIndicator, Text, View } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import PostsList from '../../components/PostsList';
import {
  Container,
  ListPosts
} from './styles';

export default function PostsUser({ route }) {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState(route.params.title);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title === '' ? '' : title
    });

  }, [navigation, title]);

  useEffect(() => {
    const subscriber = firestore().collection('posts')
      .where('userId', '==', route.params.userId)
      .orderBy('created', 'desc')
      .onSnapshot(snapshot => {
        const postList = [];

        snapshot.forEach(doc => {
          postList.push({
            ...doc.data(),
            id: doc.id
          });
        });
        setPosts(postList);
        setLoading(false);
      })

    return () => subscriber();
  }, []);

  return (
    <Container>
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
              renderItem={({ item }) => <PostsList data={item} userId={user.uid} />}
            />
          )
      }
    </Container>
  );
}