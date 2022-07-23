import { useEffect, useState } from 'react'
import { View, Input, Text, TouchableOpacity, Alert, PushNotificationIOS } from 'react-native';
import { Ionicons } from 'react-native-vector-icons' 
import { Image } from 'react-native-elements';
import { COLORS } from '../constants';
import { supabase, supabaseUrl } from "../initSupabase";
import * as ImagePicker from 'expo-image-picker'; 

export default function Avatar({ url, size, onUpload }) {
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (url) downloadImage(url)
  }, [url])

  const downloadImage = async (path) => {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path)
      if (error) {
        throw error
      }
      const url = supabaseUrl + '/storage/v1/object/public/avatars/' + path
      setAvatarUrl(url)

    } catch (error) {
      console.log('Error downloading image: ', error.message)
    }
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
        uploadAvatar(result.uri)
            .then(saveAvatar(result));
    }
  };
  
  const uploadAvatar = async (url) => {
    try {
        setUploading(true);

        const user = supabase.auth.user();
        if (!user) throw new Error("No user on the session!");

        const fileName = url.replace(/^.*[\\\/]/, "");

        let { error } = await supabase
            .from("profiles")
            .update([{avatar_url : fileName}])
            .eq('id', user.id)

        if (error) {
            console.log(error)
            throw new Error;
        } else {
            Alert.alert("Uploaded!")
        }
    } catch (error) {
        Alert.alert(error.message)
    } finally {
        console.log("done")
    }
  }

  const saveAvatar = async (photo) => {
    try {
        const ext = photo.uri.substring(photo.uri.lastIndexOf(".") + 1);

        const fileName = photo.uri.replace(/^.*[\\\/]/, "");

        let formData = new FormData();

        formData.append("files", {
            uri: photo.uri,
            name: fileName,
            type: photo.type ? `image/${ext}` : `video/${ext}`
        })

        setAvatarUrl(supabaseUrl + '/storage/v1/object/public/avatars/' + fileName);

        let { data, error } = await supabase.storage.from('avatars').upload(fileName, formData);

        if (error) {
            console.log(error)
            throw new Error;
        } 

    } catch (error) {
        Alert.alert(error.message)
    } finally {
        setUploading(false);
    }
  }

  return (
    <View style = {{alignItems: "center", marginTop: 30}}>
        <View style = {{
            position: "absolute",
            top: 0,
            right: 90
        }}>
            <Ionicons 
                name= "pencil-outline"
                color = {COLORS.white}
                size={25}
                onPress={pickImage}
            /> 
        </View>
        <View style = {{
            alignSelf: "center"
        }}>
            <Image
                source = { avatarUrl ? {uri : avatarUrl} : require('../assets/images/person01.png')}
                alt={avatarUrl ? 'Avatar' : 'No image'}
                className="avatar image"
                style={{ 
                    height: size, 
                    width: size,
                    borderRadius: 100,
                    overflow: 'hidden',
                    borderWidth: 3,
                    borderColor: COLORS.white
                }}
            />
        </View>
    </View>
  )
}