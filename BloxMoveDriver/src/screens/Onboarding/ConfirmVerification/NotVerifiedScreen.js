import React from 'react';
import {View, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native';
import {Text} from '@components';
import dynamicStyles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS} from '@components';
import Svgs from '@app/assets/svg/svgs';

const NotVerifiedScreen = props => {
  const {navigation, route} = props;
  const styles = dynamicStyles();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContainer}>
        <View>
          <TouchableOpacity
            style={styles.backIcon}
            onPress={() => {
              navigation.goBack();
            }}>
            <Svgs.Back />
          </TouchableOpacity>
          <View style={styles.topContainer}>
            <View style={styles.iconContainer}>
              <Icon name={'close'} size={40} color={COLORS.white} />
            </View>
            <Text textStyle="body18Medium">Verification not complete</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default NotVerifiedScreen;
