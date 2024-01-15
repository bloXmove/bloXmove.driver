import React, {useState} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Linking,
} from 'react-native';
import {Button, Text} from '@components';
import dynamicStyles from './styles';
import svgs from '../../../../assets/svg/svgs';
import {getVerificationStatus} from '../../utils/api/actions';
import Svgs from '../../../../assets/svg/svgs';
import {displayErrors} from '@app/src/helpers';

const ConfirmVerification = props => {
  const {navigation, route} = props;
  const accountId = route.params.accountId;
  const data = route.params.data;
  const styles = dynamicStyles();
  const [loading, setLoading] = useState(false);

  const confirmAction = async () => {
    setLoading(true);
    getVerificationStatus(accountId)
      .then(response => {
        const result = response.data.data;
        if (result.status === true) {
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'Processing',
                params: {
                  verified: true,
                  data: data,
                },
              },
            ],
          });
        } else {
          navigation.navigate('Processing', {
            verified: false,
            data: data,
          });
        }
        setLoading(false);
      })
      .catch(error => {
        displayErrors(error);
        setLoading(false);
      });
    return;
  };

  const editAction = () => {
    navigation.goBack();
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
              <svgs.Back />
            </TouchableOpacity>
            <Text textStyle="body18Medium" style={styles.headerTitle}>
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
          containerStyle={loading ? styles.buttonLoadingMain : styles.button}
          type="primary"
          onPress={confirmAction}
          title="Proceed"
          disabled={loading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
export default ConfirmVerification;
