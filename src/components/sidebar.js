import React from 'react'
import './sidebar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUser, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'

export default function SideBar(props) {
    return (
        <div>
            <div className="sidenav">
                <a href="#beranda"><FontAwesomeIcon icon={faHome} /> Beranda</a>
                <a href="#personelList" style={{"color":"turquoise"}}><FontAwesomeIcon icon={faUser} /> Personel List</a>
                <a href="#dailyAttendance"><FontAwesomeIcon icon={faCalendarAlt} /> Daily Attendance</a>
            </div>
        </div>
    )
}
