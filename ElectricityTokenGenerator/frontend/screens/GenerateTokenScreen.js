import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert , Text} from 'react-native';
import axios from 'axios';
import URL from '../config/app';
import CustomButton from '../components/CustomButton';

export default function GenerateTokenScreen({navigation}) {
  const [amount, setAmount] = useState('');
  const [meterNumber, setMeterNumber] = useState('');
  const [error, setError] = useState('')
  const [token, setToken] = useState('');

  const handleGenerateToken = async () => {
    try {
      const response = await axios.post(`${URL}/generateToken`, {
        amount: parseInt(amount),
        meterNumber,
      });
      const token = response.data.token;
      console.log(token)
      setToken(token);
    } catch (error) {
      console.error(error);
      setError("Invalid inputs")
    }
  };

  const handleGoToHome = () => {
    navigation.navigate('Home')
  }

  return (
    <View>
      <Text style={styles.textHeading}>Generate Token</Text>
      {error && (
        <Text style={styles.error}> {error}</Text>
      )}
      <TextInput
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.textInput}
      />
      <TextInput
        placeholder="Meter Number"
        value={meterNumber}
        onChangeText={setMeterNumber}
        keyboardType="numeric"
        style={styles.textInput}
      />
      <CustomButton title="Generate Token" onPress={handleGenerateToken} />
      {token && (
        <Text style={styles.text}>Token: {token}</Text>
      )}
      <Text onPress={handleGoToHome} style={styles.link}>Go to Home</Text>
    </View>
  );
}


const styles = StyleSheet.create({
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
  textHeading: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
    color: '#4F4F4F',
  },
  text: {
    fontSize: 18,
    marginLeft: 40,
    fontWeight: '300',
    margin: 5,
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
  link: {
    color: '#40A8EA',
    textAlign: 'center',
    marginTop: 10
  }
})