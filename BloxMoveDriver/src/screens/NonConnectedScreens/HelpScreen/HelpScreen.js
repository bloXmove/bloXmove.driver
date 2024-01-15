import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Linking,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {customerServiveAPI} from '../utils';
import {COLORS, TNActivityIndicator, Text} from '@components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const SOCIALS = [
  {title: 'twitter', link: 'https://twitter.com/bloxmove'},
  {title: 'Facebook', link: 'https://www.facebook.com/bloXmove/'},
  {title: 'Instagram', link: 'https://www.instagram.com/bloxmove'},
];

const HelpScreen = props => {
  const {route, navigation} = props;
  const appConfig = route.params.appConfig;
  const apiToken = useSelector(state => state.auth.token);
  const insets = useSafeAreaInsets();

  const [isLoading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);

  const [data, setData] = useState([]);

  useEffect(() => {
    getHelp();
  }, []);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={styles.btnToggle} onPress={openDrawer}>
          <Icon name="menu-outline" size={30} />
        </TouchableOpacity>
      ),
      headerRight: '',
    });
  }, []);

  const openDrawer = () => {
    Keyboard.dismiss();
    props.navigation.openDrawer();
  };

  const getHelp = async () => {
    setLoading(true);
    const url = 'page=' + pageNum + '&size=20&sort=DESC';
    customerServiveAPI
      .getServices(apiToken, url)
      .then(response => {
        setPageNum(pageNum + 1);
        setData(prevState => [...prevState, ...response.data.data]);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
      });
  };

  const Item = ({item}) => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        props.navigation.navigate('DetailHelp', {
          item: item,
          appConfig: appConfig,
        });
      }}>
      <Text numberOfLines={2} textStyle="body18Regular">
        {item.title}
      </Text>
      <Icon name="right" size={14} color="black" />
    </TouchableOpacity>
  );

  const SocialMediaItem = ({item}) => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        Linking.openURL(item.link);
      }}>
      <Text numberOfLines={2} textStyle="body18Regular">
        Follow us on {item.title}
      </Text>
      <Icon name="right" size={14} color="black" />
    </TouchableOpacity>
  );

  const renderItem = ({item}) => <Item item={item} />;

  const renderHeader = () => {
    return (
      <View>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Icon name="arrowleft" size={24} color={COLORS.black} />
          </TouchableOpacity>
          <Text textStyle="body18Semibold">Support</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('Contact', {
              appConfig: appConfig,
            });
          }}>
          <Text textStyle="body18Regular">Contact Us</Text>
          <Icon name="right" size={14} color={COLORS.black} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            await Linking.openURL('https://bloxmove.ng/about-us-3/');
          }}>
          <Text textStyle="body18Regular">About Us</Text>
          <Icon name="right" size={14} color={COLORS.black} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            await Linking.openURL('https://bloxmove.ng/faq-for-rider/');
          }}>
          <Text textStyle="body18Regular">Frequently asked questions</Text>
          <Icon name="right" size={14} color={COLORS.black} />
        </TouchableOpacity>
        {SOCIALS.map((item, index) => (
          <SocialMediaItem item={item} key={index} />
        ))}
      </View>
    );
  };
  if (isLoading && pageNum === 1) {
    return <TNActivityIndicator />;
  }
  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={renderHeader}
          data={data}
          // renderItem={renderItem}
          keyExtractor={item => item.id}
          // onRefresh={() => getHelp()}
          refreshing={isLoading}
          // onEndReached={() => getHelp()}
          // onEndReachedThreshold={0.2}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};
HelpScreen.propTypes = {
  appConfig: PropTypes.object,
};

const styles = StyleSheet.create({
  safeView: {
    flexGrow: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    padding: 32,
    backgroundColor: COLORS.white,

    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',

    marginVertical: 16,
  },
  backButton: {
    marginRight: 24,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingVertical: 8,
    marginVertical: 4,
  },
});

export default HelpScreen;
