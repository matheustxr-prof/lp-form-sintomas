
import { useEffect, useState } from 'react';

export default function Header() {

    const [isSticky, setIsSticky] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => {
          const scrollTop = window.scrollY;
          if (scrollTop > 0) {
            setIsSticky(true);
            document.querySelector('header')?.classList.add('headerSticky')
          } else {
            setIsSticky(false);
            document.querySelector('header')?.classList.remove('headerSticky')
          }
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, [isSticky]);

    return(
        <header  className="h-[60px] w-full absolute top-0 z-50 flex justify-center transition-all">
            <h1 className="text-black ">Header</h1>
        </header>
    )
}