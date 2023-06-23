import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, Text } from 'react-native';
import axios from 'axios';
import URL from '../config/app';
import CustomButton from '../components/CustomButton';

export default function ValidateTokenScreen({navigation}) {
  const [token, setToken] = useState('');
  const [tokenValueDays, setTokenValueDays] = useState('');
  const [error, setError] = useState('')
  
  const handleValidateToken = async () => {
    try {
      const response = await axios.post(`${URL}/validateToken`, {
        token,
      });
      console.log(response.data.tokenValueDays)
      setTokenValueDays(response.data.tokenValueDays);
    } catch (error) {
      console.error(error);
      setError('Failed to validate token. Please try again.')
    }
  };

  const handleGoToHome = () => {
    navigation.navigate('Home')
  }
  return (
    <View style={styles.container}>
      <Text style={styles.textHeading}>Validate Token</Text>
      {error && (
        <Text style={styles.error}> {error}</Text>
      )}
      <TextInput
        placeholder="Token"
        value={token}
        onChangeText={setToken}
        style={styles.textInput}
      />
      <CustomButton title="Validate Token" onPress={handleValidateToken} />
      {tokenValueDays && (
        <Text style={styles.text}>Token Value in Days: {tokenValueDays}</Text>
      )}
      <Text onPress={handleGoToHome} style={styles.link}>Go to Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 'auto'
  },
  textInput: {
    width: 260,
    height: 50,
    marginBottom: 10,
    marginTop: 5,
    borderRadius: 5,
    color: '#4F4F4F',
    padding: 7,
    alignSelf: 'center',
    backgroundColor: 'rgba(217, 217, 217, 0.76)',
  },
  text: {
    fontSize: 18,
    marginLeft: 40,
    fontWeight: '300',
    margin: 5,
    color: '#4F4F4F',
  },
  link: {
    color: '#40A8EA',
    textAlign: 'center',
    marginTop: 10
  },
  textHeading: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
    color: '#4F4F4F',
  },
  error: {
    fontSize: 18,
    marginLeft: 40,
    fontWeight: '300',
    margin: 5,
    textAlign: 'center',
    color: 'red',
  },
})