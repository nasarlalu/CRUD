import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import Create from '../crud-components/create'
import Read from '../crud-components/read'
import Update from '../crud-components/update'
import Delete from '../crud-components/delete'
import { GoPersonAdd } from 'react-icons/go'
import { SiDarkreader } from 'react-icons/si'
import { LiaUserEditSolid } from 'react-icons/lia'
import { AiOutlineDelete } from 'react-icons/ai'


const Home = () => {

    const tabs = ['create', 'read', 'update', 'delete'];
    const [selectedTab, setSelectedTab] = useState('create')
    const [isActive, setIsActive] = useState('')

    const handleActiveTabMob = (tabName) => {

        if (tabName === selectedTab) {
            setIsActive('isActive')
        }
    }

    const handleTabClick = (tabName) => {
        setSelectedTab(tabName);
    };

    const getTabClassName = (tabName) => {
        if (tabName === selectedTab) {
            return `${tabName}Tab activeTabBg`;
        } else {
            return `${tabName}Tab`;
        }
    };

    const getTabCntrClassName = (tabName) => {
        if (tabName === selectedTab) {
            return `${tabName}TabCntr activeTabBgCntr`;
        } else {
            return `${tabName}TabCntr`;
        }
    };

    return (
        <section className='RootPage'>
            <div className='root-container'>

                <div className='tabMenu'>
                    <ul className={selectedTab}>
                        {tabs.map(tabName => (
                            <div key={tabName} className={getTabCntrClassName(tabName)}>
                                <li className={getTabClassName(tabName)} onClick={() => handleTabClick(tabName)}>
                                    {tabName === 'create' && <GoPersonAdd />}
                                    {tabName === 'read' && <SiDarkreader />}
                                    {tabName === 'update' && <LiaUserEditSolid />}
                                    {tabName === 'delete' && <AiOutlineDelete />}
                                    {tabName.charAt(0).toUpperCase() + tabName.slice(1)}
                                </li>
                            </div>
                        ))}
                    </ul>
                </div >

                <div className='tabMenuMob'>
                    <ul>
                        {tabs.map(tabName => (
                            <div key={tabName} className={'mobTabCntr'}>

                                <li
                                    className={isActive}
                                    onClick={() => handleTabClick(tabName)}
                                >
                                    {tabName === 'create' && <GoPersonAdd />}
                                    {tabName === 'read' && <SiDarkreader />}
                                    {tabName === 'update' && <LiaUserEditSolid />}
                                    {tabName === 'delete' && <AiOutlineDelete />}
                                </li>
                            </div>
                        ))}
                    </ul>
                </div >

                <div className='tabContent scrollBarHidden'>
                    {selectedTab == 'create' ? <Create /> : ''}
                    {selectedTab == 'read' ? <Read /> : ''}
                    {selectedTab == 'update' ? <Update /> : ''}
                    {selectedTab == 'delete' ? <Delete /> : ''}
                </div>

            </div >

        </section >
    );
}

export default Home;