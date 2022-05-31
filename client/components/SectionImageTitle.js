import React, { useState, useEffect } from 'react';

import { Button, StyleSheet, Text, TextInput, View, SafeAreaView, Image, TouchableOpacity, FlatList, ScrollView, ImageStore } from 'react-native';

import * as ImagePicker from 'expo-image-picker';

export default function SectionImageTitle({navigation, index, item, images, addImage, setNewImage, deleteImage}) {

    const [image, setImage] = useState(null);

    useEffect(() => {
      (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
        alert('Sorry, Camera roll permissions are required to make this work!');
        }
      }
      })();

      // console.log(item.base64)
      // console.log(item.base64.data.toString('base64'))
    }, []);
    const handleAddImage = () => {
      if (!item.localPath) {
        alert('Please choose your image before inserting new one');
      }
      else {
        addImage();
      }
      // addImage();
    }


    const chooseImg = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        // mediaTypes: ImagePicker.MediaTypeOptions.All,
        // aspect: [4, 3],
        // quality: 1,			
        allowsEditing: true,
      });
    
      // console.log(result);
    
      if (!result.cancelled) {
        //  setImage(result.uri);
        setNewImage(result);
      }
    };

    return (
        <View style={styles.container}>
            {
              item.localPath 
              ? <Image source={{ uri: item.localPath }} style={{ width: '40%', aspectRatio: 1.5, }} />
              : (
              item.base64
              ? <Image source={{ uri: 'data:' + item.type + ';base64,' + item.base64.toString('base64') }} style={{ width: '40%', aspectRatio: 1.5, }} />
              :
              <Image source={require('../assets/temp_image.png')} />
              
              )
            }
            <TouchableOpacity
              style={{
                marginTop: 5
              }}
              onPress={chooseImg}
            >
              <Text>Choose image</Text>
            </TouchableOpacity>
            
            {/* <Button title="Choose image from camera roll" onPress={chooseImg} /> */}
            {
              index == images.length - 1
              && 
              <View
                style={
                  {
                    flexDirection: 'row',
                    position: 'absolute',
                    right: 10,
                    bottom: 10
                  }
                
                }
              >

                <TouchableOpacity
                  onPress={handleAddImage}
                  
                >
                    <Image
                        
                        // source={{ uri: 'https://github.com/tranhonghan/images/blob/main/plus_icon.png?raw=true' }}
                        // source={IMAGENAME}
                        source={require('../assets/add_image.png')}
                    />

                </TouchableOpacity>
                <TouchableOpacity
                  onPress={deleteImage}
                  style={
                    {
                      marginLeft: 12
                    }
                  }
                >
                    <Image
                        
                        // source={{ uri: 'https://github.com/tranhonghan/images/blob/main/plus_icon.png?raw=true' }}
                        // source={IMAGENAME}
                        source={require('../assets/delete_image.png')}
                    />

                </TouchableOpacity>
              </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width:'85%',
    aspectRatio: 2,
    backgroundColor: '#E4E7EC',
    marginTop: 20,
    justifyContent: 'center'

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
  }
});