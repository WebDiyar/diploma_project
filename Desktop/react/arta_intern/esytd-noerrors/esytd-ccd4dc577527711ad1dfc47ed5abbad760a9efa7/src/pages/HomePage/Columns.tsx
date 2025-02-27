import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { MaterialSymbol } from 'react-material-symbols';
import { Button, Space, Tag, Modal, message } from 'antd';
import type { TableProps } from 'antd';
import './Homepage.css';
import { useDeleteOrganizationMutation } from '../../features/api/apiSlice';

export interface DataType {
    id: string | number;
    bin: string;
    organization_code: string;
    organization_name: string;
    status: string;
    host: string;
}

export const columns: TableProps<DataType>['columns'] = [
    {
        title: "ID",
        dataIndex: "id",
        key: "id"
    },
    {
        title: "БИН",
        dataIndex: "bin",
        key: "bin"
    },
    {
        title: "Код организации",
        dataIndex: "organization_code",
        key: "code"
    },
    {
        title: "Наименование организации",
        dataIndex: "organization_name",
        key: "name"
    },
    {
        title: "Адрес системы/хост",
        dataIndex: "host",
        key: "host"
    },
    {
        title: "Статус",
        dataIndex: "status",
        key: "status",
        render: (_, record) => {
            const color = record.status === '0' ? 'red' : record.status === '1' ? 'processing' : 'green';
            return (
                <p>
                    <Tag color={color} style={{ fontSize: '14px' }}>
                        {record.status === '0' ? 'удален' : record.status === '1' ? 'заблокирован' : 'активен'}
                    </Tag>
                </p>
            )
        }
    },
    {
        title: "Действия",
        width: 60,
        render: (_, record) => {
            return (
                <ActionColumn data={record} />
            )
        }
    }
]

export const ActionColumn: React.FC<{ data: DataType }> = ({ data }) => {
    const [open, setOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const [deleteOrganization] = useDeleteOrganizationMutation();

    const showDeleteModal = () => {
        setOpen(true);
    };

    const handleDeleteModalOk = async () => {
        try {
            await deleteOrganization(Number(data.id)).unwrap();
            message.success('Организация успешно удалена!');
            setOpen(false);
        } catch (err) {
            message.error('Произошла ошибка при удалении организации!');
        }
    };

    const handleDeleteModalCancel = () => {
        setOpen(false);
    };

    const handleEditClick = () => {
        navigate(`/edit/${data.id.toString()}`);
    }

    return (
        <Space>
            <Button onClick={handleEditClick} icon={<MaterialSymbol icon='visibility' size={22} />} />
            <Button onClick={showDeleteModal} icon={<MaterialSymbol icon='delete' size={22} />} />
            <Modal
                open={open}
                title={`Вы уверены в том, что хотите удалить ${data.organization_name}?`}
                footer={() => (
                    <div style={{ textAlign: 'start', marginTop: '1rem' }}>
                        <Button key="submit" type="primary" danger onClick={handleDeleteModalOk} style={{ marginRight: '.5rem' }}>
                            Удалить
                        </Button>
                        <Button key="back" onClick={handleDeleteModalCancel}>
                            Назад
                        </Button>
                    </div>
                )}
            />
        </Space>
    )
}