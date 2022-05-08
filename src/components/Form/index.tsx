import React, { useState } from 'react';
import { 
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { ArrowLeft } from 'phosphor-react-native';
import { captureScreen } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';

import { styles } from './styles';
import { theme } from '../../theme';
import { FeedbackTypes } from '../Widget';
import { ScreenshotButtom } from '../ScreenshotButtom';
import { Buttom } from '../Buttom';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { api } from '../../libs/api';

interface Props {
  feedbackType: FeedbackTypes;
  onFeedbackCanceled: ()=>void;
  onFeedbackSend: ()=>void;
}

export function Form({feedbackType, onFeedbackCanceled, onFeedbackSend}:Props) {
  const [screenshot,setScreenshot] = useState<string|null>(null);
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const [comment,setComment] = useState('');
  const feedbackTypeInfo = feedbackTypes[feedbackType];

  function handleScreenshot() {
    captureScreen({
      format:'jpg',
      quality: 0.8,
    })
    .then(uri=>setScreenshot(uri))
    .catch(error=>console.log(error));
  }

  function handleScreenshotRemove() {
    setScreenshot(null);
  }

  async function handleSendFeedback(){
    if(isSendingFeedback) return;
    
    setIsSendingFeedback(true);

    const sceenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot,{
      encoding: 'base64',
    });

    try {
      await api.post('feedbacks',{
        type: feedbackType,
        comment,
        screenshot: `data:image/png;base64, ${sceenshotBase64}`,
      });
      onFeedbackSend();
    } catch (error) {
      console.log(error);
      setIsSendingFeedback(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={onFeedbackCanceled}
        >
          <ArrowLeft 
            size={24}
            weight='bold'
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image
            source={feedbackTypeInfo.image}
            style={styles.image}
          />
          <Text style={styles.titleText}>
            {feedbackTypeInfo.title}
          </Text>
        </View>
      </View>
      <TextInput
        multiline
        style={styles.input}
        placeholder="Algo de errado não esta certo..."
        placeholderTextColor={theme.colors.text_secondary}
        onChangeText={setComment}
      />
      <View style={styles.footer}>
        <ScreenshotButtom 
          onTakeShot={handleScreenshot}
          onRemoveShot={handleScreenshotRemove}
          screenshot={screenshot}
        />
        <Buttom 
          isLoading={isSendingFeedback}
          onPress={handleSendFeedback}
        />
      </View>
    </View>
  );
}