"use client";

import { IconType } from "react-icons";
import {useRouter, useSearchParams} from "next/navigation"
import { useCallback } from "react";
import qs from "query-string"

interface CategoryBoxProps {
    icon: IconType
    label: string
    selected?: boolean
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
    icon: Icon,
    label,
    selected,
  }) => {
    const router = useRouter();
    const params = useSearchParams();
  
    const handleClick = useCallback(() => {
        //prvo definisemo currentQuery
      let currentQuery = {};
      
    //   Ovaj deo JavaScript koda koristi qs (Query String) biblioteku za parsiranje parametara upita iz URL-a 
    //ili sličnog stringa. Funkcija qs.parse() konvertuje string parametara upita (query string) u objekat, koji je 
    //zatim lakše manipulisati unutar JavaScript-a.
      if (params) {
        currentQuery = qs.parse(params.toString())
      }
  
      const updatedQuery: any = {
        ...currentQuery,
        category: label
      }
  //ovjde ispituje ako params postoji on ce da ga getuje na osnovu naziva category, ali ovdje
  //se odnosi da ako se klikne brise kategoriju iz URL ?category
      if (params?.get('category') === label) {
        delete updatedQuery.category;
      }
  
      const url = qs.stringifyUrl({
        url: '/',
        query: updatedQuery
      }, { skipNull: true });
  
      router.push(url);
    }, [label, router, params]);
  
  return (
    <div 
    onClick={handleClick}
    className={`
    
        flex 
        flex-col 
        items-center 
        justify-center 
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected ? 'border-b-neutral-800' : 'border-transparent'}
        ${selected ? 'text-neutral-800' : 'text-neutral-500'}
  `}>
      <Icon size={26}/>
      <div className="font-medium text-sm">
        {label}
      </div>
    </div>
  )
}

export default CategoryBox
