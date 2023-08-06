import React, { FC } from 'react';
import styles from './FormErrors.module.scss';

interface FormErrorsProps {
  children: React.ReactNode;
  error?: string;
}

const FormErrors: FC<FormErrorsProps> = (props) => {

  const {error,children} = props;

  return (
    <div className={styles.FormErrors}>
      {children}
      {error && <span className={styles.FormErrors__error}>{error}</span>}
    </div>
  );
}

export default FormErrors;
