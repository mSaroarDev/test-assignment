import { FieldLabel, FieldValue } from "@/components/subcomponents/DataView";
import Image from "next/image";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";

const FormPreview = ({data}) => {
  console.log(data);
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  const handleTogglePassword = () => {
    setIsVisiblePassword(!isVisiblePassword);
  }

    return (
        <>
          <main className="grid grid-cols-12 gap-5">
            <div className="col-span-3">
              <div className="w-40 h-40 rounded-lg overflow-hidden">
                <Image src="/avatar.png" alt="avatar" width={160} height={160} />
              </div>
            </div>
            <div className="col-span-9">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              <hr />
              <div className="grid grid-cols-2 gap-5 mt-5">
              <div>
                  <FieldLabel>Full Name</FieldLabel>
                  <FieldValue>{data?.personalInformation?.fullName}</FieldValue>
                </div>

                <div>
                  <FieldLabel>Email</FieldLabel>
                  <FieldValue>{data?.personalInformation?.email}</FieldValue>
                </div>

                <div>
                  <FieldLabel>Phone</FieldLabel>
                  <FieldValue>{data?.personalInformation?.
phone}</FieldValue>
                </div>
              </div>

              <h3 className="text-lg font-semibold mt-10">Address Information</h3>
              <hr />
              <div className="grid grid-cols-2 gap-5 mt-5">
              <div>
                  <FieldLabel>Street Address</FieldLabel>
                  <FieldValue>{data?.addressDetails?.streetAddress}</FieldValue>
                </div>

                <div>
                  <FieldLabel>City</FieldLabel>
                  <FieldValue>{data?.addressDetails?.city}</FieldValue>
                </div>

                <div>
                  <FieldLabel>Zip Code</FieldLabel>
                  <FieldValue>{data?.addressDetails?.zipCode}</FieldValue>
                </div>
              </div>

              <h3 className="text-lg font-semibold mt-10">Acount Information</h3>
              <hr />
              <div className="grid grid-cols-2 gap-5 mt-5">
              <div>
                  <FieldLabel>Username</FieldLabel>
                  <FieldValue>{data?.accountInformation?.username}</FieldValue>
                </div>

                <div>
                  <FieldLabel>Password</FieldLabel>
                  <FieldValue>
                    <div className="flex items-center gap-2">
                    <p>
                     {isVisiblePassword ? data?.accountInformation?.password : "********"}
                    </p>

                    <button type="button" className="p-1 ml-2 cursor-pointer" onClick={handleTogglePassword}>
                      {isVisiblePassword ? <IoMdEyeOff size={18} /> : <FaRegEye size={18} />}
                    </button>
                    </div>
                  </FieldValue>
                </div>
              </div>
            </div>
          </main>
        </>
    );
};

export default FormPreview;