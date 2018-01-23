# react-native-q-picker
a react native picker for android and ios
由于react-native-picker的Android版使用悬浮窗，造成小米和魅族手机需要手动打开悬浮窗权限，所以决定抛弃react-native-picker，自己写了一个支持Android和ios版的picker，效果图：

<img src="https://github.com/pentakill666/react-native-q-picker/blob/master/img/3P157.gif" width = "400" height = "620" alt="ios" align=left />
<img src="https://github.com/pentakill666/react-native-q-picker/blob/master/img/GQZSB.gif" width = "400" height = "620" alt="android" align=right />

</br>
# install
由于Android版依赖了react-native-wheel-picker，所以安装的时候对于Android需要进行特殊配置：
```
npm i react-native-wheel-picker --save
```
```
npm i react-native-q-picker --save
```

# 配置Android
 # Add in settings.gradle
```
include ':react-native-wheel-picker'
project(':react-native-wheel-picker').projectDir = new File(settingsDir, '../node_modules/react-native-wheel-picker/android')
```
# Add in app/build.gradle
```
compile project(':react-native-wheel-picker')
```
# Modify MainApplication
```
    import com.zyu.ReactNativeWheelPickerPackage;
    ......

    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
            ······，
            new ReactNativeWheelPickerPackage()
        );
    }
```
# usage

```
import React, { Component } from 'react';
import {
    Text,
    View,
} from 'react-native';
import Picker from 'react-native-q-picker';

export default class PickerDemo extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            list:[
                {name:'老师',id:0},
                {name:'学生',id:2},
                {name:'工人',id:4},
                {name:'科学家',id:19},
                {name:'画家',id:7},
                {name:'书法家',id:10},
            ],
            professional:'',
            index:'',
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Header headerOptions={headerOptions} />
                    <View style={styles.wrap}>
                        <View style={styles.header}>
                            <Text style={styles.htxt}>选择索引：{this.state.index}</Text>
                            <Text style={styles.htxt}>选择标签：{this.state.professional}</Text>
                        </View>
                        <Picker PickerData={this.state.list} 
                        defaultValue={2} 
                        label={'职业'} 
                        getTxt={(val,label)=>this.setState({index:val,professional:label})}/>
                    </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    wrap:{
        padding:13,
    },
    header:{
        height:40,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    htxt:{
        fontSize:16,
        marginLeft:20
    }
});
```

