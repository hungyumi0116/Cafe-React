import { useState,useEffect} from 'react';

const useRWD=()=>{
    const [mobile,setMobile]=useState("mobile");

    const handleRWD=()=>{
        if(window.innerWidth>768 && window.innerWidth<=1440)
            setMobile("PC");
        else if (window.innerWidth>576)
            setMobile("tablet");
        else
            setMobile("mobile");
    }

    useEffect(()=>{
    
        window.addEventListener('resize',handleRWD);
        handleRWD(); //加入此行
        
        return(()=>{
            window.removeEventListener('resize',handleRWD);
        })
    },[]);

    return mobile;
}

export default useRWD;