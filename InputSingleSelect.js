
import React, {Component} from 'react';
import {Text, View, ScrollView, TouchableOpacity, TextInput} from 'react-native';
import {isEmptyArray} from "../util";

export default class InputSingleSelect extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOptionText : '',
            options : []
        };
    }

    selectedOptionTextChanged(text) {
        let options = [];
        this.setState({
            selectedOptionText : text
        }, () => {
          
            options = this.props.items.map((item) => {
                if (item.label.toUpperCase().trim().includes(this.state.selectedOptionText.toUpperCase().trim())) {
                    return item;
                }
            });

        });

        if (isEmptyArray(options)) {
            return this.setState({options: []});
        } else if (!isEmptyArray(options)) {
            this.setState({options: options});
        }
    }

    clearSelectedOption() {
        this.setState({
            selectedOptionText : ''
        }, () => {
            this.props.clearReleasedItem();
        });
    }

    selectedItemChanged(value) {
        this.setState({
            selectedOptionText : ''
        }, () => this.props.selectedItemChanged(value)/*function from the parent comment that was concerned with this*/);

    }


    render() {

        let options = [];

        return (
            <View
                style={{
                    flex : 1,
                    flexDirection: 'column',
                    height : '100%',
                    width: '100%'
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        width:'100%',
                        height : 50
                    }} >

                    {
                        (''+this.props.selectedOptionValue === '') &&
                        <TextInput
                            style={{
                                color:'#36485C',
                                fontFamily:'SanFranciscoThin',
                                textAlign: 'left',
                                borderStyle: 'solid',
                                paddingBottom:4,
                                height: '100%',
                                padding:5,
                                borderRadius:4,
                                borderWidth: 2,
                                fontSize:16,
                                borderColor: '#E0E0E0',
                                backgroundColor : "#FFFFFF",
                                width : '84%'
                            }}
                            placeholder={this.props.placeholder}
                            onChangeText={text => this.selectedOptionTextChanged(text)}
                            value={this.state.selectedOptionText}
                        />
                    }

                    {
                        (''+this.props.selectedOptionValue !== '' && ''+this.state.selectedOptionText === '')  &&
                        <Text
                            style={{
                                color:'#000',
                                fontFamily:'SanFranciscoThin',
                                textAlign: 'left',
                                borderStyle: 'solid',
                                paddingBottom:4,
                                height: '100%',
                                padding:15,
                                borderRadius:4,
                                borderWidth: 2,
                                fontSize:16,
                                borderColor: '#E0E0E0',
                                backgroundColor : "#FFFFFF",
                                width : '84%'
                            }}
                        >
                            { (this.props.items.find(item => item.value == this.props.selectedOptionValue)).label }
                        </Text>
                    }

                    {
                        ( (''+this.state.selectedOptionText !== '' && ''+this.props.selectedOptionValue === '') ||
                            (''+this.props.selectedOptionValue !== '' && ''+this.state.selectedOptionText === '')) &&
                        (
                            <TouchableOpacity
                                style={{
                                    height: '100%',
                                    width : '16%',
                                    paddingLeft : 4
                                }}
                                activeOpacity={.5}
                                onPress={()=> this.clearSelectedOption()}
                            >
                                <Text
                                    style={{
                                        color:'#fc756a',
                                        fontFamily:'SanFrancisco',
                                        fontSize:28,
                                        textAlign:"center"
                                    }}
                                >
                                  {/*Clears the TextInput*/}
                                    X
                                </Text>
                            </TouchableOpacity>
                        )
                    }

                </View>

                {
                    (''+this.state.selectedOptionText !== '' && ''+this.props.selectedOptionValue === '') &&
                    <View
                        style={{
                            flexDirection: 'column',
                            width:'100%',
                            height : 150,
                            backgroundColor: '#fff',
                            padding: 2,
                            zIndex : (1+this.props.zIndexCounter) //Important so that if you have a list of this components, the dropdown goes above the one below it
                        }}
                    >
                        <ScrollView>
                            {
                                this.props.items.length > 0 &&
                                (''+this.state.selectedOptionText !== '' && ''+this.props.selectedOptionValue === '') &&
                                (
                                    options = this.props.items.map((item, i) => {
                                        if (item.label.toUpperCase().trim().includes(this.state.selectedOptionText.toUpperCase().trim())) {
                                            return <TouchableOpacity
                                                key={i}
                                                style={{padding: 5}}
                                                activeOpacity={.5}
                                                onPress={()=> this.selectedItemChanged(item.value)}
                                            >
                                                <Text
                                                    style={{
                                                        color:'#fc756a',
                                                        fontFamily:'SanFrancisco',
                                                        fontSize:16,
                                                        textAlign:"left"
                                                    }}
                                                >
                                                    {item.label}
                                                </Text>
                                            </TouchableOpacity>
                                        }
                                    })
                                )
                            }

                            {
                                (this.state.options.length <= 0) &&
                                (
                                    <View
                                        style={{
                                            alignItems:'center'
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color:'#fc756a',
                                                fontFamily:'SanFrancisco',
                                                fontSize:18,
                                                textAlign:"center"
                                            }}
                                        >
                                            {this.props.noSuchItemsFoundMessage}
                                        </Text>
                                    </View>
                                )
                            }

                            {options}

                            <Text style={{textAlign:"center"}}>
                                ____End____
                            </Text>

                        </ScrollView>

                    </View>
                }

            </View>
        );
    }

}
