import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';
import URL from '../config/app';
import CustomButton from '../components/CustomButton';

export default function TokenListScreen({navigation}) {
  const [meterNumber, setMeterNumber] = useState('');
  const [tokenList, setTokenList] = useState([]);
  const [error, setError] = useState('')

  const fetchTokenList = async () => {
    try {
      const response = await axios.get(`${URL}/tokensByMeterNumber/${meterNumber}`);
      const tokenList = response.data; // Assuming response.data is an array of token objects
      console.log(response.data);
      setTokenList(tokenList);
    } catch (error) {
      console.error(error);
      setError("Invalid Meter Number. Please try again.")
    }
  };

  const handleGoToHome = () => {
    navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textHeading}>Validate Token List</Text>
      {error && (
        <Text style={styles.error}> {error}</Text>
      )}
      <Text style={styles.text}>Enter Meter Number:</Text>
      <TextInput
        value={meterNumber}
        onChangeText={setMeterNumber}
        placeholder="Meter Number"
        style={styles.textInput}
      />
      <CustomButton title="Fetch Tokens" onPress={fetchTokenList} />
      <Text style={styles.headerText}>Token List</Text>
      {
        tokenList.map((item) => {
          return (
            <View style={styles.view}>
              <Text style={styles.text1}>Token: {item.token}</Text>
              <Text style={styles.text1}>Status: {item.tokenStatus}</Text>
              <Text style={styles.text1}>Value in Days: {item.tokenValueDays}</Text>
              <Text style={styles.text1}>Purchased Date: {item.purchasedDate}</Text>
              <Text style={styles.text1}>Amount: {item.amount}</Text>
            </View>
          )
        })
      }
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
  headerText: {
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    margin: 5,
    color: '#4F4F4F',
  },
  text: {
    fontSize: 18,
    marginLeft: 40,
    fontWeight: '300',
    margin: 5,
    color: '#4F4F4F',
  },
  text1: {
    fontSize: 16,
    // marginLeft: 40,
    // fontWeight: '300',
    margin: 2,
    color: '#4F4F4F',
  },
  view : {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: 180
   },
   link: {
     color: '#40A8EA',
     textAlign: 'center',
     marginTop: 10
   },
   error: {
    fontSize: 18,
    marginLeft: 40,
    fontWeight: '300',
    margin: 5,
    textAlign: 'center',
    color: 'red',
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
}) 