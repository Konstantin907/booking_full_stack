'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";


const Logo = () => {
    const router = useRouter()


    return (
        //jednostavno stavljamo da klikom na logo/znak prausmjeri na glavnu stranicu
        <h1
        onClick={()=>{router.push("/")}}
        className="cursor-pointer"
        >StayAway</h1>


        // <Image 
        // alt="logo"
        // className="hidden md:block cursor-pointer" 
        // height="100"
        // width="100"
        // src="/images/logo.png"
        // />
    );
}

export default Logo;