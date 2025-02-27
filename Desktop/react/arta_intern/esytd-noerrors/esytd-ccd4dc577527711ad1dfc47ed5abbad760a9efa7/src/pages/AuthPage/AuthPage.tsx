import React from 'react';
import { Input, Typography, Button } from 'antd';
import styles from './AuthPage.module.css';

const AuthPage: React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.form}>
                <Typography.Title level={5}>Токен</Typography.Title>
                <Input
                    placeholder="введите токен"
                    className={styles.input_controller}
                />
                <Button className={styles.form_btn} type="primary">Войти</Button>
            </div>
        </div>
    );
};

export default AuthPage;