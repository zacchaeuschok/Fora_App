// import React from 'react';
// import {
//   Text,
//   View,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   ActivityIndicator,
// } from 'react-native';

// import ImageUploadExpo from 'react-native-upload-image-expo';

// export const Avatar = () => {
//   return (
//     <ImageUploadExpo
//       method="POST"
//       endpoint="https://file-upload-example-backend-dkhqoilqqn.now.sh/upload"
//       payloadKey="photo"
//       onFailure={(error) => console.warn(error)}
//       onSuccess={(image, rawResponse) => {
//         console.log(`Image URL: ${image.location}`);
//         console.log('headers: ', rawResponse.headers);
//       }}
//       onStartUpload={() => console.log('Upload has begun!')}
//       headers={{
//         'uid': '...',
//         'client': '...',
//         'access-token': '...',
//       }}
//     >
//       {props => (
//         <TouchableOpacity
//           onPress={props.askPermission}
//         >
//           <ImageUI
//             loading={props.loading}
//             error={props.error}
//             image={props.image}
//           />
//         </TouchableOpacity>
//       )}
//     </ImageUploadExpo>
//     );
// };

// const ImageUI = ({ image, loading, error }) => {
//   if (image) {
//     return (
//       <Image
//         source={{ uri: image.location }}
//         style={styles.image}
//         resizeMode="cover"
//       />
//     );
//   }
//   // if (loading) return <ActivityIndicator />;
//   if (error) return <Text>Error :(</Text>;

//   return <Text>Select an image</Text>;
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   touchable: {
//     height: 300,
//     width: '100%',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   image: { width: '100%', height: 300 },
// });