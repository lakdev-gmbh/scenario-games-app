import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Image,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import {globalStyles} from '../../../../assets/styles/global';
import themeColors from '../../../../assets/styles/theme.colors';
import themeDimensions from '../../../../assets/styles/theme.dimensions';
import {TextButton} from '../../../components/global/Button';
import {H1} from '../../../components/global/Text';
import {SpeechBubble} from '../../../components/scenario/SpeechBubble';
import {TypingText} from '../../../components/scenario/TypingText';

const {height: phoneHeight} = Dimensions.get('window');
const owlHeight = phoneHeight >= 700 ? 145 : 100;

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
    // marginBottom: themeDimensions.MARGIN_VERTICAL_MEDIUM,
    textAlign: 'center',
  },
  speechBubble: {
    paddingVertical: themeDimensions.MARGIN_VERTICAL_MEDIUM,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: themeDimensions.MARGIN_VERTICAL_BIG,
  },
  return: {
    height: 30,
    width: 30,
  },
  owl: {
    width: '100%',
    height: owlHeight,
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
  onGoBack,
}: {
  onContinue: () => void;
  onGoBack: () => void;
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
        <View style={[styles.headerContainer]}>
          <TouchableOpacity
            style={{
              opacity: 0,
            }}>
            <Image
              style={styles.return}
              source={require('../../../../assets/images/actions/action_return.png')}
            />
          </TouchableOpacity>
          <H1 bold style={styles.titleText}>
            {title}
          </H1>
          <TouchableOpacity onPress={onGoBack}>
            <Image
              style={styles.return}
              source={require('../../../../assets/images/actions/action_return.png')}
            />
          </TouchableOpacity>
        </View>

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
