import React, { useEffect, useState } from 'react';
import { Text, View } from '../../../components/Themed';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { QuizType } from '../../../constants/Data';
import { StyleSheet } from 'react-native';
import { SIZES } from '../../../constants/Theme';
import Colors from '../../../constants/Colors';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { QuizViewItem } from '../../../components/QuizViewItem';
import { useIsFocused } from '@react-navigation/native';
import { getQuizzesBySubjectId } from '../../../services/quiz';
import { MainScreenLoader } from '../../../components/MainScreenLoader';

export default function SubjectQuizScreen() {
  const { subject_id, subject_title } = useLocalSearchParams<{
    subject_id: string;
    subject_title: string;
  }>();
  const [quizSubject, setQuizSubjects] = useState<QuizType[]>();
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  useEffect(() => {
    (async () => {
      console.log('subject_id in subjectquizscreen : ', subject_id);
      const quizzes = await getQuizzesBySubjectId(Number(subject_id));
      console.log('SubjectQuizScreen : quzizes : ', quizzes);
      setQuizSubjects(quizzes.quizzes);
      setTimeout(() => setLoading(false), 1000);
    })();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.quizTitleContainer}>
        <Text style={styles.quizTitle}>{subject_title}</Text>
      </View>
      <View style={styles.quizzesContainer}>
        <Text style={styles.quizzesTitle}>Quiz</Text>
        {loading ? (
          <MainScreenLoader />
        ) : (
          <ScrollView style={{ flex: 1 }}>
            {quizSubject &&
              quizSubject.map((quiz) => {
                return (
                  <TouchableOpacity
                    key={quiz.quiz_id}
                    onPress={() => {
                      console.log('on click : quiz :', quiz);
                      router.push({
                        pathname: '/(tabs)/quiz/question',
                        params: {
                          quiz_id: quiz.quiz_id ?? '',
                          quiz_title: subject_title,
                          // questions: JSON.stringify(quiz.questions),
                          quiz_score: quiz.quiz_score,
                        },
                      });
                    }}
                  >
                    <QuizViewItem key={quiz.quiz_id} item={quiz}></QuizViewItem>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        )}
      </View>
      {/* <View style={styles.importQuizContainer}>
        <TouchableOpacity
          style={[styles.button, themeSecondaryBackgroundStyle]}
        >
          <MaterialCommunityIcons
            name="card-multiple-outline"
            style={styles.buttonIcon}
            color={Colors.light.primary}
          />
          <Text style={styles.buttonLabel}>Generate from Flashcard</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.base * 2,
    paddingBottom: SIZES.base * 2,
  },
  quizTitleContainer: {
    flex: 0.1,
  },
  quizTitle: {
    fontSize: SIZES.h2,
  },
  quizzesContainer: {
    flex: 0.8,
  },
  quizzesTitle: {
    marginVertical: SIZES.base,
  },

  importQuizContainer: {
    flex: 0.2,
  },
  button: {
    height: SIZES.height / 8,
    borderColor: Colors.light.primary,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    marginTop: SIZES.marginTop / 2,
    marginBottom: SIZES.marginTop / 2,
    flexDirection: 'row',
  },
  buttonIcon: {
    fontSize: 40,
    alignSelf: 'center',
    textAlignVertical: 'center',
    marginLeft: SIZES.padding,
  },
  buttonLabel: {
    fontSize: SIZES.h3,
    color: Colors.light.primary,
    alignSelf: 'center',
    textAlignVertical: 'center',
    justifyContent: 'flex-start',
    marginLeft: SIZES.padding,
  },
});
