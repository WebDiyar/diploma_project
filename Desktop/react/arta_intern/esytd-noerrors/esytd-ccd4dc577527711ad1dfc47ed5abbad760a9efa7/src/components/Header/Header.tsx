import React, { useState } from 'react';
import { MaterialSymbol } from 'react-material-symbols';
import { Link } from 'react-router-dom';
import { Menu, Button, Drawer } from 'antd';
import type { MenuProps } from 'antd';
import './Header.css';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    { key: '1', icon: <MaterialSymbol icon='list' size={24} color='#fff'/>, label: <Link to="/">Список организаций</Link> },
    { key: '2', icon: <MaterialSymbol icon='developer_guide' size={24} color='#fff'/>, label: <Link to="/">Справочники</Link> },
    { key: '3', icon: <MaterialSymbol icon='info' size={24} color='#fff'/>, label: <Link to="/requests">Информация о запросах</Link> },
];

const Header: React.FC = () => {
    const [openMenu, setOpenMenu] = useState<boolean>(false);
   
    return (
        <header className="header">
            <div className="header_left">
                <Button 
                    type='text'
                    onClick={() => {
                        setOpenMenu(true);
                    }}
                >
                    <MaterialSymbol icon='menu' size={24} color='#fff' />
                </Button>
                <Drawer 
                    open={openMenu} 
                    onClose={() => {
                        setOpenMenu(false);
                    }}
                    placement='left'
                    className='custom-drawer'
                    title="ЕСУТД"
                >
                    <Menu 
                        theme='dark' 
                        items={items}  
                        defaultSelectedKeys={['1']} 
                        mode='inline' 
                        className="menu"
                        onClick={() => {
                            setOpenMenu(false)
                        }}
                    />
                </Drawer>
                <h1 className="header_title">ЕСУТД</h1>
            </div>
            <Button type='text' className="header_logout">
                <MaterialSymbol icon='logout' size={24} color='#fff' />
            </Button>
        </header>
    )
}

export default Header
