import { useState } from "react";
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import { VStack, Heading, Icon, useTheme } from "native-base";
import { Envelope, Key } from "phosphor-react-native";
import Logo from "../assets/logo_primary.svg";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const { colors } = useTheme();

  function handleSignIn() {
    if (!email || !senha) {
      return Alert.alert('Entrar', 'Informe e-mail e senha.');
    }

    setIsLoading(true);

    auth()
    .signInWithEmailAndPassword(email, senha)
    .catch((Error) => {
      console.log(Error);
      setIsLoading(false);
      
        if(Error.code === 'auth/invalid-email'){
          return Alert.alert('Entrar','E-mail inválido.');
        }
        if(Error.code === 'auth/wrong-password'){
          return Alert.alert('Entrar','E-mail ou senha inválido.');
        }
        if(Error.code === 'auth/user-not-found'){
          return Alert.alert('Entrar','E-mail ou senha inválido.');
        }

        return Alert.alert('Entrar','Não foi possivel acessar');
        
    });
  }

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />

      <Heading color="gray.100" fontSize="xl" mt={6} mb={8}>
        Acesse sua conta
      </Heading>
      <Input
        placeholder="E-mail"
        mb={4}
        InputLeftElement={
          <Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
        }
        onChangeText={setEmail}
      />
      <Input
        mb={8}
        placeholder="Senha"
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        secureTextEntry
        onChangeText={setSenha}
      />
      <Button 
      title="Entrar" 
      w="full" 
      onPress={handleSignIn}
      isLoading={isLoading}
       />
    </VStack>
  );
}
