import Animated, { Easing, useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';
import { styles } from './styles';
import { BlurMask, Canvas, Rect } from '@shopify/react-native-skia';
import { useWindowDimensions } from 'react-native';
import { THEME } from '../../styles/theme';
import { useEffect } from 'react';

const COLOR_STATUS = ['transparent', THEME.COLORS.BRAND_LIGHT, THEME.COLORS.DANGER_LIGHT];

type props = {
    status: number;
}

export function OverlayFeedback({ status }: props){
    const opacity = useSharedValue(0);

    const animatedContainerStyle = useAnimatedStyle(() => {
        return{
            opacity: opacity.value,
        }
    });
    const {width, height} = useWindowDimensions();

    useEffect(() => {
        opacity.value = withSequence(
            withTiming(1, {duration: 400, easing: Easing.bounce}),
            withTiming(0)
        );
    }, [status]);
    return(
        <Animated.View
            style={[{width, height, position: 'absolute'}, animatedContainerStyle]}
        >
            <Canvas style={{flex:1 }}>
                <Rect
                    x={0}
                    y={0}
                    width={width}
                    height={height}
                    color={COLOR_STATUS[status]}
                >
                    <BlurMask blur={1} style="inner"/>
                </Rect>
            </Canvas>
        </Animated.View>
    );
}