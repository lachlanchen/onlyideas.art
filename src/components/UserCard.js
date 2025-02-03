// src/components/UserCard.js
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';

export default function UserCard({ user }) {
  return (
    <Pressable style={styles.card}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      <View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.handle}>@{user.handle}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
  name: { fontSize: 18, fontWeight: '600' },
  handle: { color: 'gray' },
});
