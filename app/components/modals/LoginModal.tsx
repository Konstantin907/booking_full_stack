"use client";
//odje kreiramo register pop up izgled i sve:
import axios from "axios";
import { signIn } from "next-auth/react"
import { AiFillGithub } from "react-icons/ai";
// import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { 
  FieldValues, 
  SubmitHandler,
  useForm
} from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";
import {useRouter} from "next/navigation"

const LoginModal = () => {
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    //
    const { 
        register, 
        handleSubmit,
        formState: {
          errors,
        },
      } = useForm<FieldValues>({
        defaultValues: {
          email: '',
          password: ''
        },
      });

    //passing data whicha are above name, email, password
      const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true); 
       signIn("credentials", {
        ...data,
        redirect: false
       }).then((callback)=>{
        setIsLoading(false)
        //testing if callback is okay:
        if(callback?.ok){
          toast.success("You are successfuly logged in")
          router.refresh()
          //closing login:
          loginModal.onClose();
        }
        if(callback ?. error) {
          toast.error(callback.error)
        }
       })
    }

    //toogle model da kada kliknemo register da zatvori login:
    const toggle = useCallback(()=>{
      loginModal.onClose()
      registerModal.onOpen()
    }, [loginModal, registerModal])


//our inputs have two elements also body and footer:
const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome back!"
        subtitle="You can login, welcome aboard"
      />
       <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

    <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mp-3">
        <hr />
        <Button
          outline
          label= "Continue with Google"
          icon={FcGoogle}
          onClick={()=>{signIn("google")}}
        ></Button>

        <Button
          outline
          label= "Continue with Github"
          icon={AiFillGithub}
          onClick={()=>{signIn("github")}}
        ></Button>
        <div className="
            text-neutral-500
            text-center
            mt-4
            font-light
        ">
            <div className=" justify-center flex flex-row items-center gap-2">
                <div>
                First time visit?
                </div>
                <div 
                onClick={toggle}
                className="text-neutral-800 cursor-pointer hover:underline">
                    Register
                </div>
            </div>

        </div>
    </div>
    
  )



    return ( 
        <Modal
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title="Login"
        actionLabel="Continue"
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent} 
        />
     );
}
 
export default LoginModal;