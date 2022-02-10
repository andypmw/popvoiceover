import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Button, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

export default function EditScreenInfo({ path }: { path: string }) {
  const [sourceLanguageList, setSourceLanguageList] = useState([]);
  const [targetLanguageList, setTargetLanguageList] = useState([]);

  const [sourceLanguageCode, setSourceLanguageCode] = useState();
  const [sourceText, setSourceText] = useState('');

  const [targetLanguageCode, setTargetLanguageCode] = useState();
  const [targetText, setTargetText] = useState('');

  const [translateState, setTranslateState] = useState('idle');

  const defaultSourceLanguageCode = 'id';
  const defaultTargetLanguageCode = 'en-US';

  useEffect(() => {
    axios
      .get('http://10.8.0.12:4000/translates/source-languages')
      .then(response => {
        setSourceLanguageList(response.data);
      });

    axios
      .get('http://10.8.0.12:4000/speeches/speech-languages')
      .then(response => {
        setTargetLanguageList(response.data);
      });
  }, []);

  function handleTranslate() {
    setTranslateState('processing');

    const parameter = {
      Text: sourceText,
      SourceLanguageCode: sourceLanguageCode,
      TargetLanguageCode: targetLanguageCode
    };

    axios
      .post('http://10.8.0.12:4000/translates/', parameter)
      .then(response => {
        setTranslateState('idle');
        setTargetText(response.data.TranslatedText);
      })
      .catch(error => {
        setTranslateState('idle');
        console.log(error);
      });
  }

  return (
    <View>
      <View style={styles.translatorContainer}>
        <Text style={styles.langLabel}>SOURCE LANGUAGE</Text>
        <Picker
          selectedValue={sourceLanguageCode}
          onValueChange={(itemValue, itemIndex) => setSourceLanguageCode(itemValue)}
        >
          {sourceLanguageList.map(lang => <Picker.Item key={lang.code} label={lang.name} value={lang.code} />)}
        </Picker>
        <TextInput
          multiline={true}
          numberOfLines={4}
          value={sourceText}
          style={styles.textInput}
          onChangeText={setSourceText}
        />
        <Button title={translateState === 'idle'? 'Translate' : 'Translating...'} onPress={handleTranslate} />

        <Text style={styles.langLabel}>TARGET LANGUAGE</Text>
        <Picker
          selectedValue={targetLanguageCode}
          onValueChange={(itemValue, itemIndex) => setTargetLanguageCode(itemValue)}
        >
          {targetLanguageList.map(lang => <Picker.Item key={lang.code} label={lang.name} value={lang.code} />)}
        </Picker>
        <TextInput
          multiline={true}
          numberOfLines={4}
          value={targetText}
          style={styles.textInput}
          onChangeText={setTargetText}
        />
      </View>

      <View style={styles.helpContainer}>
        <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
          <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
            Tap here if your app doesn't automatically update after making changes
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet'
  );
}

const styles = StyleSheet.create({
  translatorContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 10,
    backgroundColor: '#E2E8F0',
    padding: 10,
    borderRadius: 15
  },
  helpContainer: {
    marginHorizontal: 20,
  },
  langLabel: {
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 50,
  },
  textInput: {
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    marginBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#ffffff',
  },
  
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
});
