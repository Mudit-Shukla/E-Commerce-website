import React from 'react';
import './header.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

export const Header = () => {

    const [wide, setWide] = useState("100%")

    return (
        <>
            <div className='overlay' style={ { width : wide}}>
                <CloseIcon className = 'close' onClick = {() => setWide("0%")}/>
                <div className='header'>
                    <div className='logo'>
                        <h1>Buy & Joy</h1>
                    </div>
                    <ul className='menu'>
                        <li className = 'navItem'>
                            <a href="/"> Home</a>
                        </li>
                        <li className = 'navItem'>
                            <a href="/"> Products</a>
                        </li>
                        <li className = 'navItem'>
                            <a href="/"> About Us</a>
                        </li>
                        <li className = 'navItem'>
                            <a href="/"> Contact</a>
                        </li>
                    </ul>
                    <ul className='icons'>
                        <SearchIcon className='icon'/>
                        <ShoppingBasketIcon className='icon'/>
                        <AccountCircleIcon className='icon'/>
                    </ul>
                </div>
            </div>
            <MenuIcon className='hamBurger' onClick = {() => setWide("100%")}/>
        </>
    );
};
