// app/newPost.js
import { View, Text, SafeAreaView, TextInput, Button, Image, StyleSheet } from 'react-native';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { DataStore, Storage } from 'aws-amplify';
import { Post } from '../src/models';
import { useAuthenticator } from '@aws-amplify/ui-react-native';
import * as Crypto from 'expo-crypto';

export default function NewPost() {
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const { user } = useAuthenticator();
  const router = useRouter();

  const onPost = async () => {
    // Optionally show a warning if no text is entered
    if (!text) return;
    const imageKey = image ? await uploadImage() : null;
    try {
      await DataStore.save(
        new Post({ text, likes: 0, userID: user.attributes.sub, image: imageKey })
      );
      setText('');
      setImage('');
      router.back();
    } catch (err) {
      console.error("Error saving post:", err);
    }
  };

  async function uploadImage() {
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const fileKey = `${Crypto.randomUUID()}.png`;
      await Storage.put(fileKey, blob, {
        contentType: 'image/png',
      });
      return fileKey;
    } catch (err) {
      console.error("Error uploading image:", err);
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>New Post</Text>
      <TextInput
        placeholder="Compose new post..."
        style={styles.input}
        value={text}
        onChangeText={setText}
        multiline
      />
      <Button title="Pick an image" onPress={pickImage} />
      {image ? <Image source={{ uri: image }} style={styles.imagePreview} /> : null}
      <Button title="Post" onPress={onPost} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 40, padding: 10 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  input: { borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 10, marginBottom: 15 },
  imagePreview: { width: '100%', aspectRatio: 1, marginVertical: 15 },
});
