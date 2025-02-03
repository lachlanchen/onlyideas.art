// src/components/UserProfileHeader.js
import { useRouter } from 'expo-router';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { DataStore } from 'aws-amplify';
import { User } from '../models';

const UserProfileHeader = ({ user, isSubscribed, setIsSubscribed }) => {
  const router = useRouter();

  const toggleSubscription = async () => {
    try {
      const originalUser = await DataStore.query(User, user.id);
      if (originalUser) {
        const updatedUser = User.copyOf(originalUser, updated => {
          updated.isSubscribed = !originalUser.isSubscribed;
        });
        await DataStore.save(updatedUser);
        setIsSubscribed(updatedUser.isSubscribed);
      }
    } catch (error) {
      console.log("Error updating subscription:", error);
    }
  };

  return (
    <View style={styles.header}>
      <Image source={{ uri: user.coverImage }} style={styles.cover} />
      <View style={styles.info}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.handle}>@{user.handle}</Text>
        <Pressable onPress={toggleSubscription} style={[styles.button, { backgroundColor: isSubscribed ? 'white' : 'royalblue' }]}>
          <Text style={[styles.buttonText, { color: isSubscribed ? 'royalblue' : 'white' }]}>
            {isSubscribed ? 'SUBSCRIBED' : 'SUBSCRIBE'}
          </Text>
        </Pressable>
        <Text style={styles.bio}>{user.bio}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: { marginBottom: 15 },
  cover: { width: '100%', height: 200 },
  info: { padding: 10 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginTop: -50, borderWidth: 3, borderColor: 'white' },
  name: { fontSize: 22, fontWeight: '600', marginTop: 5 },
  handle: { color: 'gray', marginBottom: 10 },
  button: { padding: 10, borderRadius: 25, alignItems: 'center', marginVertical: 10 },
  buttonText: { fontSize: 16, fontWeight: '600' },
  bio: { fontSize: 14, lineHeight: 20 },
});

export default UserProfileHeader;
