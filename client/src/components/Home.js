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

    const [selectedTab, setSelectedTab] = useState('create');

    const handleTabClick = (tabName) => {
        setSelectedTab(tabName);
    };


    return (
        <section className='RootPage'>
            <div className='root-container'>

                <div className='tabMenu'>
                    <ul>
                        <div className={selectedTab == 'create' ? 'activeTabCntr' : ''} onClick={() => handleTabClick('create')}>
                            <li className={selectedTab == 'create' ? 'activeTabBg' : ''}><GoPersonAdd /> Create </li>
                        </div>

                        <div className={selectedTab == 'read' ? 'activeTabCntr' : ''} onClick={() => handleTabClick('read')}>
                            <li className={selectedTab == 'read' ? 'activeTabBg' : ''}><SiDarkreader />Read</li>
                        </div>

                        <div className={selectedTab == 'update' ? 'activeTabCntr' : ''} onClick={() => handleTabClick('update')}>
                            <li className={selectedTab == 'update' ? 'activeTabBg' : ''}><LiaUserEditSolid />Update</li>
                        </div>

                        <div className={selectedTab == 'delete' ? 'activeTabCntr' : ''} onClick={() => handleTabClick('delete')}>
                            <li className={selectedTab == 'delete' ? 'activeTabBg' : ''}><AiOutlineDelete />Delete</li>
                        </div>

                    </ul >
                </div >

                <div className='tabContent'>
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