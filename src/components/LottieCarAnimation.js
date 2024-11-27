import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../animations/car-animation.json'; // Correct path

const LottieCarAnimation = () => {
  return <Lottie animationData={animationData} style={{ width: 400, height: 400 }} />;
};

export default LottieCarAnimation;
