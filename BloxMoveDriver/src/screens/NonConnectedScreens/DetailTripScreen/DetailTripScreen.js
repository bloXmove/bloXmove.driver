/* eslint-disable prettier/prettier */
import React, {useLayoutEffect, useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  SafeAreaView,
  useColorScheme,
} from 'react-native';
import PropTypes from 'prop-types';
import dynamicStyles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Dash} from '../../../components';

import Icon from 'react-native-vector-icons/Ionicons';
import {FlatList} from 'react-native-gesture-handler';

const HomeScreen = props => {
  const { navigation, route } = props;
  const appStyles = route.params.appStyles;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);
  const [duration, setDuration] = useState(60);
  const [selectedItem, setItem] = useState([]);
  const [selectedId, setSelectedID] = useState(1);

  let currentTheme = appStyles.navThemeConstants[colorScheme];

  useEffect(() => {}, [selectedId]);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon
            name="arrow-back-outline"
            size={30}
            color={currentTheme.fontColor}
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  const data = [
    {
      key: 1,
      title: 'Naria',
      price: 1000,
      duration: 60,
      img: appStyles.iconSet.taxiIcon,
    },
    {
      key: 2,
      title: 'Naria',
      price: 800,
      duration: 80,
      img: appStyles.iconSet.taxiIcon,
    },
  ];
  const changeItem = item => {
    setItem(item);
    setSelectedID(item.key);
    setDuration(item.duration);
  };
  const renderItem = ({item, index, separators}) => (
    <TouchableHighlight
      key={item.key}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        opacity: selectedId === item.key ? 1 : 0.6,
      }}
      onPress={() => changeItem(item)}
      onShowUnderlay={separators.highlight}
      onHideUnderlay={separators.unhighlight}>
      <View style={[styles.listContainer, {
        borderTopWidth: index != 0 ? 0 : 1,
        opacity: selectedId === item.key ? 1 : 0.6,
      }]}>
        <Text
          style={styles.text}
        >{item.price} {item.title} = {item.price * 0.05} BLXM</Text>
        <Image
          style={styles.makerImg}
          source={item.img}
          size={200}
          color="white"
         />
      </View>
    </TouchableHighlight>
  );
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Image
          style={styles.headerImg}
          source={appStyles.iconSet.city}
          size={200}
          color="white"
        />
        <View style={[styles.boxContainer, styles.topBox]}>
          <View style={styles.flexContainer}>
            <View style={styles.leftContainer}>
              <Icon name="radio-button-on-outline" size={25} color={appStyles.colorSet[colorScheme].mainColor} />
              <Dash appStyles={appStyles} />
              <Icon name="location-outline" size={25} color={'red'} />
            </View>
            <View style={styles.rightContainer}>
              <Text style={styles.depText}>Computer Villiage, Lagos, Nigeria</Text>
              <View style={styles.divider} />
              <Text style={styles.depText}>Tafawa Balewa Square, Lagos, Nigeria</Text>
            </View>
          </View>
        </View>
        <View style={styles.ph10}>
          <View style={styles.boxContainer}>
            <View style={styles.boxBody}>
              <View style={styles.flexContainer}>
                <Text style={styles.text}>Earliest pick up time : </Text>
                <Text style={styles.text}>9 : 30 </Text>
              </View>
              <View style={styles.flexContainer}>
                <Text style={styles.text}>Estimated arrival time : </Text>
                <Text style={styles.text}>10 : 30 </Text>
              </View>
              <View style={styles.flexContainer}>
                <Text style={styles.text}>Duration : </Text>
                <Text style={styles.text}>{duration} min </Text>
              </View>
            </View>
            <FlatList
              style={styles.mt10}
              keyboardShouldPersistTaps={'handled'}
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item.key}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
HomeScreen.propTypes = {
  appStyles: PropTypes.object,
  appConfig: PropTypes.object,
};

export default HomeScreen;
