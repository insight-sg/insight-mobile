import {
  SimpleLineIcons,
  FontAwesome,
  MaterialCommunityIcons,
  AntDesign,
} from '@expo/vector-icons';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

function TabBarSimpleLineIcon(props: {
  name: React.ComponentProps<typeof SimpleLineIcons>['name'];
  color: string;
}) {
  return <SimpleLineIcons size={28} style={{ marginBottom: -3 }} {...props} />;
}

function TabBarMaterialCommunityIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  color: string;
}) {
  return (
    <MaterialCommunityIcons size={28} style={{ marginBottom: -3 }} {...props} />
  );
}

function TabBarAntDesignIcon(props: {
  name: React.ComponentProps<typeof AntDesign>['name'];
  color: string;
}) {
  return <AntDesign size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      safeAreaInsets={{ bottom: 0 }}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
        tabBarActiveBackgroundColor:
          Colors[colorScheme ?? 'light'].tabIconDefault,
        tabBarInactiveBackgroundColor:
          Colors[colorScheme ?? 'light'].tabBackgroundColor,
        tabBarStyle: {
          height: 65,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          // headerRight: () => (
          //   <Link href='/modal' asChild>
          //     <Pressable>
          //       {({ pressed }) => (
          //         <FontAwesome
          //           name='info-circle'
          //           size={25}
          //           color={Colors[colorScheme ?? 'light'].text}
          //           style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          //         />
          //       )}
          //     </Pressable>
          //   </Link>
          // ),
        }}
      />
      <Tabs.Screen
        name="subjects"
        options={{
          title: 'Subjects',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarSimpleLineIcon name="notebook" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="flashcard"
        options={{
          title: 'Flashcard',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarMaterialCommunityIcon
              name="card-multiple-outline"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="quiz"
        options={{
          title: 'Quiz',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarMaterialCommunityIcon
              name="progress-question"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarAntDesignIcon name="user" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
