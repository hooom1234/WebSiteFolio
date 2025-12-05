import React, { useState, useEffect } from 'react';
import { Snowfall } from '@namnguyenthanhwork/react-snowfall-effect';

// ตัวอักษร/รูปภาพที่คุณต้องการใช้เป็นเกล็ดหิมะ
// Note: เนื่องจาก images prop ต้องการ URL หรือ Base64, 
// เราจะใช้ snowflakeShape='star' สำหรับรูปดาว 
// และใช้ images array หากคุณมี URL/path ของรูปภาพจริงๆ
const CUSTOM_SNOWFLAKES = [
  // หากคุณต้องการใช้ Emojis เป็นเกล็ดหิมะ
  // '❄️', '🌟', '✨', 
  // แต่การใช้ built-in shape 'star' มักจะให้ประสิทธิภาพที่ดีกว่า
];

export default function ResponsiveSnowfall(props) {
  // ตั้งค่า Responsive Count
  const [count, setCount] = useState(130); 
  
  useEffect(() => {
    const updateSnowflakeCount = () => {
      if (window.innerWidth < 768) {
        // มือถือ: ลดเหลือ 40-50
        setCount(45); 
      } else if (window.innerWidth < 1200) {
        // แท็บเล็ต/เดสก์ท็อปกลาง: 80-100
        setCount(90);
      } else {
        // เดสก์ท็อปใหญ่: 130
        setCount(130);
      }
    };

    updateSnowflakeCount(); 
    window.addEventListener('resize', updateSnowflakeCount);

    return () => window.removeEventListener('resize', updateSnowflakeCount);
  }, []);

  // การตั้งค่าที่คุณต้องการ
  const customProps = {
    snowflakeCount: count, // ใช้ค่าที่ Responsive
    snowflakeShape: 'star', // Shape: star
    fps: 60,                // FPS: 60
    gravity: 1,             // Gravity: 1
    size: { min: 15, max: 25 }, // Size: 15-25
    speed: { min: 1, max: 3 }, // Speed: 1-3
    wind: { min: -1, max: 1 }, // Wind: -1-1
    colors: ['#ffffff', '#eeeeee', '#dddddd'], // Colors: 3 สีขาว/เทา
    // images: CUSTOM_SNOWFLAKES, // Uncomment หากคุณใช้รูปภาพภายนอก
  };

  return (
    <Snowfall 
      // ผสานรวม props ที่มาจากการตั้งค่า Responsive และ props ที่มาจาก Astro
      {...customProps}
      {...props} 
    />
  );
}