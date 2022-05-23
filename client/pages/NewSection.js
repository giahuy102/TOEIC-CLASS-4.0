import React, { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, SafeAreaView, Image, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthService from '../services/AuthService';

import { storeToken } from '../services/JWTStorage';


import SectionImageTitle from '../components/SectionImageTitle'


export default function Login({navigation, route}) {
    const [isImage, setIsImage] = useState(true);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => {
                // <Button onPress={() => setCount(c => c + 1)} title="Update count" />
                return (
                    <TouchableOpacity onPress={() => navigation.navigate({
                      name: 'Sections',
                      params: route.params,
                      merge: true
                    })}>
                        <Image source={require('../assets/back_arrow.png') }/>

                    </TouchableOpacity>
                );
                
            },
        });
    }, [navigation, route.params]);

    React.useEffect(() => {
      navigation.setParams({
        ...route.params,
        sections: [
          ...route.params.sections,
          {
            key: route.params.sections.length,
            section_question: '',
            images: [
              // ...route.params.sections[route.params.sections.length - 1].images,
              {
                
                key: 0,
                path: null //image object, not a string
              }
            ],
            questions: [
              
            ]
          }
        ]
      });
    }, [])

    const handleAddImage = () => {
      
      const idx = route.params.sections.length - 1;
      
      let newSections = [...route.params.sections]
      
      newSections[idx].images = [...newSections[idx].images, {
        key: newSections[idx].images.length,
        path: null
      }]; 
      navigation.setParams({
        ...route.params,
        sections: newSections
      })
      // let newImages = [...route.params.sections[route.params.sections.length - 1].images];

    }

    const handleDeleteImage = () => {
      const idx = route.params.sections.length - 1;
      
      let newSections = [...route.params.sections]
      
      newSections[idx].images = [...newSections[idx].images];
      if (newSections[idx].images.length > 1) newSections[idx].images.pop();
      else newSections[idx].images[0].path = null; 
      navigation.setParams({
        ...route.params,
        sections: newSections
      })
    }

    const handleSetImage = (ob) => {
      const idx = route.params.sections.length - 1;
      
      let newSections = [...route.params.sections]
      const idxImg = newSections[idx].images.length - 1;
      newSections[idx].images[idxImg].path = ob;
      // console.log(ob);
      navigation.setParams({
        ...route.params,
        sections: newSections
      })
    }

    const handleSetText = (text) => {
      const idx = route.params.sections.length - 1;
      
      let newSections = [...route.params.sections]
      // const idxImg = newSections[idx].images.length - 1;
      // newSections[idx].images[idxImg].path = ob;
      newSections[idx].section_question = text;
      // console.log(ob);
      navigation.setParams({
        ...route.params,
        sections: newSections
      })
    }

    const handleAddQuestion = () => {
      navigation.navigate('NewQuestion', route.params);
    }
    return (
        <ScrollView contentContainerStyle={styles.container}>

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
                  {
                    route.params.sections[route.params.sections.length - 1] && 
                    route.params.sections[route.params.sections.length - 1].images.map((item, index) => {
                      return <SectionImageTitle key={item.key} 
                                                index={index} 
                                                item={item} 
                                                images={route.params.sections[route.params.sections.length - 1].images} 
                                                addImage={handleAddImage}
                                                setNewImage={handleSetImage}
                                                deleteImage={handleDeleteImage}
                            />
                    })
                  }
                    {/* <Text>{route.params.sections[0] && route.params.sections[0].key}</Text>                     */}
                  
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
                    value={route.params.sections[route.params.sections.length - 1].section_question}
                    onChangeText={(text) => handleSetText(text)}
                  >
                  </TextInput>
                
                // </View>
              )

            }
          </View>
          <View>
            <Text>Question</Text>
            {
              route.params.sections[route.params.sections.length - 1] && 
              route.params.sections[route.params.sections.length - 1].questions.map((item, index) => {
                return <View 
                
                          key={item.key}
                          style={
                            {
                              flexDirection: 'row'
                            }
                          }
                      >
                        <View>
                          <Image 
                            source={require('../assets/globe.png')}
                          />
                        </View>
                        <View>
                          <Text>Question {item.key + 1}</Text>
                        </View>                    
                      </View>
                
              })
            }
          </View>
            <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={handleAddQuestion}
            >
                <Image
                    style={styles.floatingButton}
                    // source={{ uri: 'https://github.com/tranhonghan/images/blob/main/plus_icon.png?raw=true' }}
                    // source={IMAGENAME}
                    source={require('../assets/plus.png')}
                />

            </TouchableOpacity>
            
        </ScrollView>

    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
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
  },
  touchableOpacity: {
      position: 'absolute',
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      right: 30,
      bottom: 30,
      flexDirection: 'row'
  },
  floatingButton: {
      resizeMode: 'contain',
      width: 50,
      height: 50,
  }

});