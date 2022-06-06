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
    padding: 5
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
    backgroundColor: '#fff',
    //flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
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
  //Texts
  hourText: {
    fontFamily: "Jura-Regular",
    fontSize: 14
  },
  tempText: {
    fontFamily: "Jura-Light",
    fontSize: 20
  }
});

export default styles;