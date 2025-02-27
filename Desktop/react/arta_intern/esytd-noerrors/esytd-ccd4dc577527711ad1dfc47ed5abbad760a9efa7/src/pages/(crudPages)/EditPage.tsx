import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Form, Input, Button, Select, message } from 'antd';
import { useGetOrganizationQuery, useEditOrganizationMutation } from '../../features/api/apiSlice';
import './style.css';

interface EditValues {
    id: string;
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

const EditPage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, isError } = useGetOrganizationQuery(id!);
    const [editOrganization] = useEditOrganizationMutation();
    const [form] = Form.useForm();

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                ...data,
                status: data.status === '2' ? 'active' : data.status === '1' ? 'blocked' : 'deleted'
            });
        }
    }, [data, form]);

    const onFinish = async (values: EditValues) => {
        const updatedValues = {
            ...values,
            status: values.status === 'active' ? '2' : values.status === 'blocked' ? '1' : '0',
            deleted: null,
        };

        try {
            await editOrganization({ ...updatedValues }).unwrap();
            message.success('Организация успешно обновлена!');
            // console.log('Edit values: ', values);
            navigate('/');
        } catch (err) {
            message.error('Произошла ошибка при обновлении организации!');
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading organization data</div>;

    return (
        <div className="container">
            <Form
                form={form}
                layout="vertical"
                name="organization_form"
                onFinish={onFinish}
                className='form'
            >
                <Item
                    label="ID"
                    name="id"
                >
                    <Input disabled />
                </Item>

                <Item
                    label="БИН организации"
                    name="bin"
                    rules={[
                        { required: true, message: 'Пожалуйста, введите БИН организации!' },
                        { pattern: /^\d{12}$/, message: 'БИН должен состоять из 12 цифр!' }
                    ]}
                >
                    <Input maxLength={12} placeholder="12 цифр" />
                </Item>

                <Item
                    label="Код организации"
                    name="organization_code"
                    rules={[
                        { required: true, message: 'Пожалуйста, введите код организации!' },
                        { pattern: /^[a-zA-Z0-9-_]+$/, message: 'Код организации должен содержать только английские буквы, цифры, символы "-" и "_"' }
                    ]}
                >
                    <Input maxLength={128} />
                </Item>

                <Item
                    label="Наименование организации"
                    name="organization_name"
                    rules={[{ required: true, message: 'Пожалуйста, введите наименование организации!' }]}
                >
                    <Input maxLength={128} />
                </Item>

                <Item
                    label="Адрес системы/хост"
                    name="host"
                    rules={[{ required: true, message: 'Пожалуйста, введите адрес системы/хост!' }]}
                >
                    <Input maxLength={128} />
                </Item>

                <Item
                    label="Логин"
                    name="login"
                    rules={[
                        { required: true, message: 'Пожалуйста, введите логин!' },
                        { pattern: /^[a-zA-Z0-9-_]+$/, message: 'Логин должен содержать только английские буквы, цифры, символы "-" и "_"' }
                    ]}
                >
                    <Input maxLength={128} />
                </Item>

                <Item
                    label="Пароль"
                    name="password"
                    rules={[
                        { required: true, message: 'Пожалуйста, введите пароль!' },
                        { pattern: /^[a-zA-Z0-9-_]+$/, message: 'Пароль должен содержать только английские буквы, цифры, символы "-" и "_"' }
                    ]}
                >
                    <Input.Password maxLength={128} />
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

export default EditPage;
