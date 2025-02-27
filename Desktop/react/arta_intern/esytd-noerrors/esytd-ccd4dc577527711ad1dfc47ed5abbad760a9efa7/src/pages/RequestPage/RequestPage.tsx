import React from 'react';
import { DatePicker, Select, Button, Pagination } from 'antd';
import { MaterialSymbol } from 'react-material-symbols';
import dayjs from 'dayjs';
import './RequestPage.css';

const dateFormat = 'YYYY/MM/DD';

const RequestPage: React.FC = () => {
    const handlePaginationChange = (page: number | string | null) => {
        console.log("Current page:", page);
    }
    
    return (
        <div className="container">
            <div className="filter">
                <div className="fields">
                    <div className="dates">
                        <DatePicker defaultValue={dayjs('2023/09/24', dateFormat)} format={dateFormat} style={{marginRight: 14}}/>
                        <DatePicker defaultValue={dayjs('2023/09/24', dateFormat)} format={dateFormat} />
                    </div>
                    <div className="category">
                        <Select placeholder="Не выбрано" style={{width: 270}} options={[]} />
                    </div>
                </div>

                <Button type='primary'>Применить</Button>
            </div>
            {/* home.css */}
            <section className='section'>
                <div className="data">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>JSON</th>
                                <th>XML</th>
                                <th>Дата отправки</th>
                                <th>Код организации</th>
                                <th>Метод</th>
                                <th>Статус</th>
                                <th>Сообщение об ошибке</th>
                                <th>Дата переотправки</th>
                                <th>Количество попыток</th>
                                <th style={{textAlign: 'center'}}>Действие</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>тут данные JSON</td>
                                <td>тут данные XML</td>
                                <td>2023-09-26 11:54:34</td>
                                <td>nce</td>
                                <td>terminationContractData</td>
                                <td>не успешно</td>
                                <td>тут сообщения об ошибке</td>
                                <td>2023-09-26 11:54:34</td>
                                <td>1</td>
                                <td style={{textAlign: 'center'}}>
                                    <MaterialSymbol icon='mail' size={20} color="#0E2B52" />
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>тут данные JSON</td>
                                <td>тут данные XML</td>
                                <td>2023-09-26 11:54:34</td>
                                <td>arta</td>
                                <td>terminationContractData</td>
                                <td>переотправлено</td>
                                <td>тут сообщения об ошибке</td>
                                <td>2023-09-26 11:54:34</td>
                                <td>0</td>
                                <td style={{textAlign: 'center'}}>
                                    <MaterialSymbol icon='mail' size={20} color="#0E2B52" />
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>тут данные JSON</td>
                                <td>тут данные XML</td>
                                <td>2023-09-26 11:54:34</td>
                                <td>arta</td>
                                <td>terminationContractData</td>
                                <td>доставлено успешно</td>
                                <td></td>
                                <td>2023-09-26 11:54:34</td>
                                <td>5</td>
                                <td style={{textAlign: 'center'}}>
                                    <MaterialSymbol icon='mail' size={20} color="#0E2B52" />
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>тут данные JSON</td>
                                <td>тут данные XML</td>
                                <td>2023-09-26 11:54:34</td>
                                <td>arta</td>
                                <td>terminationContractData</td>
                                <td>отправлен</td>
                                <td></td>
                                <td>2023-09-26 11:54:34</td>
                                <td>5</td>
                                <td style={{textAlign: 'center'}}>
                                    <MaterialSymbol icon='mail' size={20} color="#0E2B52" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
            <div className="pagination_container">
                <Pagination current={1} defaultCurrent={1} pageSize={1} total={10} onChange={handlePaginationChange} />
            </div>
        </div>
    );
};

export default RequestPage