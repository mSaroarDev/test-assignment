"use client";
import Spinner from "./Spinner";
import { useRouter } from "next/navigation";

export const Button = ({ 
  type, 
  children, 
  className, 
  onClick, 
  variant = "solid",
  startcontent = null, 
  endcontent = null, 
  isicononly = "false",
  isLoading = false,
  navigate = null, 
  ...props 
}) => {
  const {push} = useRouter();


  return (
    <button
      type={type ? type : "button"}
      className={`flex items-center gap-2 bg-brand px-4 py-2 rounded-lg cursor-pointer border-2 ${variant === 'outline' ? "border-brand bg-transparent text-brand" : "bg-brand text-white hover:bg-brand/90 border-transparent"} ${className} ${isLoading ? "cursor-not-allowed" : ""}`}
      disabled={isLoading}
      onClick={navigate ? () => push(navigate) : onClick}
      startcontent={startcontent}
      endcontent={endcontent}
      isicononly={isicononly}
      {...props}
    >
      {(startcontent && !isLoading) && startcontent}
      {isLoading && <Spinner />}
      {isicononly === "false" && children}
      {endcontent && endcontent}
    </button>
  )
}