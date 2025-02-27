import React from 'react';
import { useNavigate } from 'react-router';
import { Form, Input, Button, Select, message } from 'antd';
import { useAddNewOrganizationMutation } from '../../features/api/apiSlice';
import './style.css';

interface AddValues{
    bin: string;
    host: string;
    login: string;
    organization_code: string;
    organization_name: string;
    password: string;
    status: string;
}

const { Item } = Form;
const { Option } = Select;

const AddPage: React.FC = () => {
    const navigate = useNavigate();
    const [addNewOrganization] = useAddNewOrganizationMutation();

    const onFinish = async (values: AddValues) => {
        const newValues = {
            ...values,
            status: values.status === 'active' ? '2' : values.status === 'blocked' ? '1' : '0',
            deleted: null,
            created: new Date().toISOString(),
        };

        try {
            await addNewOrganization(newValues).unwrap(); // get data from promise
            message.success('Организация успешно добавлена!');
            // console.log('Add values: ', values);
            navigate('/');
        } catch (err) {
            message.error('Произошла ошибка при добавлении организации!');
        }
    };

    return (
        <div className='container'>
            <Form
                layout="vertical"
                name="organization_form"
                initialValues={{ status: 'active' }}
                onFinish={onFinish}
                className='form'
            >
                <Item
                    label="БИН организации"
                    name="bin"
                    rules={[
                        { required: true, message: 'Пожалуйста, введите БИН организации!' },
                        { pattern: /^\d{12}$/, message: 'БИН должен состоять из 12 цифр!' }
                    ]}
                >
                    <Input maxLength={12} placeholder="Максимальная длина: 12 цифр" />
                </Item>

                <Item
                    label="Код организации"
                    name="organization_code"
                    rules={[
                        { required: true, message: 'Пожалуйста, введите код организации!' },
                        { pattern: /^[a-zA-Z0-9-_]+$/, message: 'Код организации должен содержать только английские буквы, цифры, символы "-" и "_"' }
                    ]}
                >
                    <Input maxLength={128} placeholder='Максимальная длина: 128 символов'/>
                </Item>

                <Item
                    label="Наименование организации"
                    name="organization_name"
                    rules={[{ required: true, message: 'Пожалуйста, введите наименование организации!' }]}
                >
                    <Input maxLength={128} placeholder='Максимальная длина: 128 символов' />
                </Item>

                <Item
                    label="Адрес системы/хост"
                    name="host"
                    rules={[{ required: true, message: 'Пожалуйста, введите адрес системы/хост!' }]}
                >
                    <Input maxLength={128} placeholder='Максимальная длина: 128 символов' />
                </Item>

                <Item
                    label="Логин"
                    name="login"
                    rules={[
                        { required: true, message: 'Пожалуйста, введите логин!' },
                        { pattern: /^[a-zA-Z0-9-_]+$/, message: 'Логин должен содержать только английские буквы, цифры, символы "-" и "_"' }
                    ]}
                >
                    <Input maxLength={128} placeholder='Максимальная длина: 128 символов' />
                </Item>

                <Item
                    label="Пароль"
                    name="password"
                    rules={[
                        { required: true, message: 'Пожалуйста, введите пароль!' },
                        { pattern: /^[a-zA-Z0-9-_]+$/, message: 'Пароль должен содержать только английские буквы, цифры, символы "-" и "_"' }
                    ]}
                >
                    <Input.Password maxLength={128} placeholder='Максимальная длина: 128 символов' />
                </Item>

                <Item
                    label="Статус"
                    name="status"
                    rules={[{ required: true, message: 'Пожалуйста, выберите статус!' }]}
                >
                    <Select placeholder="Выберите статус">
                        <Option value="active">Активен</Option>
                        <Option value="blocked">Заблокирован</Option>
                        <Option value="deleted">Удален</Option>
                    </Select>
                </Item>

                <div className='form-footer'>
                    <Item className='form-footer-item'>
                        <Button type="default" style={{ marginRight: '8px' }} onClick={() => navigate("/")}>
                            Отмена
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Сохранить
                        </Button>
                    </Item>
                </div>
            </Form>
        </div>
    );
};

export default AddPage;
