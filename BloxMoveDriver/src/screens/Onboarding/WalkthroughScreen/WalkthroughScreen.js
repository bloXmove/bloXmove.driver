import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import PropTypes from 'prop-types';
import AppIntroSlider from 'react-native-app-intro-slider';
import dynamicStyles from './styles';
import deviceStorage from '../../utils/AuthDeviceStorage';
import svgs from '../../../../assets/svg/svgs';

const WalkthroughScreen = props => {
  const {navigation, route} = props;
  const appConfig = route.params.appConfig;
  const appStyles = route.params.appStyles;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);

  const slides = [
    {
      key: 0,
      title: (
        <View>
          <Text style={styles.title}>
            Earn <Text style={styles.mainText}>easy money</Text> with BloXmove
          </Text>
        </View>
      ),
      image: <svgs.Pay1 style={styles.imgage} />,
    },
    {
      key: 1,
      title: (
        <View>
          <Text style={styles.title}>
            Enjoy the <Text style={styles.mainText}>fastest payout</Text> system
          </Text>
        </View>
      ),
      image: <svgs.Pay2 style={styles.imgage} />,
    },
    {
      key: 2,
      title: (
        <View>
          <Text style={styles.title}>
            <Text style={styles.mainText}>Relax</Text> while we do all the
            stress
          </Text>
        </View>
      ),
      image: <svgs.Pay3 style={styles.imgage} />,
    },
  ];
  const _onDone = async () => {
    await deviceStorage.setShouldShowOnboardingFlow('true');
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'LoginStack',
          params: {appStyles: appStyles, appConfig: appConfig},
        },
      ],
    });
  };

  const _renderItem = ({item, dimensions}) => (
    <View style={styles.innerContainer}>
      {item.image}
      {item.title}
    </View>
  );

  const _renderNextButton = () => {
    return (
      <TouchableOpacity style={styles.btnContainer} onPress={_onDone}>
        <Text style={styles.btnText}>Get Started</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <AppIntroSlider
        data={slides}
        slides={slides}
        renderItem={_renderItem}
        //Handler for the done On last slide
        showSkipButton={false}
        showDoneButton={true}
        showNextButton={true}
        onSkip={_onDone}
        onDone={_onDone}
        bottomButton={true}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activatedDot}
        renderNextButton={_renderNextButton}
        renderDoneButton={_renderNextButton}
      />
    </View>
  );
};

WalkthroughScreen.propTypes = {
  appStyles: PropTypes.object,
  appConfig: PropTypes.object,
};

export default WalkthroughScreen;
