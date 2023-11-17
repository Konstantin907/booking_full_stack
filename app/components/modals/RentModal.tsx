"use client";

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";

import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInputs from "../inputs/CategoryInput";
import CategoryBox from "../navbar/CategoryBox";
import { icons } from "react-icons";

import { FieldValues, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic"
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";

//sve ovew korake pravimo posebno:
enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO= 2,
    IMAGES= 3,
    DESCRIPTION = 4,
    PRICE = 5
}
export default function RentModal() {
    const rentModal = useRentModal();
    //posle enuma dodajemo states za kontrolu enuma
    const [step, setStep] = useState(STEPS.CATEGORY); //ovo je default znaci 0
  //sad doajemo funkcije koje ce ici napreijed/nazad

    //sada sve ovo sto se izabere bi trebaslo ici u formu, ovo iz CategoryInputa:
    //isto kao i u login/register modalu
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues> ({
        defaultValues: {
            //sve iz DB listings:
            category: "",
            location: null,
            guestCount: 1,
            roomCount:1,
            bathroomCount: 1,
            imageSrc: "",
            price: 1,
            title: "",
            description: ""
        }
    });

    const category = watch("category");
    const location = watch("location");
    const guestCount = watch("guestCount");
    const roomCount = watch("roomCount");
    const bathroomCount = watch("bathroomCount");
    const imageSrc = watch("imageSrc");

//ovako se mapa importuje umjesto standardnog:
//svaki put se mapa rerenderuje nakon promjene lokacije
     const Map = useMemo(() => dynamic(() => import('../Map'), { 
    ssr: false 
  }), [location]);

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value,{
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

  const onBack = () => {
    setStep((value) =>value -1 )
  };

  const onNext = () => {
    setStep((value)=> value + 1 )
  };

  //action label and secondary action label:
  const actionLabel = useMemo(()=>{
      if(step === STEPS.PRICE) {
        return "Create"
        //ako je sve popunjeno znaci zato se uslovljava ovdje na poslednje(price)
      }
      return "Next";
  }, [step])
  //secondary action memo:
  const secondaryActionLabel = useMemo(()=>{
    if(step === STEPS.CATEGORY) {
        return undefined;
    }
    return "Back";
  }, [step])

  //body content jer ce da bude promjenjiv:
  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div 
        className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-3
          max-h-[50vh]
          overflow-y-auto
        "
      >
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInputs 
            //znaci onjClick ovdje koristi category i setCustomValue
            //koji prvo gleda id i value i moramo definisati id to je "category"
                onClick= {(category)=>
                    setCustomValue("category", category)}
                //modifikujemo da je selected jednak label-u,
                //dobijamo ga iz ovog const koji ima watch
                    selected = {category=== item.label}
                label = {item.label}
                icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  )
    
if(step === STEPS.LOCATION) {
    bodyContent = (
        <div className=" flex flex-col gap-8">
            <Heading 
            title="What is you place location?"
            subtitle="Help guests finds you"
            />
            <CountrySelect
            value={location}
                onChange={(value)=> setCustomValue("location", value)}
             />
             <Map
                center={location?.latlng}
             />
        </div>
    )
}

if(step === STEPS.INFO) {
    bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading 
                title="Share some basics about place"
                subtitle="What amenities do you have?"
            />
            <Counter
                title="Guests"
                subtitle="How many guests?"
                value={guestCount}
                onChange={(value) => setCustomValue("guestCount", value)}
            />
                    <hr />
            <Counter
                title="Rooms"
                subtitle="How much rooms you have??"
                value={roomCount}
                onChange={(value) => setCustomValue("roomCount", value)}
            />
                    <hr />
            <Counter
                title="Bathrooms"
                subtitle="How many bathrooms do you have??"
                value={bathroomCount}
                onChange={(value) => setCustomValue("bathroomCount", value)}
            />
        </div>
    )
    
}

    //img body cointent next step for STEPS:
    if (step === STEPS.IMAGES) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
              title="Add a photo of your place"
              subtitle="Show guests what your place looks like!"
            />
            <ImageUpload
              onChange={(value) => setCustomValue('imageSrc', value)}
              value={imageSrc}
            />
          </div>
        )
      }

    return (
    <div>
      <Modal 
        isOpen = {rentModal.isOpen}
        onClose={rentModal.onClose}
        onSubmit={onNext}
        //ovdje dodajemo secondary steps
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        title="Here for you!"
        body={bodyContent}
      />
    </div>
  )
}
