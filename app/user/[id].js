// app/user/[id].js
import { useSearchParams } from 'expo-router';
import { Text, FlatList, View, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { DataStore } from 'aws-amplify';
import { User, Post } from '../../src/models';
import UserProfileHeader from '../../src/components/UserProfileHeader';
import PostComponent from '../../src/components/Post';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { id } = useSearchParams();

  useEffect(() => {
    // Fetch the selected user
    DataStore.query(User, id).then((u) => {
      setUser(u);
      setIsSubscribed(u?.isSubscribed || false);
    });
    // Fetch posts by this user
    DataStore.query(Post, (p) => p.userID.eq(id)).then(setPosts);
  }, [id]);

  if (!user) {
    return <Text style={styles.notFound}>User not found!</Text>;
  }

  return (
    <View style={styles.container}>
      <UserProfileHeader user={user} isSubscribed={isSubscribed} setIsSubscribed={setIsSubscribed} />
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostComponent post={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  notFound: { textAlign: 'center', marginTop: 50, fontSize: 18 },
});
