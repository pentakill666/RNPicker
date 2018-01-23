/**
 * 横向输入框组件
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Picker from './dist/Picker';
export default class App extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
        defaultValue:'',
        currentLabel:'',
        isShow:false,
    }
  }
  componentWillReceiveProps(nextProps) {
      this.setState({
         defaultValue:nextProps.defaultValue
      })
  }
  _getValue(val,label,isShow) {
      this.props.getTxt(val,label);
      this.setState({
          currentLabel:label,
          isShow:isShow,
      })
  }
  renderDom() {
    const { label,onPress,PickerData,last} = this.props;
    let { defaultValue,currentLabel,isShow } = this.state;
        return (
          <TouchableOpacity activeOpacity={1} style={[styles.wrap,{borderBottomWidth:last?0:1}]} onPress={()=>this.setState({isShow:true})}>
            <Text style={styles.label} >{label}</Text>
            <View style={styles.picker}>
              <Picker isShow={isShow} data={PickerData} defaultValue={defaultValue} getVal={(val,label,isShow)=>this._getValue(val,label,isShow)}/>
            </View>
            <Text style={styles.current}>{currentLabel}</Text>
             <Image source={require('../images/link.png')} style={styles.linkIcon}/>
          </TouchableOpacity>
        )
  }
  _isLink(link) {
      if(link) {
          return(
              <Image source={require('../images/link.png')} style={styles.linkIcon}/>
          )
      }
  }
  render() {
    return(
      this.renderDom()
    )
  }
}

const styles = StyleSheet.create({
  wrap:{
    flexDirection:'row',
    alignItems:'center',
    height:45,
    borderBottomWidth:1,
    borderColor:'#e6e6e6',
    backgroundColor:'#fff',
    justifyContent:'space-between',
  },
  label:{
    fontSize:16,
    color:'#444',
  },
  input:{
    flex:1,
    borderWidth:0,
    height:45,
    marginLeft:10,
    paddingLeft:10,
    fontSize:16,
    paddingTop:0,
    paddingBottom:0,
    textAlign:'right',
    color:'#444',
  },
  picker:{
    flex:1,
    flexDirection:'row',
    paddingLeft:10,
  },
    linkIcon:{
      width:6,
      height:10,
      marginRight:10,
  },
  current:{
      fontSize:16,
      color:'#646464',
      marginRight:10
  }
});
