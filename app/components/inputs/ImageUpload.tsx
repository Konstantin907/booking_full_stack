"use client";
//prije nego krenemo sa image pravljenjem idemo sa profilom na cloudinary
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";
//deklaristi cloiudinary globalno
declare global {
    var cloudinary: any;
}

interface ImageUploadProps{
    onChange: (value: string) => void
    value: string
}


const ImageUpload: React.FC<ImageUploadProps> = ({
    onChange,
    value
}) => {
    //definisemo uplaad:
    const handleUpload = useCallback((result: any)=> {
        onChange(result.info.secure_url);
    }, [onChange])

  return (
    <CldUploadWidget 
      onUpload={handleUpload} 
      uploadPreset="fouvlcoz"
      options={{
        maxFiles: 1
      }}
    >
      {({ open }) => {
        return (
          <div
          //ovo open je tu jer ponekad ovo open nece postojati
            onClick={() => open?.()}
            className="
              relative
              cursor-pointer
              hover:opacity-70
              transition
              border-dashed 
              border-2 
              p-20 
              border-neutral-300
              flex
              flex-col
              justify-center
              items-center
              gap-4
              text-neutral-600
            "
          >
            
            <TbPhotoPlus
              size={50}
            />
            <div className="font-semibold text-lg">
              Click to upload
            </div>
            {/* kondicional za sliku koja je uploadovana  */}
            {value && (
              <div className="
              absolute inset-0 w-full h-full">
                <Image
                  fill 
                  style={{ objectFit: 'cover' }} 
                  src={value} 
                  alt="House" 
                />
              </div>
            )}
          </div>
        ) 
    }}
    </CldUploadWidget>
  );
  
}
export default ImageUpload
