import { useState } from 'react';
import { VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import firestore from '@react-native-firebase/firestore';

import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Alert } from 'react-native';

import {Header} from '../components/Header';

export function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState ('');
  const [description, setDescription] = useState ('');

  const navigation = useNavigation();

  function handleNewOrderReister(){
    if(!patrimony || !description){
      return Alert.alert('Registrar', 'Preencha todos os campos');
    }
    setIsLoading(true); 
    
    firestore()
    .collection('orders')
    .add({
      patrimony,
      description,
      status: 'open',
      created_at: firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      Alert.alert('Solicitação', 'Solicitação cadastrada com sucesso.');
      navigation.goBack();
    })
    .catch((Error) =>{
      console.log(Error);
      setIsLoading(false);
      return Alert.alert('Solicitação', 'Nao foi possivel registrar o pedido');
    });
  }


  return (

    <VStack flex={1} p={6} bg="gray.600">
        <Header title="Nova Soliitação"/>
        
        <Input 
        mt={4}
        placeholder="Numero do Patrimônio"
        onChangeText={setPatrimony}
        />

        <Input
        placeholder="Descrição do Problema"
        mt={5}
        flex={1}
        multiline
        textAlignVertical="top"
        onChangeText={setDescription}
        />
        <Button
        title="Cadastrar"
        mt={5}
        isLoading={isLoading}
        onPress={handleNewOrderReister}
        />
    </VStack>
  );
}