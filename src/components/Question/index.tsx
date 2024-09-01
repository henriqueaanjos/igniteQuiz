import { View, Text, Dimensions } from 'react-native';

import { Option } from '../Option';
import { styles } from './styles';
import Animated, { Keyframe, runOnJS } from 'react-native-reanimated';

type QuestionProps = {
  title: string;
  alternatives: string[];
}

type Props = {
  question: QuestionProps;
  alternativeSelected?: number | null;
  setAlternativeSelected?: (value: number) => void;
  onUnmount: () => void;
}
const SCREEN_WIDTH = Dimensions.get('window').width;
export function Question({ question, alternativeSelected, setAlternativeSelected, onUnmount }: Props) {
  const animatedEnteringKeyFrame = new Keyframe({
    from: {
      opacity: 0,
      transform: [{ 
        translateX: SCREEN_WIDTH},
        {rotate: '90deg'
      }]
    },
    to: {
      opacity: 1,
      transform: [{ 
        translateX: 0},{
        rotate: '0deg'
      }]
    },
  });

  const animatedExitingKeyFrame = new Keyframe({
    from: {
      opacity: 1,
      transform: [{ 
        translateX: 0},
        {rotate: '0deg'
      }]
    },
    to: {
      opacity: 0,
      transform: [{ 
        translateX: SCREEN_WIDTH * (-1)},{
        rotate: '-90deg'
      }]
    },
  });
  return (
    <Animated.View 
      style={styles.container}
      entering={animatedEnteringKeyFrame.duration(400)}
      exiting={animatedExitingKeyFrame.duration(400).withCallback((finished) => {
        'worklet';
        if(finished){
          runOnJS(onUnmount)()
        }
      })}
    >
      <Text style={styles.title}>
        {question.title}
      </Text>

      {
        question.alternatives.map((alternative, index) => (
          <Option
            key={index}
            title={alternative}
            checked={alternativeSelected === index}
            onPress={() => setAlternativeSelected && setAlternativeSelected(index)}
          />
        ))
      }
    </Animated.View>
  );
}