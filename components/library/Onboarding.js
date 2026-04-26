"use client";
import { useEffect, useState } from "react";

function ReadrIcon() {
  return (
    <svg width="120" height="120" viewBox="0 0 60 60" fill="none" aria-hidden="true">
      <path d="M9 33.5C9 25.5488 9 21.5732 10.8096 18.6632C11.7816 17.1001 13.1001 15.7816 14.6632 14.8096C17.5732 13 21.5488 13 29.5 13H30.5C38.4512 13 42.4268 13 45.3368 14.8096C46.8999 15.7816 48.2184 17.1001 49.1904 18.6632C51 21.5732 51 25.5488 51 33.5C51 41.4512 51 45.4268 49.1904 48.3368C48.2184 49.8999 46.8999 51.2184 45.3368 52.1904C42.4268 54 38.4512 54 30.5 54H29.5C21.5488 54 17.5732 54 14.6632 52.1904C13.1001 51.2184 11.7816 49.8999 10.8096 48.3368C9 45.4268 9 41.4512 9 33.5Z" fill="#6F7CF2"/>
      <path d="M51 33.5C51 41.4512 51 45.4269 49.1904 48.3369C48.2185 49.8999 46.8999 51.2185 45.3369 52.1904C42.4269 54 38.4512 54 30.5 54H29.5C21.5488 54 17.5731 54 14.6631 52.1904C13.1 51.2185 11.7815 49.8999 10.8096 48.3369C8.99999 45.4269 8.99999 41.4512 8.99999 33.5C8.99999 33.1594 9.00083 32.8262 9.00097 32.5C9.00415 39.7898 9.07749 43.5515 10.8096 46.3369C11.7815 47.8999 13.1 49.2185 14.6631 50.1904C17.5731 52 21.5488 52 29.5 52H30.5C38.4512 52 42.4269 52 45.3369 50.1904C46.8999 49.2185 48.2185 47.8999 49.1904 46.3369C50.9225 43.5515 50.9949 39.7898 50.998 32.5C50.9982 32.8262 51 33.1594 51 33.5Z" fill="#4959E6"/>
      <path d="M34.2 54H29.5C21.5488 54 17.5732 54 14.6632 52.1904C13.1001 51.2184 11.7816 49.8999 10.8096 48.3368C9 45.4268 9 41.4512 9 33.5C9 25.5488 9 21.5732 10.8096 18.6632C11.7816 17.1001 13.1001 15.7816 14.6632 14.8096C17.5732 13 21.5488 13 29.5 13H30.5C38.4512 13 42.4268 13 45.3368 14.8096C46.8999 15.7816 48.2184 17.1001 49.1904 18.6632C51 21.5732 51 25.5488 51 33.5V41.4C51 41.9571 51 42.2357 50.9907 42.4711C50.7449 48.7286 45.7286 53.7449 39.4711 53.9907C39.2356 54 38.9571 54 38.4 54" stroke="#131860" strokeLinecap="round"/>
      <path d="M28 17.75H32C35.3056 17.75 37.7189 17.7512 39.585 17.9717C41.4345 18.1903 42.649 18.6154 43.5996 19.3955C43.9667 19.6967 44.3033 20.0333 44.6045 20.4004C45.3846 21.351 45.8097 22.5655 46.0283 24.415C46.2488 26.2811 46.25 28.6944 46.25 32C46.25 35.3056 46.2488 37.7189 46.0283 39.585C45.8097 41.4345 45.3846 42.649 44.6045 43.5996C44.3033 43.9667 43.9667 44.3033 43.5996 44.6045C42.649 45.3846 41.4345 45.8097 39.585 46.0283C37.7189 46.2488 35.3056 46.25 32 46.25H28C24.6944 46.25 22.2811 46.2488 20.415 46.0283C18.5655 45.8097 17.351 45.3846 16.4004 44.6045C16.0333 44.3033 15.6967 43.9667 15.3955 43.5996C14.6154 42.649 14.1903 41.4345 13.9717 39.585C13.7512 37.7189 13.75 35.3056 13.75 32C13.75 28.6944 13.7512 26.2811 13.9717 24.415C14.1903 22.5655 14.6154 21.351 15.3955 20.4004C15.6967 20.0333 16.0333 19.6967 16.4004 19.3955C17.351 18.6154 18.5655 18.1903 20.415 17.9717C22.2811 17.7512 24.6944 17.75 28 17.75Z" fill="#E8EAFD" stroke="#C1C7FB" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M28 17L32 17C38.575 17 41.8624 17 44.0751 18.8159C44.4802 19.1484 44.8516 19.5198 45.1841 19.9249C47 22.1376 47 25.425 47 32C47 38.575 47 41.8624 45.1841 44.0751C44.8516 44.4802 44.4802 44.8516 44.0751 45.1841C41.8624 47 38.575 47 32 47H28C21.425 47 18.1376 47 15.9249 45.1841C15.5198 44.8516 15.1484 44.4802 14.8159 44.0751C13 41.8624 13 38.575 13 32L13 28C13 25.2089 13 23.8133 13.3445 22.6777C14.1201 20.1209 16.1209 18.1201 18.6777 17.3445C19.8133 17 21.2089 17 24 17" stroke="#131860" strokeLinecap="round"/>
      <path d="M36 33C36 34.5913 35.3679 36.1174 34.2426 37.2426C33.1174 38.3679 31.5913 39 30 39C28.4087 39 26.8826 38.3679 25.7574 37.2426C24.6321 36.1174 24 34.5913 24 33" stroke="#131860" strokeLinecap="round"/>
      <path d="M34 28C34 27.4696 34.2107 26.9609 34.5858 26.5858C34.9609 26.2107 35.4696 26 36 26C36.5304 26 37.0391 26.2107 37.4142 26.5858C37.7893 26.9609 38 27.4696 38 28" stroke="#131860" strokeLinecap="round"/>
      <path d="M22 28C22 27.4696 22.2107 26.9609 22.5858 26.5858C22.9609 26.2107 23.4696 26 24 26C24.5304 26 25.0391 26.2107 25.4142 26.5858C25.7893 26.9609 26 27.4696 26 28" stroke="#131860" strokeLinecap="round"/>
      <path d="M21 13C21 11.3431 22.3431 10 24 10H36C37.6569 10 39 11.3431 39 13H21Z" fill="#C1C7FB" stroke="#131860" strokeLinecap="round"/>
      <path d="M6 30C6 28.3431 7.34315 27 9 27V39C7.34315 39 6 37.6569 6 36V30Z" fill="#C1C7FB" stroke="#131860" strokeLinecap="round"/>
      <path d="M51 27C52.6569 27 54 28.3431 54 30V36C54 37.6569 52.6569 39 51 39V27Z" fill="#C1C7FB" stroke="#131860" strokeLinecap="round"/>
      <circle cx="30" cy="5" r="2" fill="#E63946" stroke="#131860" strokeLinecap="round"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M21 49C21.5523 49 22 49.4477 22 50C22 50.5523 21.5523 51 21 51C20.4477 51 20 50.5523 20 50C20 49.4477 20.4477 49 21 49ZM24 49C24.5523 49 25 49.4477 25 50C25 50.5523 24.5523 51 24 51C23.4477 51 23 50.5523 23 50C23 49.4477 23.4477 49 24 49Z" fill="#131860"/>
    </svg>
  );
}

function TrackingIcon() {
  return (
    <svg width="120" height="120" viewBox="0 0 60 60" fill="none" aria-hidden="true">
      <path d="M12 14C12 11.7909 13.7909 10 16 10H44C46.2091 10 48 11.7909 48 14V50C48 52.2091 46.2091 54 44 54H16C13.7909 54 12 52.2091 12 50V14Z" fill="#9BA5F8"/>
      <path d="M12 10C12 7.79086 13.7909 6 16 6L44 6C46.2091 6 48 7.79086 48 10V48C48 50.2091 46.2091 52 44 52H16C13.7909 52 12 50.2091 12 48V10Z" fill="#F4F5FF"/>
      <path d="M12 12H48V14H12L12 12Z" fill="#C1C7FB"/>
      <path d="M17.8766 52H44C46.2091 52 48 50.2091 48 48V10C48 7.79086 46.2091 6 44 6L16 6C13.7909 6 12 7.79086 12 10V48C12 50.2091 13.7909 52 16 52" stroke="#131860" strokeLinecap="round"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M26.5607 22.4393C27.1464 23.0251 27.1464 23.9749 26.5607 24.5607L21.5607 29.5607C20.9749 30.1464 20.0251 30.1464 19.4393 29.5607L17.4393 27.5607C16.8536 26.9749 16.8536 26.0251 17.4393 25.4393C18.0251 24.8536 18.9749 24.8536 19.5607 25.4393L20.5 26.3787L24.4393 22.4393C25.0251 21.8536 25.9749 21.8536 26.5607 22.4393Z" fill="#6F7CF2" stroke="#131860" strokeLinejoin="round"/>
      <path d="M32 26H42" stroke="#131860" strokeWidth="3" strokeLinecap="round"/>
      <path d="M32 26H42" stroke="#C1C7FB" strokeLinecap="round"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M26.5607 34.4393C27.1464 35.0251 27.1464 35.9749 26.5607 36.5607L21.5607 41.5607C20.9749 42.1464 20.0251 42.1464 19.4393 41.5607L17.4393 39.5607C16.8536 38.9749 16.8536 38.0251 17.4393 37.4393C18.0251 36.8536 18.9749 36.8536 19.5607 37.4393L20.5 38.3787L24.4393 34.4393C25.0251 33.8536 25.9749 33.8536 26.5607 34.4393Z" fill="#6F7CF2" stroke="#131860" strokeLinejoin="round"/>
      <path d="M32 38H42" stroke="#131860" strokeWidth="3" strokeLinecap="round"/>
      <path d="M32 38H42" stroke="#C1C7FB" strokeLinecap="round"/>
      <path d="M12 10C12 7.79086 13.7909 6 16 6H44C46.2091 6 48 7.79086 48 10V12H12V10Z" fill="#9BA5F8"/>
      <path d="M48 12H21M12 12H17" stroke="#131860" strokeLinecap="round"/>
      <path d="M37 54H16C13.7909 54 12 52.2091 12 50V10C12 7.79086 13.7909 6 16 6H44C46.2091 6 48 7.79552 48 10.0047C48 25.0391 48 34.9609 48 49.9953C48 52.2045 46.2091 54 44 54H41" stroke="#131860" strokeLinecap="round"/>
      <path d="M15 8H23" stroke="#F4F5FF" strokeLinecap="round"/>
      <path d="M25 8H26" stroke="#F4F5FF" strokeLinecap="round"/>
    </svg>
  );
}

function ScanIcon() {
  return (
    <svg width="120" height="120" viewBox="0 0 60 60" fill="none" aria-hidden="true">
      <path d="M17 9C17 7.34315 18.3431 6 20 6H40C41.6569 6 43 7.34315 43 9V51C43 52.6569 41.6569 54 40 54H20C18.3431 54 17 52.6569 17 51V9Z" fill="#C1C7FB"/>
      <path d="M19 14C19 12.3431 20.3431 11 22 11H38C39.6569 11 41 12.3431 41 14V46C41 47.6569 39.6569 49 38 49H22C20.3431 49 19 47.6569 19 46V14Z" fill="#F4F5FF"/>
      <path d="M21 15C21 13.8954 21.8954 13 23 13H25C26.1046 13 27 13.8954 27 15V45C27 46.1046 26.1046 47 25 47H23C21.8954 47 21 46.1046 21 45V15Z" fill="#6F7CF2" stroke="#131860" strokeLinecap="round"/>
      <path d="M27 15C27 13.8954 27.8954 13 29 13H31C32.1046 13 33 13.8954 33 15V45C33 46.1046 32.1046 47 31 47H29C27.8954 47 27 46.1046 27 45V15Z" fill="#9BA5F8" stroke="#131860" strokeLinecap="round"/>
      <path d="M33 15C33 13.8954 33.8954 13 35 13H37C38.1046 13 39 13.8954 39 15V45C39 46.1046 38.1046 47 37 47H35C33.8954 47 33 46.1046 33 45V15Z" fill="#4959E6" stroke="#131860" strokeLinecap="round"/>
      <path d="M45 15C45 13.8954 45.8954 13 47 13H49C50.1046 13 51 13.8954 51 15V45C51 46.1046 50.1046 47 49 47H47C45.8954 47 45 46.1046 45 45V15Z" fill="#E8EAFD" stroke="#C1C7FB" strokeLinecap="round"/>
      <path d="M3 15C3 13.8954 3.89543 13 5 13H7C8.10457 13 9 13.8954 9 15V45C9 46.1046 8.10457 47 7 47H5C3.89543 47 3 46.1046 3 45V15Z" fill="#E8EAFD" stroke="#C1C7FB" strokeLinecap="round"/>
      <path d="M51 15C51 13.8954 51.8954 13 53 13H55C56.1046 13 57 13.8954 57 15V45C57 46.1046 56.1046 47 55 47H53C51.8954 47 51 46.1046 51 45V15Z" fill="#E8EAFD" stroke="#C1C7FB" strokeLinecap="round"/>
      <path d="M9 15C9 13.8954 9.89543 13 11 13H13C14.1046 13 15 13.8954 15 15V45C15 46.1046 14.1046 47 13 47H11C9.89543 47 9 46.1046 9 45V15Z" fill="#E8EAFD" stroke="#C1C7FB" strokeLinecap="round"/>
      <path d="M35 54H20C18.3431 54 17 52.6569 17 51V9C17 7.34315 18.3431 6 20 6H40C41.6569 6 43 7.34315 43 9V51C43 52.6569 41.6569 54 40 54H39" stroke="#131860" strokeLinecap="round"/>
      <path d="M26 6H35C35 7.10457 34.1046 8 33 8H28C26.8954 8 26 7.10457 26 6Z" fill="#6F7CF2" stroke="#131860" strokeLinecap="round"/>
      <path d="M22 11C20.3431 11 19 12.3431 19 14M38 11C39.6569 11 41 12.3431 41 14M41 46C41 47.6569 39.6569 49 38 49M22 49C20.3431 49 19 47.6569 19 46" stroke="#131860" strokeWidth="0.5" strokeLinecap="round"/>
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg width="120" height="120" viewBox="0 0 60 60" fill="none" aria-hidden="true">
      <path d="M28 9C28 7.34315 29.3431 6 31 6H51C52.6569 6 54 7.34315 54 9V51C54 52.6569 52.6569 54 51 54H31C29.3431 54 28 52.6569 28 51V9Z" fill="#C1C7FB"/>
      <path d="M6 18C6 16.8954 6.89543 16 8 16H52C53.1046 16 54 16.8954 54 18V48C54 49.1046 53.1046 50 52 50H33C32.4477 50 32 50.4477 32 51C32 51.5523 31.5523 52 31 52H29C28.4477 52 28 51.5523 28 51C28 50.4477 27.5523 50 27 50H8C6.89543 50 6 49.1046 6 48V18Z" fill="#6F7CF2"/>
      <path d="M13 50H8C6.89543 50 6 49.1046 6 48V18C6 16.8954 6.89543 16 8 16H52C53.1046 16 54 16.8954 54 18V48C54 49.1046 53.1046 50 52 50H33C32.4477 50 32 50.4477 32 51C32 51.5523 31.5523 52 31 52H29C28.4477 52 28 51.5523 28 51C28 50.4477 27.5523 50 27 50H17" stroke="#131860" strokeLinecap="round"/>
      <path d="M51 13C51.5523 13 52 13.4477 52 14V47C52 47.5523 51.5523 48 51 48H33C31.3431 48 30 49.3431 30 51V16C30 14.3431 31.3431 13 33 13H51Z" fill="#9BA5F8"/>
      <path d="M49 13H51C51.5523 13 52 13.4477 52 14V47C52 47.5523 51.5523 48 51 48H33C31.3431 48 30 49.3431 30 51V16C30 14.3431 31.3431 13 33 13H45" stroke="#131860" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 13C8.44772 13 8 13.4477 8 14V47C8 47.5523 8.44772 48 9 48H27C28.6569 48 30 49.3431 30 51V16C30 14.3431 28.6569 13 27 13H9Z" fill="#F4F5FF" stroke="#131860" strokeLinejoin="round"/>
      <path d="M12 19H26" stroke="#C1C7FB" strokeLinecap="round"/>
      <path d="M18 22H26" stroke="#C1C7FB" strokeLinecap="round"/>
      <path d="M12 22H16" stroke="#C1C7FB" strokeLinecap="round"/>
      <path d="M12 25H13" stroke="#C1C7FB" strokeLinecap="round"/>
      <path d="M15 25H21" stroke="#C1C7FB" strokeLinecap="round"/>
      <path d="M23 25H26" stroke="#C1C7FB" strokeLinecap="round"/>
      <path d="M12 28H18" stroke="#C1C7FB" strokeLinecap="round"/>
      <path d="M12 34H26" stroke="#C1C7FB" strokeLinecap="round"/>
      <path d="M18 31H26" stroke="#C1C7FB" strokeLinecap="round"/>
      <path d="M12 31H16" stroke="#C1C7FB" strokeLinecap="round"/>
      <path d="M12 37H13" stroke="#C1C7FB" strokeLinecap="round"/>
      <path d="M15 37H21" stroke="#C1C7FB" strokeLinecap="round"/>
      <path d="M23 37H26" stroke="#C1C7FB" strokeLinecap="round"/>
      <path d="M12 40H18" stroke="#C1C7FB" strokeLinecap="round"/>
      <path d="M20 28H26" stroke="#C1C7FB" strokeLinecap="round"/>
      <path d="M20 40H26" stroke="#C1C7FB" strokeLinecap="round"/>
      <path d="M46 54H31C29.3431 54 28 52.6569 28 51V9C28 7.34315 29.3431 6 31 6H51C52.6569 6 54 7.34315 54 9V51C54 52.6569 52.6569 54 51 54H50" stroke="#131860" strokeLinecap="round"/>
      <path d="M37 6H46C46 7.10457 45.1046 8 44 8H39C37.8954 8 37 7.10457 37 6Z" fill="#6F7CF2" stroke="#131860" strokeLinecap="round"/>
      <rect x="32" y="22" width="18" height="15" rx="2" fill="#F4F5FF"/>
      <path d="M34 25H48" stroke="#3646D4" strokeLinecap="round"/>
      <path d="M34 19H48" stroke="#6F7CF2" strokeLinecap="round"/>
      <path d="M34 40H40" stroke="#6F7CF2" strokeLinecap="round"/>
      <path d="M42 40H48" stroke="#6F7CF2" strokeLinecap="round"/>
      <path d="M34 28H38" stroke="#3646D4" strokeLinecap="round"/>
      <path d="M40 28H48" stroke="#3646D4" strokeLinecap="round"/>
      <path d="M34 31H35" stroke="#3646D4" strokeLinecap="round"/>
      <path d="M37 31H43" stroke="#C1C7FB" strokeLinecap="round"/>
      <path d="M45 31H48" stroke="#C1C7FB" strokeLinecap="round"/>
      <path d="M34 34H40" stroke="#C1C7FB" strokeLinecap="round"/>
      <path d="M48 22C49.1046 22 50 22.8954 50 24M50 35C50 36.1046 49.1046 37 48 37M34 37C32.8954 37 32 36.1046 32 35M32 24C32 22.8954 32.8954 22 34 22" stroke="#131860" strokeWidth="0.5" strokeLinecap="round"/>
    </svg>
  );
}

function WordsIcon() {
  return (
    <svg width="120" height="120" viewBox="0 0 60 60" fill="none" aria-hidden="true">
      <path d="M6 21C6 19.8954 6.89543 19 8 19H52C53.1046 19 54 19.8954 54 21V51C54 52.1046 53.1046 53 52 53H33C32.4477 53 32 53.4477 32 54C32 54.5523 31.5523 55 31 55H29C28.4477 55 28 54.5523 28 54C28 53.4477 27.5523 53 27 53H8C6.89543 53 6 52.1046 6 51V21Z" fill="#E8EAFD"/>
      <path d="M32 36L50 54" stroke="#E8EAFD" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 18C6 16.8954 6.89543 16 8 16H52C53.1046 16 54 16.8954 54 18V33V48C54 49.1046 53.1046 50 52 50H43H33C32.4477 50 32 50.4477 32 51C32 51.5523 31.5523 52 31 52H29C28.4477 52 28 51.5523 28 51C28 50.4477 27.5523 50 27 50H8C6.89543 50 6 49.1046 6 48V18Z" fill="#6F7CF2"/>
      <path d="M13 50H8C6.89543 50 6 49.1046 6 48V18C6 16.8954 6.89543 16 8 16H52C53.1046 16 54 16.8954 54 18V22M17 50H27C27.5523 50 28 50.4477 28 51C28 51.5523 28.4477 52 29 52H31C31.5523 52 32 51.5523 32 51C32 50.4477 32.4477 50 33 50H52C53.1046 50 54 49.1046 54 48V26" stroke="#131860" strokeLinecap="round"/>
      <path d="M51 13C51.5523 13 52 13.4477 52 14V47C52 47.5523 51.5523 48 51 48H33C31.3431 48 30 49.3431 30 51V16C30 14.3431 31.3431 13 33 13H51Z" fill="#F4F5FF"/>
      <path d="M9 13C8.44772 13 8 13.4477 8 14V47C8 47.5523 8.44772 48 9 48H27C28.6569 48 30 49.3431 30 51V16C30 14.3431 28.6569 13 27 13H9Z" fill="#F4F5FF"/>
      <path d="M9 13C8.44772 13 8 13.4477 8 14V47C8 47.5523 8.44772 48 9 48H27C28.6569 48 30 49.3431 30 51V16C30 14.3431 28.6569 13 27 13H9Z" stroke="#131860" strokeLinejoin="round"/>
      <path d="M49 13H51C51.5523 13 52 13.4477 52 14V47C52 47.5523 51.5523 48 51 48H33C31.3431 48 30 49.3431 30 51V16C30 14.3431 31.3431 13 33 13H45" stroke="#131860" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M34 19H48" stroke="#C1C7FB" strokeLinecap="round"/>
      <path d="M40 22H48" stroke="#C1C7FB" strokeLinecap="round"/>
      <path d="M34 22H38" stroke="#C1C7FB" strokeLinecap="round"/>
      <path d="M34 25H48" stroke="#C1C7FB" strokeLinecap="round"/>
      <path d="M34 28H37" stroke="#C1C7FB" strokeLinecap="round"/>
      <path d="M12 19H26" stroke="#C1C7FB" strokeLinecap="round"/>
      <path d="M18 22H26" stroke="#C1C7FB" strokeLinecap="round"/>
      <path d="M12 22H16" stroke="#C1C7FB" strokeLinecap="round"/>
      <path d="M12 25H13" stroke="#C1C7FB" strokeLinecap="round"/>
      <path d="M15 25H21" stroke="#C1C7FB" strokeLinecap="round"/>
      <path d="M23 25H26" stroke="#C1C7FB" strokeLinecap="round"/>
      <path d="M12 28H18" stroke="#C1C7FB" strokeLinecap="round"/>
      <path d="M12 34H26" stroke="#C1C7FB" strokeLinecap="round"/>
      <path d="M18 31H26" stroke="#C1C7FB" strokeLinecap="round"/>
      <path d="M12 31H16" stroke="#C1C7FB" strokeLinecap="round"/>
      <path d="M12 37H13" stroke="#C1C7FB" strokeLinecap="round"/>
      <path d="M15 37H21" stroke="#C1C7FB" strokeLinecap="round"/>
      <path d="M23 37H26" stroke="#C1C7FB" strokeLinecap="round"/>
      <path d="M12 40H18" stroke="#C1C7FB" strokeLinecap="round"/>
      <path d="M20 28H26" stroke="#C1C7FB" strokeLinecap="round"/>
      <path d="M20 40H26" stroke="#C1C7FB" strokeLinecap="round"/>
      <path d="M34 33L52 51" stroke="#131860" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M34 33L52 51" stroke="#6F7CF2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M46 45L52 51" stroke="#9BA5F8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="34" cy="33" r="10" fill="#E8EAFD"/>
      <path d="M34 23C39.5229 23 44 27.4772 44 33C44 33.261 43.9865 33.5194 43.9668 33.7754C43.599 29.4203 39.9503 26 35.5 26C30.8056 26 27 29.8056 27 34.5C27 38.9503 30.4203 42.599 34.7754 42.9668C34.5194 42.9864 34.261 43 34 43C28.4772 43 24 38.5228 24 33C24 27.4772 28.4772 23 34 23Z" fill="#C1C7FB"/>
      <path d="M34 21C40.6274 21 46 26.3726 46 33C46 39.6274 40.6274 45 34 45C27.3726 45 22 39.6274 22 33C22 26.3726 27.3726 21 34 21ZM34 24C29.0295 24 25 28.0294 25 33C25 37.9706 29.0295 42 34 42C38.9706 42 43 37.9706 43 33C43 28.0294 38.9706 24 34 24Z" fill="#9BA5F8"/>
      <path d="M35.5628 41.8633C33.3085 42.2608 30.9874 41.7843 29.0719 40.5309C27.1565 39.2774 25.7906 37.3412 25.2524 35.1163C24.7141 32.8913 25.0439 30.5449 26.1745 28.5545C27.3052 26.5641 29.1519 25.0794 31.3386 24.4025C33.5254 23.7256 35.8879 23.9074 37.9453 24.9109C40.0028 25.9143 41.6005 27.6641 42.4134 29.804C43.2263 31.944 43.1932 34.3132 42.3209 36.4296C41.4486 38.546 39.8026 40.2505 37.7179 41.1962" stroke="#131860" strokeLinecap="round"/>
      <path d="M25.5148 24.5147C27.6499 22.3795 30.5116 21.1278 33.5289 21.0093C36.5462 20.8907 39.4973 21.914 41.7934 23.8751C44.0895 25.8362 45.5619 28.5909 45.9169 31.5896C46.2718 34.5882 45.4831 37.6105 43.7082 40.0534C41.9333 42.4963 39.3027 44.1803 36.3411 44.7694C33.3795 45.3585 30.3047 44.8094 27.73 43.2317C25.1554 41.6539 23.2702 39.1635 22.4506 36.2573C21.6309 33.351 21.9371 30.2426 23.308 27.5521" stroke="#131860" strokeLinecap="round"/>
      <path d="M29 33L35 33" stroke="#131860" strokeWidth="3" strokeLinecap="round"/>
      <path d="M29 33L35 33" stroke="#9BA5F8" strokeLinecap="round"/>
      <path d="M38 33L41 33" stroke="#9BA5F8" strokeLinecap="round"/>
      <path d="M29 37L34 37" stroke="#9BA5F8" strokeLinecap="round"/>
      <path d="M36 37L39 37" stroke="#9BA5F8" strokeLinecap="round"/>
      <path d="M33 29L39 29" stroke="#9BA5F8" strokeLinecap="round"/>
      <path d="M29 29L31 29" stroke="#9BA5F8" strokeLinecap="round"/>
    </svg>
  );
}

function DataControlIcon() {
  return (
    <svg width="120" height="120" viewBox="0 0 60 60" fill="none" aria-hidden="true">
      <path d="M50 48C50 48.7879 49.4826 49.568 48.4775 50.2959C47.4725 51.0238 45.9995 51.6851 44.1426 52.2422C42.2854 52.7993 40.0798 53.2414 37.6533 53.543C35.2269 53.8445 32.6263 54 30 54C27.3737 54 24.7731 53.8445 22.3467 53.543C19.9202 53.2414 17.7146 52.7993 15.8574 52.2422C14.0005 51.6851 12.5275 51.0238 11.5225 50.2959C10.5801 49.6134 10.0663 48.8851 10.0059 48.1475L10 48V38H50V48Z" fill="#9BA5F8"/>
      <path d="M14 47L14.0059 47.1475C14.0663 47.8851 14.5801 48.6134 15.5225 49.2959C16.5275 50.0238 18.0005 50.6851 19.8574 51.2422C21.7146 51.7993 23.9202 52.2414 26.3467 52.543C28.7731 52.8445 31.3737 53 34 53C36.6263 53 39.2269 52.8445 41.6533 52.543C42.7146 52.4111 43.7331 52.2499 44.6992 52.0664C44.5176 52.1255 44.3324 52.1853 44.1426 52.2422C42.2854 52.7993 40.0798 53.2414 37.6533 53.543C35.2269 53.8445 32.6263 54 30 54C27.3737 54 24.7731 53.8445 22.3467 53.543C19.9202 53.2414 17.7146 52.7993 15.8574 52.2422C14.0005 51.6851 12.5275 51.0238 11.5225 50.2959C10.5801 49.6134 10.0663 48.8851 10.0059 48.1475L10 48V38H14V47Z" fill="#6F7CF2"/>
      <path d="M10 38V48L10.0059 48.1475C10.0663 48.8851 10.5801 49.6134 11.5225 50.2959C12.5275 51.0238 14.0005 51.6851 15.8574 52.2422C17.7146 52.7993 19.9202 53.2414 22.3467 53.543C24.7731 53.8445 27.3737 54 30 54C32.6263 54 35.2269 53.8445 37.6533 53.543C40.0798 53.2414 42.2854 52.7993 44.1426 52.2422C45.9995 51.6851 47.4725 51.0238 48.4775 50.2959C49.4826 49.568 50 48.7879 50 48V38" stroke="#131860"/>
      <ellipse cx="30" cy="38" rx="20" ry="6" fill="#6F7CF2"/>
      <path d="M40 43.1962C35.5946 43.9592 30.3855 44.19 25.433 43.8415C20.4804 43.493 16.1566 42.5915 13.3416 41.3203C10.5265 40.0492 9.43174 38.5041 10.2801 36.9994C11.1284 35.4947 13.8561 34.1435 17.908 33.2208C21.9599 32.2982 27.0315 31.8733 32.0906 32.0329C37.1496 32.1924 41.816 32.9242 45.1399 34.0795C48.4638 35.2347 50.1955 36.7265 49.9825 38.2513C49.7694 39.776 47.6277 41.2191 43.9933 42.2868" stroke="#131860" strokeLinecap="round"/>
      <path d="M50 33C50 33.7879 49.4826 34.568 48.4775 35.2959C47.4725 36.0238 45.9995 36.6851 44.1426 37.2422C42.2854 37.7993 40.0798 38.2414 37.6533 38.543C35.2269 38.8445 32.6263 39 30 39C27.3737 39 24.7731 38.8445 22.3467 38.543C19.9202 38.2414 17.7146 37.7993 15.8574 37.2422C14.0005 36.6851 12.5275 36.0238 11.5225 35.2959C10.5801 34.6134 10.0663 33.8851 10.0059 33.1475L10 33V23H50V33Z" fill="#F4F5FF"/>
      <path d="M14 32L14.0059 32.1475C14.0663 32.8851 14.5801 33.6134 15.5225 34.2959C16.5275 35.0238 18.0005 35.6851 19.8574 36.2422C21.7146 36.7993 23.9202 37.2414 26.3467 37.543C28.7731 37.8445 31.3737 38 34 38C36.6263 38 39.2269 37.8445 41.6533 37.543C42.7146 37.4111 43.7331 37.2499 44.6992 37.0664C44.5176 37.1255 44.3324 37.1853 44.1426 37.2422C42.2854 37.7993 40.0798 38.2414 37.6533 38.543C35.2269 38.8445 32.6263 39 30 39C27.3737 39 24.7731 38.8445 22.3467 38.543C19.9202 38.2414 17.7146 37.7993 15.8574 37.2422C14.0005 36.6851 12.5275 36.0238 11.5225 35.2959C10.5801 34.6134 10.0663 33.8851 10.0059 33.1475L10 33V23H14V32Z" fill="#E8EAFD"/>
      <path d="M10 23V33L10.0059 33.1475C10.0663 33.8851 10.5801 34.6134 11.5225 35.2959C12.5275 36.0238 14.0005 36.6851 15.8574 37.2422C17.7146 37.7993 19.9202 38.2414 22.3467 38.543C24.7731 38.8445 27.3737 39 30 39C32.6263 39 35.2269 38.8445 37.6533 38.543C40.0798 38.2414 42.2854 37.7993 44.1426 37.2422C45.9995 36.6851 47.4725 36.0238 48.4775 35.2959C49.4826 34.568 50 33.7879 50 33V23" stroke="#131860"/>
      <ellipse cx="30" cy="23" rx="20" ry="6" fill="#E8EAFD"/>
      <path d="M14.6791 26.8567C11.4093 25.6877 9.74722 24.1888 10.0312 22.6651C10.3151 21.1414 12.5238 19.7074 16.2076 18.655C19.8914 17.6026 24.7736 17.0108 29.8604 17.0001C34.9472 16.9895 39.8564 17.5607 43.5888 18.5976C47.3213 19.6345 49.5964 21.0591 49.9513 22.5815C50.3061 24.1038 48.714 25.6095 45.4989 26.7922C42.2838 27.9748 37.6874 28.7455 32.6451 28.9473C27.6029 29.1491 22.4937 28.767 18.3575 27.8786" stroke="#131860" strokeLinecap="round"/>
      <path d="M38 21V13C38 11.3431 39.3431 10 41 10H44" stroke="#131860" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 21V13C22 11.3431 20.6569 10 19 10H16" stroke="#131860" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M30 24V7" stroke="#131860" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M46 23V19C46 17.8954 46.8954 17 48 17H53" stroke="#131860" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 23V19C14 17.8954 13.1046 17 12 17H7" stroke="#131860" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="44" cy="10" r="3" fill="#9BA5F8" stroke="#131860" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="16" cy="10" r="3" fill="#9BA5F8" stroke="#131860" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="30" cy="7" r="3" fill="#9BA5F8" stroke="#131860" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="53" cy="17" r="3" fill="#9BA5F8" stroke="#131860" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="7" cy="17" r="3" fill="#9BA5F8" stroke="#131860" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function Onboarding({ open, onClose, t }) {
  const [slide, setSlide] = useState(0);

  // Reset to slide 0 every time the modal is reopened
  useEffect(() => { if (open) setSlide(0); }, [open]);

  if (!open) return null;

  // Slide content driven by i18n. Slides without a custom icon fall back
  // to the 80×80 .ob-icon-placeholder. Replace each placeholder with the
  // corresponding designed SVG when ready.
  const SLIDES = [
    { title: t.obSlide1Title, desc: t.obSlide1Desc, icon: <ReadrIcon /> },
    { title: t.obSlide2Title, desc: t.obSlide2Desc, icon: <TrackingIcon /> },
    { title: t.obSlide3Title, desc: t.obSlide3Desc, icon: <ScanIcon /> },
    { title: t.obSlide4Title, desc: t.obSlide4Desc, icon: <QuoteIcon /> },
    { title: t.obSlide5Title, desc: t.obSlide5Desc, icon: <WordsIcon /> },
    { title: t.obSlide6Title, desc: t.obSlide6Desc, icon: <DataControlIcon /> },
  ];

  function next() {
    if (slide < SLIDES.length - 1) setSlide(s => s + 1);
    else onClose();
  }

  function prev() { setSlide(s => Math.max(s - 1, 0)); }

  const current = SLIDES[slide];
  const isLast  = slide === SLIDES.length - 1;

  return (
    <div className="ob-overlay open" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="ob-modal">
        <div className="ob-body">
          <div className="ob-slides">
            <div className="ob-icon">
              {current.icon || <div className="ob-icon-placeholder" aria-hidden="true" />}
            </div>
            <div className="ob-text">
              <h2 className="ob-title">{current.title}</h2>
              <p className="ob-desc">{current.desc}</p>
            </div>
            <div className="ob-dots">
              {SLIDES.map((_, i) => (
                <div key={i} className={`ob-dot${i === slide ? ' active' : ''}`} onClick={() => setSlide(i)} />
              ))}
            </div>
          </div>
        </div>

        <div className="ob-footer">
          <div className="ob-footer-nav">
            <div className="ob-footer-left">
              {!isLast && <button className="ob-skip" onClick={onClose}>{t.obSkip}</button>}
            </div>
            <div className="ob-footer-right">
              <button
                className="ob-prev"
                onClick={prev}
                style={{ visibility: slide === 0 ? 'hidden' : 'visible' }}>
                {t.obPrevious}
              </button>
              <button className="ob-next" onClick={next}>
                {isLast ? t.obGetStarted : t.obNext}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
