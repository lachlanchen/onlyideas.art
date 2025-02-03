// app/index.js
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { DataStore } from 'aws-amplify';
import { User } from '../src/models';
import UserCard from '../src/components/UserCard';
import { useAuthenticator } from '@aws-amplify/ui-react-native';

export default function UsersFeed() {
  const [users, setUsers] = useState([]);
  const { signOut } = useAuthenticator();

  useEffect(() => {
    // Query all registered users
    DataStore.query(User).then(setUsers);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>All Users</Text>
      <Link href={'/newPost'} style={styles.link}>
        <Text style={styles.linkText}>Create New Post</Text>
      </Link>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          // Wrap each user in a link to their profile
          <Link href={`/user/${item.id}`} asChild>
            <UserCard user={item} />
          </Link>
        )}
        showsVerticalScrollIndicator={false}
      />
      <Text onPress={() => signOut()} style={styles.signOut}>
        Sign Out
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, paddingTop: 75 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  link: { marginBottom: 20 },
  linkText: { fontSize: 18, color: 'blue' },
  signOut: { fontSize: 18, color: 'red', marginTop: 15 },
});
