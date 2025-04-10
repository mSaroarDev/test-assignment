"use client";
import { PiUserCirclePlusFill } from "react-icons/pi";
import { BiSolidEdit, BiSolidEditLocation } from "react-icons/bi";
import { VscKey } from "react-icons/vsc";
import StepHeader from "@/components/ui/StepHeader";
import { useState } from "react";
import { Button } from "@/components/subcomponents/Buttons";
import { Input, Label } from "@/components/subcomponents/Inputs";
import { IoMdArrowBack } from "react-icons/io";
import { IoMdArrowForward } from "react-icons/io";
import { MdViewInAr } from "react-icons/md";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import FormPreview from "./FormPreview";
import { addNewItem } from "@/store/Store";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ApplicationForm = () => {

  const [currStep, setCurrStep] = useState(1);
  const [filledStep, setFilledStep] = useState(0);
  const router = useRouter();

  const stepTree = [
    { id: 1, title: "Personal Informations", desc: "Enter your personal information", icon: <PiUserCirclePlusFill size={22} /> },
    { id: 2, title: "Address Details", desc: "Enter your address details", icon: <BiSolidEditLocation size={22} /> },
    { id: 3, title: "Account Information", desc: "Enter your account information", icon: <VscKey size={22} /> },
    { id: 4, title: "Preview", desc: "Preview Application", icon: <MdViewInAr size={22} /> },
  ];

  const schema = z.object({
    personalInformation: z.object({
      fullName: z.string().min(3, { message: "Full name is required" }),
      email: z.string().email({ message: "Invalid email address" }).regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, { message: "Invalid email address" }),
      phone: z.string().min(10, { message: "Phone number must be min 10 characters long" }).max(14, { message: "Phone number must be max 14 characters long" })
    }),
    addressDetails: z.object({
      streetAddress: z.string().min(5, { message: "Street address is required" }),
      city: z.string().min(5, { message: "City is required" }),
      zipCode: z.string().min(5, { message: "Zip code must be min 5 characters long" }).max(5, { message: "Zip code must be max 5 characters long" })
    }),
    accountInformation: z.object({
      username: z.string().min(4, { message: "Username is required" }),
      password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
      confirmPassword: z.string().min(6, { message: "Confirm password must be at least 6 characters long" })
    })
    .refine(data => data.password === data.confirmPassword, {
      message: "Passwords must match",
      path: ["confirmPassword"]
    })
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
    watch
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      personalInformation: {
        fullName: "",
        email: "",
        phone: ""
      },
      addressDetails: {
        streetAddress: "",
        city: "",
        zipCode: ""
      },
      accountInformation: {
        username: "",
        password: "",
        confirmPassword: ""
      }
    },
    mode: "onChange"
  });

  const onSubmit = (data) => {
    const res = addNewItem(data);
    if(res.success){
      toast.success(res.message);
      router.push("/");
    } else {
      toast.error(res.message)
    }
  };

  const validateCurrentStep = async () => {
    let isValid = false;
    
    if (currStep === 1) {
      isValid = await trigger("personalInformation");
    } else if (currStep === 2) {
      isValid = await trigger("addressDetails");
    } else if (currStep === 3) {
      isValid = await trigger("accountInformation");
    }
    
    return isValid;
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    
    if (isValid) {
      if (currStep < stepTree.length) {
        setCurrStep(currStep + 1);
        setFilledStep(Math.max(filledStep, currStep));
      }
    }
  };

  const allFormData = watch();

  return (
    <main className="grid grid-cols-12 gap-5 mt-5">
      <div className="col-span-12 lg:col-span-3">
        <StepHeader
          currStep={currStep}
          setCurrStep={setCurrStep}
          stepTree={stepTree}
          filledStep={filledStep}
        />
      </div>

      <div className="col-span-12 lg:col-span-9 bg-controlled p-7 rounded-md shadow-md min-h-[45vh] flex flex-col">
        <div className="flex-1">
          <div className="step_header">
            <h2 className="text-xl font-medium flex items-center gap-2">
              <BiSolidEdit size={20} />
              {stepTree[currStep - 1].title}
            </h2>
          </div>

          <div className="step_inputs mt-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              {currStep === 1 && (
                <div className="grid grid-cols-12 gap-5">
                  <div className="col-span-12">
                    <Label>Full Name</Label>
                    <Input 
                      {...register("personalInformation.fullName")}
                    />
                    {errors.personalInformation?.fullName && (
                      <p className="text-red-500 text-sm mt-1">{errors.personalInformation.fullName.message}</p>
                    )}
                  </div>

                  <div className="col-span-12 md:col-span-6">
                    <Label>Email</Label>
                    <Input 
                      {...register("personalInformation.email")}
                    />
                    {errors.personalInformation?.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.personalInformation.email.message}</p>
                    )}
                  </div>

                  <div className="col-span-12 md:col-span-6">
                    <Label>Phone Number</Label>
                    <Input 
                      {...register("personalInformation.phone")}
                    />
                    {errors.personalInformation?.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.personalInformation.phone.message}</p>
                    )}
                  </div>
                </div>
              )}

              {currStep === 2 && (
                <div className="grid grid-cols-12 gap-5">
                  <div className="col-span-12">
                    <Label>Street Address</Label>
                    <Input 
                      {...register("addressDetails.streetAddress")}
                    />
                    {errors.addressDetails?.streetAddress && (
                      <p className="text-red-500 text-sm mt-1">{errors.addressDetails.streetAddress.message}</p>
                    )}
                  </div>

                  <div className="col-span-12 md:col-span-6">
                    <Label>City</Label>
                    <Input 
                      {...register("addressDetails.city")}
                    />
                    {errors.addressDetails?.city && (
                      <p className="text-red-500 text-sm mt-1">{errors.addressDetails.city.message}</p>
                    )}
                  </div>

                  <div className="col-span-12 md:col-span-6">
                    <Label>Zip Code</Label>
                    <Input 
                      {...register("addressDetails.zipCode")}
                    />
                    {errors.addressDetails?.zipCode && (
                      <p className="text-red-500 text-sm mt-1">{errors.addressDetails.zipCode.message}</p>
                    )}
                  </div>
                </div>
              )}

              {currStep === 3 && (
                <div className="grid grid-cols-12 gap-5">
                  <div className="col-span-12">
                    <div className="w-full md:w-2/3 lg:w-1/2">
                      <Label>Username</Label>
                      <Input 
                        {...register("accountInformation.username")}
                      />
                      {errors.accountInformation?.username && (
                        <p className="text-red-500 text-sm mt-1">{errors.accountInformation.username.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="col-span-12 md:col-span-6">
                    <div className="w-full">
                      <Label>Password</Label>
                      <Input 
                        type="password"
                        {...register("accountInformation.password")}
                      />
                      {errors.accountInformation?.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.accountInformation.password.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="col-span-12 md:col-span-6">
                    <div className="w-full">
                      <Label>Confirm Password</Label>
                      <Input 
                        type="password"
                        {...register("accountInformation.confirmPassword")}
                      />
                      {errors.accountInformation?.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">{errors.accountInformation.confirmPassword.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {currStep === 4 && (
                <div className="grid grid-cols-12">
                  <div className="col-span-12">
                    <h3 className="text-lg font-medium mb-4">Form Data Preview</h3>
                    <FormPreview data={allFormData} />
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-3">
          {currStep > 1 && (
            <Button
              startcontent={<IoMdArrowBack size={20} />}
              variant="outline" onClick={() => setCurrStep(currStep - 1)}
            >
              Previous
            </Button>
          )}
          {currStep < stepTree.length && (
            <Button
              onClick={handleNext}
              endcontent={<IoMdArrowForward size={20} />}
            >
              Next
            </Button>
          )}
          
          {currStep === stepTree.length && (
            <Button
              onClick={handleSubmit(onSubmit)}
              endcontent={<IoMdArrowForward size={20} />}
            >
              Submit
            </Button>
          )}
        </div>
      </div>
    </main>
  );
};

export default ApplicationForm;