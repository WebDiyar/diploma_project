import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { MaterialSymbol } from 'react-material-symbols';
import { Button, Pagination, Spin, Table } from 'antd';
import './Homepage.css';
import { useGetOrganizationsQuery, } from '../../features/api/apiSlice';
import { DataType, columns } from './Columns';

const HomePage: React.FC = () => {
    const [totalOrgNumber, setTotalOrgNumber] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const ORG_NUMBER_PER_PAGE: number = 15;
    const navigate = useNavigate();

    const handleAddClick = () => {
        navigate("/add");
    };

    const handlePaginationChange = (page: number) => {
        setCurrentPage(page);
    };

    const paginatedData = (dataSource: DataType[]) => {
        const startIndex = (currentPage - 1) * ORG_NUMBER_PER_PAGE;
        const endIndex = Math.min(startIndex + ORG_NUMBER_PER_PAGE, totalOrgNumber);
        return dataSource.slice(startIndex, endIndex);
    }

    const {
        data: orgs = [],
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetOrganizationsQuery();

    let table;

    if (isLoading) {
        table = <Spin />
    } else if (isSuccess) {
        const dataSource = orgs.map((org) => ({ ...org, key: org.id }));
        table = <Table dataSource={paginatedData(dataSource)} columns={columns} pagination={false} />
    } else if (isError) {
        table = <div>{error.toString()}</div>
    }

    useEffect(() => {
        if (isSuccess) {
            setTotalOrgNumber(orgs.length);
        }
    }, [isSuccess, orgs]);

    return (
        <div className="container">
            <section className='section'>
                <div className="add">
                    <Button icon={<MaterialSymbol icon='add_circle' size={20} color='#0E2B52' />} className='add_title' onClick={handleAddClick}>
                        Добавить
                    </Button>
                </div>
                <div className="data">
                    {table}
                </div>
                <div className='pagination-container'>
                    <Pagination current={currentPage} defaultCurrent={1} pageSize={ORG_NUMBER_PER_PAGE} total={totalOrgNumber} onChange={handlePaginationChange} />
                </div>
            </section>
        </div>
    );
}

export default HomePage;
