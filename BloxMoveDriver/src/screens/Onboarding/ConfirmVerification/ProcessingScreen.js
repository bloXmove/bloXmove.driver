import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Linking,
} from 'react-native';
import {Button, Text} from '@components';
import dynamicStyles from './styles';
import Svgs from '../../../../assets/svg/svgs';

const ProcessingScreen = props => {
  const {navigation, route} = props;
  const backFlag = route.params?.backFlag;
  const styles = dynamicStyles();

  const editAction = () => {
    backFlag !== true
      ? navigation.goBack()
      : navigation.reset({
          index: 0,
          routes: [
            {
              name: 'LoginStack',
            },
          ],
        });
    // navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => editAction()}>
              <Svgs.Back />
            </TouchableOpacity>
            <Text textStyle="body18Medium" style={styles.btnLeft}>
              Verification in progress
            </Text>
          </View>
          <Text style={styles.description} textStyle="body14Regular">
            To complete your onboarding verification, we kindly request that you
            fill the form below with the following listed documents in either
            JPEG, PNG, or PDF format:{'\n'}
            {'\n'}
            <Text style={styles.description} textStyle="body14Regular">
              1) Valid driver's license{'\n'}
              2) Profile Picture{'\n'}
              3) Vehicle proof of ownership certificate{'\n'}
              4) Front photo of your car showing your License plate{'\n'}
              5) Interior photo of your car from the back door opened
            </Text>
          </Text>
          <TouchableOpacity
            onPress={async () =>
              await Linking.openURL('https://forms.gle/2EyDVCsRWR3N94c4A')
            }>
            <Text style={styles.colorText} textStyle="body14Regular">
              Verification FORM{'\n'}
              {'\n'}
            </Text>
          </TouchableOpacity>
          <Text style={styles.description} textStyle="body14Regular">
            If you have any questions or need further assistance, please don't
            hesitate to reach out to our support team
          </Text>
          <View style={styles.iconsContainer}>
            <Svgs.Whatsapp
              onPress={async () =>
                await Linking.openURL('whatsapp://send?phone=+2349038328987')
              }
            />
            <Svgs.Email
              style={styles.iconContact}
              onPress={async () =>
                await Linking.openURL('mailto:vin@bloxmove.ng')
              }
            />
            <Svgs.Call
              style={styles.iconContact}
              onPress={async () => await Linking.openURL('tel:+2349038328987')}
            />
          </View>
        </View>
        <Button
          containerStyle={styles.button}
          type="primary"
          title="Proceed"
          disabled={true}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
export default ProcessingScreen;
