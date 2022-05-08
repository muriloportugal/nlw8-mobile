import React, {useRef,useState} from 'react';
import { TouchableOpacity } from 'react-native';
import { ChatTeardropDots } from 'phosphor-react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import { theme } from '../../theme';
import { styles } from './styles';
import { Options } from '../Options';
import { Form } from '../Form';
import { Success } from '../Success';

import { feedbackTypes } from '../../utils/feedbackTypes';

export type FeedbackTypes = keyof typeof feedbackTypes;
function Widget() {
  const [feedbackType,setFeedbackType] = useState<FeedbackTypes|null>(null);
  const [feedbackSend,setFeedbackSend] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);

  function handleOpen() {
    bottomSheetRef.current?.expand(); 
  }
  function handleResetFeedback(){
    setFeedbackType(null);
    setFeedbackSend(false);
  }
  function handleFeedbackSend() {
    setFeedbackSend(true);
  }
  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={handleOpen}
      >
        <ChatTeardropDots 
          size={24}
          weight="bold"
          color={theme.colors.text_on_brand_color}
        />
      </TouchableOpacity>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1,280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        {
          feedbackSend 
          ?
          <Success
            onSendAnotherFeedback={handleResetFeedback}
          />
          :
          <>
            {
              feedbackType
              ?
              <Form
                feedbackType={feedbackType}
                onFeedbackCanceled={handleResetFeedback}
                onFeedbackSend={handleFeedbackSend}
              />
              :
              <Options
                onFeedbackTypeChanged={setFeedbackType}
              />
            }
          </>
        }
      </BottomSheet>
    </>
  );
}

export default gestureHandlerRootHOC(Widget);