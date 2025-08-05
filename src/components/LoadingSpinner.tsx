import React from 'react';
import { LoadingSpinnerProps } from '../types';
import styles from './LoadingSpinner.module.css';

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'normal', 
  text = 'Loading...' 
}) => {
  return (
    <div className={`${styles.loadingSpinner} ${size === 'large' ? styles.large : ''}`}>
      {text}
    </div>
  );
};

export default LoadingSpinner;