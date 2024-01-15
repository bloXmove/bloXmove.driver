import React, {useLayoutEffect} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/AntDesign';
import {Button, COLORS, Text} from '@components';

const DetailHelpScreen = props => {
  const {navigation, route} = props;
  const appConfig = route.params.appConfig;
  const item = route.params.item;

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={30} />
        </TouchableOpacity>
      ),
      headerRight: '',
    });
  }, []);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrowleft" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text textStyle="body18Semibold">FAQ</Text>
      </View>
      <View style={styles.content}>
        <View>
          <Text textStyle="body18Semibold">
            {item
              ? item.title
              : 'Lorem Ipsum is simply dummy text of the printing  Ipsum has been the industry'}
          </Text>
          <Text textStyle="body18Regular">
            {item
              ? item.content
              : 'Lorem Ipsum is simply dummy text of the printing  Ipsum has been the industry'}
          </Text>
        </View>

        <Button
          title="Contact us"
          type="outlined"
          onPress={() => {
            props.navigation.navigate('Contact', {
              appConfig: appConfig,
            });
          }}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

DetailHelpScreen.propTypes = {
  appConfig: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    padding: 32,
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',

    marginVertical: 16,
  },
  backButton: {
    marginRight: 32,
  },
});

export default DetailHelpScreen;
