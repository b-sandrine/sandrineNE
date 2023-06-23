import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CustomButton from '../components/CustomButton';

export default function HomeScreen({ navigation }) {
  return (
    <View>
      <Text style={styles.text}>Welcome to EUCL prepaid token generator</Text>
      <CustomButton
        title="Generate Token"
        onPress={() => navigation.navigate('GenerateToken')}
      />
      <CustomButton
        title="Validate Token"
        onPress={() => navigation.navigate('ValidateToken')}
      />
      <CustomButton
        title="Token List"
        onPress={() => navigation.navigate('TokenList')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 80,
    marginBottom: 10,
    color: '#4F4F4F',
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
})