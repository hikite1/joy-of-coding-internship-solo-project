'use client';

import React from 'react'
import styled from 'styled-components';
import { useGlobalState } from '@/app/Context/globalProvider';
import Image from 'next/image';
import menu from '@/app/Utils/menu';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Button from '../Button/Button';
import { logout } from '@/app/Utils/icons';
import { UserButton, useClerk, useUser } from '@clerk/clerk-react';


const Sidebar = () => {
    const {theme} = useGlobalState();
    console.log(theme)
    const router = useRouter();
    const pathname = usePathname();
    const { signOut } = useClerk();
    const { user } = useUser();
    console.log(user);
    const { firstName, lastName,imageUrl } = user || { 
      firstName: '', 
      lastName: '',
      imageUrl: ''
    };

    const handleClick = (link: string) => {
      router.push(link);
    }

  return (
    <SidebarStyled theme={theme}>
      <div className="profile">
        <div className="profile-overlay"></div>
        <div className="image">
          <Image width={70} height={70} src={imageUrl} alt='profile'/>
        </div>
        <div className="user-btn absolute z-1 top-0 w-full h-full">
          <UserButton />
        </div>
        <h1 className='capitalize'>
          {firstName} {lastName}
        </h1>
      </div>
      <ul className="nav-items">
        {menu.map((item) => {
            const link= item.link;

          return (
            <li key={item.id} className={`nav-item ${pathname === link ? 'active' : ''}`} onClick={() => {
              handleClick(link)
            }}>
              {item.icon}
              <Link href={link}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
      <div className="sign-out relative m-6">
      <Button 
          name={'Sign Out'}
          type={'submit'}
          padding={'0.4rem 0.8rem'}
          borderRad={'0.8rem'}
          fw={'500'}
          fs={'1rem'}
          icon={logout}
          click={() =>{
            signOut(() => router.push('/signin'));
          }}
        />
      </div>
    </SidebarStyled>
  )
}

const SidebarStyled = styled.nav`
  position: relative;
  width: ${(props) => props.theme.sidebarWidth};
  background-color: ${(props) => props.theme.colorBg};
  border: 2px solid ${(props) => props.theme.borderColor};
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${(props) => props.theme.colorGrey3};

  .user-btn {
      .cl-rootBox {
        width: 100%;
        height: 100%;

        .cl-userButtonBox {
          width: 100%;
          height: 100%;

          .cl-userButtonTrigger {
            width: 100%;
            height: 100%;
            opacity: 0;
          }
        }
      }
  }

  .profile {
    margin: -.4rem;
    padding: 0.1rem 0.8rem;
    position: realtive;
    border-radius: 1rem;
    cursor: pointer;
    font-weight: 500;
    color: ${(props) => props.theme.colorGrey0};
    display: flex;
    align-items: center;

    .profile-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 17%;
      backdrop-filter: blur(10px);
      z-index: 0;
      background: ${(props) => props.theme.colorBg3};
      transition: all 0.55s linear;
      border-radius: 1rem;
      opacity: 0.2;
      border: 2px solid ${(props) => props.theme.borderColor2};
    }
    
    h1 {
      font-size: 1.2rem;
      display: flex;
      flex-direction: column;
      line-height: 1.5rem;
    }

    .image, 
    h1 {
      margin: 1.5rem;
      z-index: 1;
    } 

    .image {
      flex-shrink: 0;
      display: inline-block;
      overflow: hidden;
      transition: all 0.55s ease;
      border-radius: 100%;
      margin: .2rem;

      img {
        border-radius: 100%;
        transition: all 0.55s ease;
      }
    }

    > h1 {
      margin-left: .5rem;
      font-size: clamp(1.2rem, 4vw, 1.4rem);
      line-height: 100%;
    }

    &:hover {
      .profile-overlay {
        opacity: 1;
        border: 2px solid ${(props) => props.theme.borderColor2};
      }

      img {
        transform: scale(1.3);
      }
    }
  }

    /*controls the CSS for navbar items*/
  .nav-item {
    position: relative;
    padding: 0.5rem 0rem 1rem 2rem;
    margin: 0.3rem 0;
    display: grid;
    grid-template-columns: 40px 1fr;
    cursor: pointer;
    align-items: center;

    &::after {
      position: absolute;
      content: '';
      left: 0;
      top: 0;
      width: 0;
      height: 100%;
      background-color: ${(props) => props.theme.colorGreenDark};
      z-index: 1;
      transition: all 0.3s ease-in-out;
    }

    &::before {
      position: absolute;
      content: '';
      right: 0;
      top: 0;
      width: 0%;
      height: 100%;
      background-color: ${(props) => props.theme.colorWhite};
      border-bottom-left-radius: 5px;
      border-top-left-radius: 5px;
      z-index: 3;
    }

    a {
      font-weight: 500;
      transition: all 0.3s ease-in-out;
      z-index: 2;
    }

    i {
      display: flex;
      align-items: center;
      color: ${(props) => props.theme.colorIcons2};
      z-index: 3;
    }

    &:hover {
      &::after {
        width: 100%;
      }
    }
  }

  /*controls CSS for active navbar items*/
  .active {
    background-color: ${(props) => props.theme.colorPrimaryGreen};

    i, a {
      color: ${(props) => props.theme.colorIcons2};
    }
  }

  .active::before {
    width: 1rem;
  }
`;


export default Sidebar