import React from 'react';
import LottieView from 'lottie-react-native';

export default class Alert extends React.Component {
    componentDidMount() {
        this.animation.play();

      }
    
      render() {
        return (
          <LottieView
        
            ref={animation => {
              this.animation = animation;
            }}
            source={require('../assets/images/alert.json')}
          />
        );
      }
    }