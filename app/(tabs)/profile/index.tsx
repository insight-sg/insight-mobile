import {
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Modal,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { imagesDataURL } from '../../../constants/Data';
import { ThemeUtils } from '../../../utils/ThemeUtils';
import EditScreenInfo from '../../../components/EditScreenInfo';
import { StyleSheet } from 'react-native';
import { SIZES } from '../../../constants/Theme';
import Colors from '../../../constants/Colors';
import { Text, View } from '../../../components/Themed';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { getNotesByUserId } from '../../../services/notes';
import { getFlashcardsByUserId } from '../../../services/flashcards';
import { router } from 'expo-router';
import { Button } from 'react-native-paper';
import { getQuizzesByUserId } from '../../../services/quiz';

export default function ProfileScreen() {

  const dispatch = useDispatch(); 

  const {
    themeTextStyle,
    themeBackgroundStyle,
    themeSecondaryBackgroundStyle,
  } = ThemeUtils();

  const [numberOfQuiz, setNumberOfQuiz] = useState(0);
  const [numberOfSubject, setNumberOfSubject] = useState(0);
  const [numberOfFlashcard, setNumberOfFlashcard] = useState(0);

  const { userId, username } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    (async () => {
      const quizResult = await getQuizzesByUserId(Number(userId));
      const notesResult = await getNotesByUserId(Number(userId));
      const flashcardResult = await getFlashcardsByUserId(Number(userId));
      setNumberOfQuiz(Object.keys(quizResult.subjects).length);
      setNumberOfSubject(Object.keys(notesResult.subjects).length);
      setNumberOfFlashcard(Object.keys(flashcardResult.subjects).length);
    })();
  });

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    router.push({pathname: '/(access)/login'});
  };


  return (
    <View style={[styles.container]}>
      <Text style={[styles.title, themeTextStyle]}>
          Hello,
        </Text>
        <Text style={styles.titleColor}>{username.toUpperCase()}</Text>
        <View style={styles.boxContainer}>
          <View style={styles.box}>
            <Text style={styles.boxNumber}>{numberOfQuiz}</Text>
            <Text style={styles.boxTitle}>Quizzes</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.boxNumber}>{numberOfSubject}</Text>
            <Text style={styles.boxTitle}>Subjects</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.boxNumber}>{numberOfFlashcard}</Text>
            <Text style={styles.boxTitle}>Flash</Text>
            <Text style={styles.boxTitle}>cards</Text>
          </View>
        </View>
        <Button style={[styles.editButton]} mode="contained" onPress={() => {router.push({pathname: '/(tabs)/profile/edit'})}}>
          <Text style={[styles.editButtonText]}>Edit Profile</Text>
        </Button>
        <Button style={[styles.logoutButton]} mode="contained" onPress={() => {handleLogout();}}>
          <Text style={[styles.logoutButtonText]}>Sign Out</Text>
        </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
  },
  titleHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    fontSize: SIZES.h2,
  },
  titleColor: {
    fontSize: SIZES.h1,
    color: Colors.light.primary,
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  box: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginRight: 16,
  },
  boxTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  boxNumber: {
    fontSize: 24,
    marginTop: 8,
  },
  editButton: {
    width: '100%',
    marginVertical: 10,
    backgroundColor: Colors.default.primary
  },
  editButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  logoutButton: {
    width: '100%',
    marginVertical: 10,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#000000',
  },
  logoutButtonText: {
    color: Colors.default.primary,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});