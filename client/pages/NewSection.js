import React, { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, SafeAreaView, Image, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthService from '../services/AuthService';

import { storeToken } from '../services/JWTStorage';


import SectionImageTitle from '../components/SectionImageTitle'

export default function Login({navigation}) {
    const [isImage, setIsImage] = useState(true);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => {
                // <Button onPress={() => setCount(c => c + 1)} title="Update count" />
                return (
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        <Image source={require('../assets/back_arrow.png') }/>

                    </TouchableOpacity>
                );
                
            },
        });
    }, [navigation]);
    return (

        // <View style={styles.container}>
        //   <SectionImageTitle />
        // </View>

        <ScrollView>
          <View>
            <Text>Section title</Text>
            <View style={ styles.navigator }>
              {/* <View style={{ 
                backgroundColor: isImage ? '#1570EFF': '#98A2B3',
                width: 100,
                height: 100
              }}>
                <Text>Image</Text>
              </View> */}
              <TouchableWithoutFeedback
                onPress={ () => setIsImage(true) }
              >
                
                <View
                  style={
                    {
                      backgroundColor: isImage ? '#1570EF': '#98A2B3',
                      width: '20%',
                      height: 28,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderBottomLeftRadius: 7,
                      borderTopLeftRadius: 7
                    }
                  }
                >
                  <Text
                    style={
                      {
                        color: 'white'
                      }
                    }
                  >Image
                  
                  </Text>
                </View>
                
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={ () => setIsImage(false) }
              >
                
                <View
                  style={
                    {
                      backgroundColor: !isImage ? '#1570EF': '#98A2B3',
                      width: '20%',
                      height: 28,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderBottomRightRadius: 7,
                      borderTopRightRadius: 7
                    }
                  }
                >
                  <Text
                    style={
                      {
                        color: 'white'
                      }
                    }
                  >Text
                  
                  </Text>
                </View>
                
              </TouchableWithoutFeedback>
              {/* <View>
                <Text>Text</Text>
              </View> */}
            </View>
          </View>
          <View
            style={
              {
                alignItems: 'center'
              }
            }
          >
            {
              isImage ?
              (
                <View>
                  <SectionImageTitle />
                  <SectionImageTitle />
                  <SectionImageTitle />
                  <SectionImageTitle />
                </View>
                

              ) : (
                // <View 
                //   style={
                //     {
                //       width: '100%'
                //     }
                //   }
                // >
                  <TextInput
                    style={ styles.input }
                    numberOfLines={5}
                    multiline
                  >
                  </TextInput>
                
                // </View>
              )

            }
          </View>

        </ScrollView>

    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center'
    // width: 100
  },
  
  name: {
    width:'80%',
    aspectRatio: 1,
    backgroundColor: '#98E3A8',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },


  member: {
    width: '95%',
    aspectRatio: 3.5,
    borderWidth: 1,
    borderColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    backgroundColor: 'white'
  },

  name_text: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white'
  },

  right: {
      justifyContent: 'space-around',
      flex: 1,
      height: '85%',
      marginLeft: 7
  },

  left: {
      height: '100%',
      aspectRatio: 1,
      alignItems: 'center',
      justifyContent: 'center'
  },

  sub_content: {
    marginLeft: 5
  },

  navigator: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  input: {
    // width: 500,
    backgroundColor: '#E4E7EC',
    // height: '90%',
    width: '85%',
    height: 350,
    marginTop: 20
  }

});