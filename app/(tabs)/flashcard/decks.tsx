import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Text, View } from '../../../components/Themed';
import { useLocalSearchParams, router } from 'expo-router';
import { Flashcard } from '../../../constants/Data';
import { SIZES } from '../../../constants/Theme';
import { ThemeUtils } from '../../../utils/ThemeUtils';
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Colors from '../../../constants/Colors';
import { FlashCardItem } from '../../../components/FlashCardItem';
import { getFlashcardBySubjectId } from '../../../services/flashcards';
import { NoteLoader } from '../../../components/NoteLoader';

const width = Dimensions.get('window').width - SIZES.padding * 2;
export default function DecksScreen() {
  const { subject_id, subject_category, subject_title } = useLocalSearchParams<{
    subject_id: string;
    subject_category: string;
    subject_title: string;
  }>();
  const params = useLocalSearchParams();
  const [flashcardItems, setFlashcardItems] = useState<Flashcard[]>();
  const [unfilteredFlashcardItems, setUnfilteredFlashcardItems] =
    useState<Flashcard[]>();
  const [loading, setLoading] = useState(true);
  const { themeTextStyle } = ThemeUtils();
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    (async () => {
      console.log('params in decksscreen : ', params);
      const result = await getFlashcardBySubjectId(Number(subject_id));
      setFlashcardItems(result.flashcards);
      setUnfilteredFlashcardItems(result.flashcards);
      setTimeout(() => setLoading(false), 1000);
    })();
  }, []);

  const handleSearchInput = (text: string) => {
    setSearchValue(text);
    // Show list view on text

    if (text) {
      const filteredList = unfilteredFlashcardItems?.filter(
        (flashcard: Flashcard) =>
          flashcard.flashcard_title.toLowerCase().includes(text.toLowerCase())
      );
      setFlashcardItems(filteredList);
    } else {
      setFlashcardItems(unfilteredFlashcardItems);
    }
  };

  return (
    <View style={[styles.container]}>
      <Text style={[styles.subjectTitle, themeTextStyle]}>{subject_title}</Text>
      <Text weight="semibold" style={styles.categoryTitle}>
        {subject_category}
      </Text>
      <TextInput
        style={styles.searchInput}
        value={searchValue}
        placeholder="Search"
        onChangeText={(text) => handleSearchInput(text)}
      />
      <View style={styles.cardViewContainer}>
        {loading ? (
          <NoteLoader width={width} />
        ) : (
          <FlatList
            numColumns={2}
            columnWrapperStyle={{
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
            data={flashcardItems}
            renderItem={({ item }: { item: Flashcard }) => (
              <TouchableOpacity
                onPress={() => {
                  router.push({
                    pathname: '/(tabs)/flashcard/card',
                    params: {
                      subject_id: subject_id,
                      subject_category: subject_category,
                      subject_title: subject_title,
                      flashcard_title: item.flashcard_title,
                      flashcard_id: item.flashcard_id?.toString() ?? '',
                    },
                  });
                }}
              >
                <FlashCardItem item={item} />
              </TouchableOpacity>
            )}
          />
        )}
      </View>
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
  subjectTitle: {
    fontSize: SIZES.h2,
    marginBottom: SIZES.base,
  },
  categoryTitle: {
    fontSize: SIZES.h5,
  },
  searchInput: {
    marginTop: SIZES.base * 4,
    borderWidth: 1,
    borderRadius: SIZES.base,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.base / 2,
    borderColor: Colors.default.slate500,
  },
  cardViewContainer: {
    flex: 1,
    paddingHorizontal: SIZES.base,
    paddingTop: SIZES.base,
  },
});
