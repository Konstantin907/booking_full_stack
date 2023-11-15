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
    


    return (
    <div>
      <Modal 
        isOpen = {rentModal.isOpen}
        onClose={rentModal.onClose}
        onSubmit={rentModal.onClose}
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
