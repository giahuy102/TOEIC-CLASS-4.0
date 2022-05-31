import React, { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, SafeAreaView, Image, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthService from '../../../services/AuthService';

import { storeToken } from '../../../services/JWTStorage';


import SectionImageTitle from '../../../components/SectionImageTitle'


export default function Login({ navigation, route }) {
  const [isImage, setIsImage] = useState(true);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        // <Button onPress={() => setCount(c => c + 1)} title="Update count" />
        return (
          <TouchableOpacity onPress={() => navigation.navigate({
            name: 'Sections',
            params: {
                ...route.params,
                keyStack: route.params.keyStack.slice(0, -1)
            },
            merge: true
          })}>
            <Image source={require('../../../assets/back_arrow.png')} />

          </TouchableOpacity>
        );

      },
    });
  }, [navigation, route.params]);

  React.useEffect(() => {
    // navigation.setParams({
    //   ...route.params,
    //   sections: [
    //     ...route.params.sections,
    //     {
    //       key: route.params.sections.length,
    //       section_question: '',
    //       images: [
    //         // ...route.params.sections[route.params.sections.length - 1].images,
    //         {

    //           key: 0,
    //           path: null //image object, not a string
    //         }
    //       ],
    //       questions: [

    //       ]
    //     }
    //   ]
    // });
    // console.log(route.params)
  }, [])

  const handleAddImage = () => {
    const keyStackLength = route.params.keyStack.length;
    const idx = route.params.keyStack[keyStackLength - 1];

    let newSections = [...route.params.testData.sections]

    newSections[idx].images = [...newSections[idx].images, {
      key: newSections[idx].images.length,
      remotePath: '',
      localPath: '',
      type: '',
      base64: ''
    }];
    navigation.setParams({
      ...route.params,
      testData: {
        ...route.params.testData,
        sections: newSections
      }
    })
    // let newImages = [...route.params.sections[route.params.sections.length - 1].images];

  }

  const handleDeleteImage = () => {
    const keyStackLength = route.params.keyStack.length;
    const idx = route.params.keyStack[keyStackLength - 1];

    let newSections = [...route.params.testData.sections];

    newSections[idx].images = [...newSections[idx].images];
    if (newSections[idx].images.length > 1) newSections[idx].images.pop();
    else {
      newSections[idx].images[0].localPath = '';
      newSections[idx].images[0].base64 = '';
    } 
    navigation.setParams({
      ...route.params,
      testData: {
        ...route.params.testData,
        sections: newSections
      }
    })
  }

  const handleSetImage = (ob) => {
    const keyStackLength = route.params.keyStack.length;
    const idx = route.params.keyStack[keyStackLength - 1];

    let newSections = [...route.params.testData.sections];
    const idxImg = newSections[idx].images.length - 1;
    newSections[idx].images[idxImg].localPath = ob.uri;
    
    let temp = ob.uri.split('.');
    let imgExtension = temp[temp.length - 1];
    let jpeg = ['jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp']
    if (jpeg.includes(imgExtension)) newSections[idx].images[idxImg].type = 'image/' + 'jpeg';
    else newSections[idx].images[idxImg].type = 'image/' + imgExtension;
    newSections[idx].images[idxImg].base64 = '';


    // console.log(ob);
    navigation.setParams({
      ...route.params,
      testData: {
        ...route.params.testData,
        sections: newSections
      }
    })
  }

  const handleSetText = (text) => {
    const keyStackLength = route.params.keyStack.length;
    const idx = route.params.keyStack[keyStackLength - 1];

    let newSections = [...route.params.testData.sections];
    // const idxImg = newSections[idx].images.length - 1;
    // newSections[idx].images[idxImg].path = ob;
    newSections[idx].section_question = text;
    // console.log(ob);
    navigation.setParams({
      ...route.params,
      testData: {
        ...route.params.testData,
        sections: newSections
      }
    })
  }

  const handleAddQuestion = () => {
    const keyStackLength = route.params.keyStack.length;
    const idx = route.params.keyStack[keyStackLength - 1];

    let newSections = [...route.params.testData.sections];
    newSections[idx].questions = [...newSections[idx].questions, {
        key: newSections[idx].questions.length,
        question: '',
        answers: [
            {
                key: 0,
                answer: '', 
                isCorrect: true
            },
            {
                key: 1,
                answer: '', 
                isCorrect: false
            },
            {
                key: 2,
                answer: '', 
                isCorrect: false
            },
            {
                key: 3,
                answer: '', 
                isCorrect: false
            }
        ]
    }]; 
    navigation.navigate('NewQuestion', {
      testData: {
        ...route.params.testData,
        sections: newSections
      },
      keyStack: [...route.params.keyStack, newSections[idx].questions.length - 1]
    });
  }

  const handleUpdate = (key) => {
    navigation.navigate('NewQuestion', {
      ...route.params,
      keyStack: [...route.params.keyStack, key]
    });
  }

  const handleDelete = (key) => {
    const keyStackLength = route.params.keyStack.length;
    const idx = route.params.keyStack[keyStackLength - 1];

    let newSections = [...route.params.testData.sections];
    newSections[idx].questions.splice(key, 1);
    for (let i = key; i < newSections[idx].questions.length; i++) {
      newSections[idx].questions[i].key = i;
    } 
    navigation.setParams({
      ...route.params,
      testData: {
        ...route.params.testData,
        sections: newSections
      }
    })
  }

  return (
  <View
    style={
      {
        flex: 1
      }
    }
  >
    <ScrollView contentContainerStyle={styles.container}>


      <View
        style={
          {
            alignItems: 'center'
          }
        
        }
      
      >
        <View
          style={
            {
              width: '90%',
              marginBottom: 15,
              marginTop: 10
            }
          }
        >
          <Text
            style={
              {
                fontWeight: 'bold',
                fontSize: 17
              }
            }
          >
            Section title
            
          </Text>
        </View>
        
        <View style={styles.navigator}>

          <TouchableWithoutFeedback
            onPress={() => setIsImage(true)}
          >

            <View
              style={
                {
                  backgroundColor: isImage ? '#1570EF' : '#98A2B3',
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
            onPress={() => setIsImage(false)}
          >

            <View
              style={
                {
                  backgroundColor: !isImage ? '#1570EF' : '#98A2B3',
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
                  route.params.testData.sections[route.params.keyStack[route.params.keyStack.length - 1]] &&
                  route.params.testData.sections[route.params.keyStack[route.params.keyStack.length - 1]].images.map((item, index) => {
                    return <SectionImageTitle key={item.key}
                      index={index}
                      item={item}
                      images={route.params.testData.sections[route.params.keyStack[route.params.keyStack.length - 1]].images}
                      addImage={handleAddImage}
                      setNewImage={handleSetImage}
                      deleteImage={handleDeleteImage}
                    />
                  })
                }

              </View>


            ) : (
              <TextInput
                style={styles.input}
                numberOfLines={5}
                multiline
                value={route.params.testData.sections[route.params.keyStack[route.params.keyStack.length - 1]].section_question}
                onChangeText={(text) => handleSetText(text)}
              >
              </TextInput>

            )

        }
      </View>
      <View
        style={
          {
            alignItems: 'center'
          }
        }
      
      >
        <View
          style={
            {
              width: '90%',
              marginBottom: 15,
              marginTop: 15
            }
          }
        >
          <Text
            style={
              {
                fontWeight: 'bold',
                fontSize: 17
              }
            }
          >
            Questions
            
          </Text>
        </View>
        <View
          style={
            {
              width: '85%'
            }
          }
        >
          {
            route.params.testData.sections[route.params.keyStack[route.params.keyStack.length - 1]] &&
            route.params.testData.sections[route.params.keyStack[route.params.keyStack.length - 1]].questions.map((item, index) => {
              return <View

                key={item.key}
                style={
                  {
                    backgroundColor: 'white',
                    height: 80,
                    justifyContent: 'center',
                    padding: 5,
                    marginTop: 10,
                    marginBottom: 15
                  }
                }

              >
                <View
                  style={
                    {
                      flexDirection: 'row',
                      alignItems: 'center'
                    }
                  }
                
                >
                  <Image
                    source={require('../../../assets/globe.png')}
                  />

                  <View>
                    <Text
                      style={
                        {
                          marginLeft: 10
                        }
                      }
                    
                    >
                      Question {item.key + 1}
                      
                    </Text>
                  </View>
                </View>
                <View
                  style={
                    {
                      flexDirection: 'row',
                      justifyContent: 'flex-end'
                    }
                  }
                
                >
                  <TouchableOpacity
                    onPress={() => handleUpdate(item.key)}
                  >
                    <Text
                      style={
                        {
                          marginRight: 25
                        }
                      }
                    
                    >
                      Edit
                    </Text>
                  </TouchableOpacity>
                
                  <TouchableOpacity
                    onPress={() => handleDelete(item.key)}
                  >
                    <Text
                      style={
                        {
                          marginRight: 20
                        }
                      }
                    >
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

            })
          }
        </View>
      </View>


    </ScrollView>
    <TouchableOpacity
      style={styles.touchableOpacity}
      onPress={handleAddQuestion}
    >
      <Image
        style={styles.floatingButton}
        source={require('../../../assets/plus.png')}
      />

    </TouchableOpacity>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center'
    // width: 100
  },

  name: {
    width: '80%',
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