import React, { useState } from 'react';
import { Text } from 'react-native';
import {
  Container,
  Title,
  Input,
  Button,
  ButtonText,
  SignUpButton,
  SignUpText
} from './styles';

export default function Login() {
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
  }

  function handleSignUp() {
    if (name === '' || email === '' || password === '') {
      alert('Preencha todos os campos!');
      return;
    }
  }

  if (login) {
    return (
      <Container >
        <Title>
          Dev
          <Text style={{ color: '#E52246' }}>Post</Text>
        </Title>

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
          onPress={handleLogin}
        >
          <ButtonText>Acessar</ButtonText>
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
      <Title>
        Dev
          <Text style={{ color: '#E52246' }}>Post</Text>
      </Title>

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
        onPress={handleSignUp}
      >
        <ButtonText>Cadastrar</ButtonText>
      </Button>

      <SignUpButton
        onPress={() => toggleLogin()}
      >
        <SignUpText>Já tenho uma conta.</SignUpText>
      </SignUpButton>
    </Container>
  );
}