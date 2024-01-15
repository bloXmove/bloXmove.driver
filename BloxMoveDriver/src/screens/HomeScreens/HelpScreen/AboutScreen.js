import React, {useEffect, useState, useLayoutEffect} from 'react';
import {View, TouchableOpacity, StyleSheet, SafeAreaView} from 'react-native';
import PropTypes from 'prop-types';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/AntDesign';
import {customerServiveAPI} from '../utils';
import {COLORS, TNActivityIndicator, Text} from '@components';
import {useSelector} from 'react-redux';

const AboutScreen = props => {
  const {navigation} = props;

  const [isLoading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const apiToken = useSelector(state => state.auth.token);

  useEffect(() => {
    getAboutUs();
  }, []);
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

  const getAboutUs = async () => {
    setLoading(true);
    customerServiveAPI
      .getAboutUs(apiToken)
      .then(response => {
        setTitle(response.data.data.title);
        setContent(response.data.data.content);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.log('Error', error.response);
      });
  };

  if (isLoading) {
    return <TNActivityIndicator />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Icon name="arrowleft" size={24} color={COLORS.black} />
          </TouchableOpacity>
          <Text textStyle="body18Semibold">About us</Text>
        </View>
        <View style={styles.bottomContainer}>
          <View style={[styles.topContainer, styles.boxContainer]}>
            <Text textStyle="body18Semibold">
              {title === '' ? 'About us' : title}
            </Text>
            <Text textStyle="body18Regular">{content}</Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
AboutScreen.propTypes = {
  appConfig: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  content: {
    padding: 32,
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

export default AboutScreen;
