import React, { useState, useContext } from 'react';
import { Text, ActivityIndicator } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import * as Animatable from 'react-native-animatable';
import {
  Container,
  Title,
  Input,
  Button,
  ButtonText,
  SignUpButton,
  SignUpText
} from './styles';

const TitleAnimated = Animatable.createAnimatableComponent(Title);

export default function Login() {
  const { signUp, signIn, loadingAuth } = useContext(AuthContext);

  const [login, setLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function toggleLogin() {
    setLogin(!login);
    setName('');
    setEmail('');
    setPassword('');
  }

  function handleLogin() {
    if (email === '' || password === '') {
      alert('Preencha todos os campos!');
      return;
    }

    signIn(email, password);
  }

  function handleSignUp() {
    if (name === '' || email === '' || password === '') {
      alert('Preencha todos os campos!');
      return;
    }

    signUp(email, password, name);
  }

  if (login) {
    return (
      <Container >
        <TitleAnimated animation='flipInY'>
          Dev
          <Text style={{ color: '#E52246' }}>Post</Text>
        </TitleAnimated>

        <Input
          placeholder='email@email.com'
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder='********'
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <Button
          onPress={handleLogin}>
          {
            loadingAuth ? (
              <ActivityIndicator size={20} color='#FFF' />
            ) : (
                <ButtonText>Acessar</ButtonText>
              )
          }
        </Button>

        <SignUpButton
          onPress={toggleLogin}
        >
          <SignUpText>Criar uma conta.</SignUpText>
        </SignUpButton>
      </Container>
    );
  }
  return (
    <Container >
      <TitleAnimated animation='fadeInDown'>
        Dev
          <Text style={{ color: '#E52246' }}>Post</Text>
      </TitleAnimated>

      <Input
        placeholder='Nome'
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Input
        placeholder='email@email.com'
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Input
        placeholder='********'
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <Button
        onPress={handleSignUp}>
        {
          loadingAuth ? (
            <ActivityIndicator size={20} color='#FFF' />
          ) : (
              <ButtonText>Cadastrar</ButtonText>
            )
        }
      </Button>

      <SignUpButton
        onPress={() => toggleLogin()}>
        <SignUpText>Já tenho uma conta.</SignUpText>
      </SignUpButton>
    </Container>
  );
}