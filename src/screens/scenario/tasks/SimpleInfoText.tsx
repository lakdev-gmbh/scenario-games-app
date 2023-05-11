import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import {globalStyles} from '../../../../assets/styles/global';
import themeColors from '../../../../assets/styles/theme.colors';
import themeDimensions from '../../../../assets/styles/theme.dimensions';
import {TextButton} from '../../../components/global/Button';
import {H1} from '../../../components/global/Text';
import {SpeechBubble} from '../../../components/scenario/SpeechBubble';
import {TypingText} from '../../../components/scenario/TypingText';
import {RootStackParamList} from '../../../navigation/types';

const styles = StyleSheet.create({
  fullSize: {
    flex: 1,
  },
  container: {
    marginTop: themeDimensions.MARGIN_VERTICAL_MEDIUM,
    flex: 1,
  },
  titleText: {
    color: themeColors.TEXT_ON_PRIMARY,
    marginBottom: themeDimensions.MARGIN_VERTICAL_MEDIUM,
    textAlign: 'center',
  },
  speechBubble: {
    paddingVertical: themeDimensions.MARGIN_VERTICAL_MEDIUM,
  },
  owl: {
    width: '100%',
    height: 145,
    resizeMode: 'contain',
    marginTop: themeDimensions.MARGIN_VERTICAL_MEDIUM,
    marginBottom: themeDimensions.MARGIN_VERTICAL_BIG,
  },
  nextButton: {
    backgroundColor: themeColors.BACKGROUND_HIGHLIGHTED,
    marginBottom: themeDimensions.MARGIN_VERTICAL_BIG,
  },
  nextButtonText: {
    color: themeColors.TEXT,
  },
});

export const ScenarioTaskEasyText = ({
  title,
  body,
  onContinue,
}: {
  onContinue: () => void;
  title: string;
  body: string;
}) => {
  const {t} = useTranslation();
  const [finished, setFinished] = useState(false);

  return (
    <LinearGradient
      style={styles.fullSize}
      colors={[
        themeColors.BACKGROUND_GRADIENT_ONE,
        themeColors.BACKGROUND_GRADIENT_TWO,
        themeColors.BACKGROUND_GRADIENT_THREE,
      ]}
      locations={[0.3, 0.5, 0.65]}>
      <SafeAreaView style={[globalStyles.container, styles.container]}>
        <H1 bold style={styles.titleText}>
          {title}
        </H1>

        <SpeechBubble full style={styles.speechBubble}>
          <TypingText
            animationDuration={body.length >= 200 ? 20 : 40}
            onFinish={() => setFinished(true)}>
            {body}
          </TypingText>
        </SpeechBubble>

        <Image
          style={styles.owl}
          source={require('../../../../assets/images/owls/owl_okay.png')}
        />

        <View style={styles.fullSize} />

        {finished && (
          <TextButton
            style={styles.nextButton}
            onPress={onContinue}
            textStyle={styles.nextButtonText}>
            {t('button_continue')}
          </TextButton>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};
