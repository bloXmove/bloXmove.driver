import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  useColorScheme,
  Linking,
} from 'react-native';
import dynamicStyles from './styles';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Progress from 'react-native-progress';
import {connect} from 'react-redux';

import deviceStorage from '../../screens/utils/AuthDeviceStorage';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const codeInputCellCount = 6;
const ChoosePayment = props => {
  const {appStyles, item, type, navigation, seat, passNameList} = props;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);

  const [approveModalVisible, setApproveModalVisible] = useState(false);
  const [cardModalVisible, setCardModalVisible] = useState(false);
  const [newCard, setNewCard] = useState(false);
  const [pinModal, setPinModal] = useState(false);
  const [pay, setPay] = useState(false);
  const [accountNumber, setNumber] = useState('');

  const getAccountNumber = async () => {
    let vNumber = await deviceStorage.getAccountNumber();
    setNumber(vNumber);
  };
  useEffect(() => {
    getAccountNumber();
  }, []);

  const intervalId = useRef(null);
  const cancelOrder = () => {
    setPay(false);
    clearInterval(intervalId.current);
    setApproveModalVisible(false);
  };
  const payOrder = () => {
    setPay(true);
    setCardModalVisible(false);
    setNewCard(false);
  };
  const payToken = async () => {
    if (props.user) {
      try {
        await props.user
          .signTransaction({
            data: '0x',
            from: accountNumber,
            gas: '0x9c40',
            gasPrice: '0x02540be400',
            nonce: '0x0114',
            to: accountNumber,
            value: '0x00',
          })
          .then(response => {
            console.log(response);
          });
      } catch (e) {
        console.error(e);
      }
    } else {
      await Linking.openURL(
        'celo://wallet/pay?address=' +
          accountNumber +
          '&displayName=bloXmove&amount=0.01&comment=Burger%20with%20fries&token=cUSD&currencyCode=USD',
      );
    }
  };
  const [codeInputValue, setCodeInputValue] = useState('');

  useEffect(() => {
    if (codeInputValue.length === 6) {
      setPinModal(false);
      setPay(true);
    }
  }, [codeInputValue]);

  useEffect(() => {}, [cardModalVisible, approveModalVisible, pinModal]);

  const myCodeInput = useBlurOnFulfill({
    codeInputValue,
    value: codeInputValue,
    cellCount: codeInputCellCount,
  });
  const [codeInputProps, getCellOnLayoutHandler] = useClearByFocusCell({
    codeInputValue,
    value: codeInputValue,
    setCodeInputValue,
    setValue: setCodeInputValue,
  });
  const renderCodeInputCell = ({index, symbol, isFocused}) => {
    const hasValue = Boolean(symbol);
    let textChild = symbol;

    if (isFocused) {
      textChild = <Cursor />;
    }
    if (hasValue) {
      textChild = '*';
    }

    return (
      <TextInput
        key={index}
        style={[
          styles.codeInputCell,
          isFocused && styles.focusCell,
          hasValue ? styles.activeCell : '',
        ]}
        onLayout={getCellOnLayoutHandler(index)}>
        {textChild}
      </TextInput>
    );
  };

  const acceptCash = () => {
    if (type === 0) {
      setApproveModalVisible(true);
      intervalId.current = setTimeout(() => {
        setApproveModalVisible(false);
        navigation.navigate(type === 0 ? 'BookHail' : 'BookInt', {
          appStyles: appStyles,
          seat: seat,
          passNameList: passNameList,
        });
      }, 7000);
    } else {
      navigation.navigate(type === 0 ? 'BookHail' : 'BookInt', {
        appStyles: appStyles,
        seat: seat,
        passNameList: passNameList.blackColor,
      });
    }
  };
  return (
    <View style={styles.pb30}>
      <View style={[styles.boxContainer, styles.mt20]}>
        <View style={styles.boxBottomHeader}>
          <Text style={styles.title}>Pay with tokens</Text>
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => {
              payToken();
            }}>
            <Text style={styles.btnText}>Select</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.divider} />
        <View style={styles.boxBody}>
          <View style={styles.flexContainer}>
            <Text style={styles.text}>Avaiable BLXM : 300 </Text>
          </View>
          <View style={styles.flexContainer}>
            <Text style={styles.text}>
              {
                item['price'] * (seat ? seat : 1) + " " + item['title'] + " = " + item['price'] * (seat ? seat : 1) * 0.05 + " BLXM"
              }
            </Text>
          </View>
        </View>
      </View>

      <View style={[styles.boxContainer, styles.mt20]}>
        <View style={styles.boxBottomHeader}>
          <Text style={styles.title}>Pay with card</Text>
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => {
              setCardModalVisible(true);
            }}>
            <Text style={styles.btnText}>Select</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.divider} />
        <View style={styles.boxBody}>
          <View style={styles.flexContainer}>
            <Text style={styles.text}>
              {
                item['price'] * (seat ? seat : 1) + " " + item['title'] + " = " + item['price'] * (seat ? seat : 1) * 0.05 + " BLXM"
              }
            </Text>
          </View>
        </View>
      </View>
      {type === 0 ?
        <View style={[styles.boxContainer, styles.mt20]}>
          <View style={styles.boxBottomHeader}>
            <Text style={styles.title}>Pay with cash</Text>
            <TouchableOpacity
              style={styles.btnContainer}
              onPress={() => {
                acceptCash();
              }}>
              <Text style={styles.btnText}>Select</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />
          <View style={styles.boxBody}>
            <View style={styles.flexContainer}>
              <Text style={styles.text}>
                {
                  item['price'] * (seat ? seat : 1) + " " + item['title'] + " = " + item['price'] * (seat ? seat : 1) * 0.05 + " BLXM"
                }
              </Text>
            </View>
          </View>
        </View>
        : <View />}
      <Modal
        swipeDirection={['down']}
        style={styles.modalView}
        onModalHide={() => {
          pay === true ? acceptCash() : setPay(false);
        }}
        isVisible={cardModalVisible}>
        <View style={styles.Modalcontent}>
          <View style={styles.centerContainer}>
            <Text style={styles.title}>Use Saved Card</Text>
            <Icon
              name="close-outline"
              onPress={() => {
                setNewCard(false);
                setCardModalVisible(false);
              }}
              color={appStyles.colorSet[colorScheme].blackColor}
              size={30}
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon
              name="card-outline"
              color="black"
              style={styles.cardIcon}
              size={30}
            />
            <TextInput
              value="4242424242424242"
              placeholder=""
              style={styles.inputBox}
              editable={false}
            />
          </View>
          <View style={[styles.modalContainer, styles.mt10]}>
            <TouchableOpacity
              style={[styles.btnContainer, styles.halfWidth]}
              onPress={() => payOrder()}>
              <Text style={styles.btnText}>Pay</Text>
            </TouchableOpacity>
            {newCard === false ?
              <TouchableOpacity
                style={[styles.btnContainer, styles.halfWidth]}
                onPress={() => {
                  setNewCard(true);
                }}>
                <Text style={styles.btnText}>New Card</Text>
              </TouchableOpacity>
              : <View />}
          </View>
        </View>
      </Modal>
      <Modal
        swipeDirection={['down']}
        style={styles.modalView}
        isVisible={approveModalVisible}>
        <View style={styles.Modalcontent}>
          <View style={styles.modalContainer}>
            <Icon name="person-outline" size={30} color="black" />
            <Text style={styles.title}>David Ola</Text>
          </View>
          <View style={[styles.modalContainer]}>
            <Progress.Bar
              progress={0.3}
              width={250}
              height={10}
              indeterminate={true}
              color={appStyles.colorSet[colorScheme].mainThemeForegroundColor}
            />
          </View>
          <View style={styles.modalContainer}>
            <Text style={styles.text}>
              Waiting for driver to accept request
            </Text>
          </View>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.btnContainer} onPress={cancelOrder}>
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        swipeDirection={['down']}
        style={styles.modalView}
        isVisible={pinModal}
        onModalHide={() => {
          pay === true ? acceptCash() : setPay(false);
        }}>
        <View style={styles.Modalcontent}>
          <View style={styles.modalContainer}>
            <View style={styles.valorContainer}>
              <Image
                source={require('../../../assets/image/valora.png')}
                style={styles.valorImg}
              />
              <Text style={styles.title}>Enter PIN</Text>
            </View>
            <Icon
              name="close-outline"
              onPress={() => {
                setPinModal(false);
              }}
              color={appStyles.colorSet[colorScheme].blackColor}
              style={styles.closeIcon}
              size={30}
            />
          </View>
          <View style={styles.codeFieldContainer}>
            <CodeField
              ref={myCodeInput}
              {...codeInputProps}
              value={codeInputValue}
              onChangeText={setCodeInputValue}
              cellCount={codeInputCellCount}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={renderCodeInputCell}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};
const mapStateToProps = ({auth}) => {
  return {
    user: auth.user,
  };
};

export default connect(mapStateToProps, {})(ChoosePayment);
