import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  //Components
  container: {
    display: 'flex',
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 10
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    //alignItems: 'center'
  },
  separator: {
    marginVertical: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#d6d7da',
  },
  textContainer: {
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  leftContent: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10
  },
  rightContent: {
    display: 'flex',
    flex: 1,
    padding: 5
  },
  icon: {
    width: 50,
    height: 50,
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 10,
    width: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: '#d6d7da',
  },
  itemFakeContainer: {
    display: 'flex',
    //flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderRadius: 10,
  },
  list: {
    display: 'flex',
    width: '100%',
    paddingHorizontal: 10
  },
  imageView: {
    paddingHorizontal: 10
  },
  sunriseContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderLeftColor: 'lightgray',
    borderLeftWidth: 0.3,
    borderRightColor: 'lightgray',
    borderRightWidth: 0.3
  },
  minmaxContainer: {
    flex:1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  sunsetItem: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    justifyContent: 'center'
  },
  minmaxItem: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    width: '100%'
  },
  //Texts
  dayText: {
    fontFamily: "Jura-Bold",
    fontSize: 20
  },
  tempText: {
    fontFamily: "Jura-Light",
    fontSize: 20
  }
});

export default styles;