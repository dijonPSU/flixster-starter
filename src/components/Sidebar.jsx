import React from 'react';

export default function Sidebar({ activePage, setActivePage }) {
    return (
        <div className="sidebar">
            <div className="sidebar-nav">
                <ul>
                    <li className={activePage === 'home' ? 'active' : ''} onClick={() => setActivePage('home')}><span className="nav-text">Home</span></li>
                    <li className={activePage === 'favorites' ? 'active' : ''} onClick={() => setActivePage('favorites')}><span className="nav-text">Favorites</span></li>
                    <li className={activePage === 'watched' ? 'active' : ''} onClick={() => setActivePage('watched')}><span className="nav-text">Watched</span></li>
                </ul>
            </div>
        </div>
    );
}
