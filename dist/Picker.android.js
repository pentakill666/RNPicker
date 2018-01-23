/*
创建联系人
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    Image,
    TextInput,
    Alert,
    Dimensions,
    Modal,
    TouchableOpacity
} from 'react-native';
import Picker from 'react-native-wheel-picker';

var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;

export default class CreateContact extends Component<{}> {
    constructor(props) {
        super(props);
        this.state= {
            isShow:false,
            data:[],
            selectedValue:'',
            currentLabel:'',
        }
    }
    componentWillMount() {
        this.setState({
            selectedValue:this.props.defaultValue,
            data:this.props.data,
        })
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            isShow:nextProps.isShow,
            data:nextProps.data,
        })
    }
    _renderPickerItem() {
        return this.state.data.map((item,index)=>{
            return(
                <Picker.Item label={item.name} value={item.id} key={index} />
            )
        })
    }
    _showModal() {
        this.setState({
            isShow:true
        })
    }
    _hideModal() {
        this.setState({
            isShow:false
        })
    }
    _confirm() {
        if(this.state.selectedValue===''){
            this.props.getVal(this.state.data[0].id,this.state.data[0].name,false);
        }else {
            this.props.getVal(this.state.selectedValue,this.state.currentLabel,false);
        }
    }
    _cancel() {
        this._hideModal();
    }
    _onValueChange(itemValue) {
        let arr = this.state.data;
            if(arr.length) {
            for (var i = 0; i < arr.length; i++) {
                if(arr[i].id===itemValue) {
                    this.setState({
                        selectedValue:itemValue,
                        currentLabel:arr[i].name
                    })
                }
            }
        }
    }
    render() {
        let { isShow,data } = this.state;
        return (
            <View style={styles.container}>
                <Modal
                  animationType={"slide"}
                  transparent={true}
                  visible={isShow}
                  onRequestClose={() => {alert("Modal has been closed.")}}
                  >
                    <View style={styles.wrap} activeOpacity={1} >
                        <TouchableOpacity style={{flex:1}} activeOpacity={1} onPress={()=>this._cancel()}>
                        </TouchableOpacity>
                        <View style={styles.pickerWrap}>
                            <View style={styles.pickerHeader}>
                                <TouchableOpacity style={styles.pickerConfirm} onPress={()=>this._cancel()}>
                                    <Text>取消</Text>
                                </TouchableOpacity>
                                <View style={styles.pickerTitle}>
                                    <Text>选择器</Text>
                                </View>
                                <TouchableOpacity style={styles.pickerCancel} onPress={()=>this._confirm()}>
                                    <Text style={styles.cancelTxt}>确定</Text>
                                </TouchableOpacity>
                            </View>
                            <Picker style={styles.picker}
            					selectedValue={this.state.selectedValue}
                                itemStyle={{color:"#000", fontSize:20}}
            					onValueChange={(itemValue) =>this._onValueChange(itemValue)}>
            					{this._renderPickerItem()}
            				</Picker>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f7f7f7'
    },
    wrap:{
        flex: 1,
        padding:15,
    },
    content:{
        paddingBottom:30,
    },
    section:{
        borderRadius: 3,
        backgroundColor: '#fff',
        paddingLeft:12,
        paddingRight:12,
    },
    input:{
        height:60,
        borderColor:'#e6e6e6',
        borderWidth:0.5,
        paddingLeft:15,
    },
    wrap:{
        flex:1,
        backgroundColor:'rgba(0,0,0,0.5)',
    },
    pickerWrap:{
        position:'absolute',
        left:0,
        bottom:0,
        width:ScreenWidth,
        height:250,
        backgroundColor:'#ddd',
    },
    pickerHeader:{
        height:40,
        backgroundColor:'#ccc',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        paddingLeft:10,
        paddingRight:10,
    },
    pickerTitle:{
        height:40,
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    pickerConfirm:{
        width:50,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
        borderRadius:3,
    },
    pickerCancel:{
        width:50,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#007aff',
        borderRadius:3,
    },
    picker:{
        height:200,
        flex:1,
    },
    cancelTxt:{
        color:'#fff',
    },
});
