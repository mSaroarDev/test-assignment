"use client";

export const Label = ({ children, className, isRequred = true, ...props }) => {
  return (
    <label className={`mb-1 mt-2 inline-block font-medium ${className}`} {...props}>
      {children} {isRequred && <span className="text-red-500">*</span>}
    </label>
  )
}

export const Input = ({ name,
  id,
  value,
  type = "text",
  onChange,
  placeholder,
  className,
  ...props
}) => {
  return (
    <input
      className={`bg-white w-full dark:bg-gray-900 border-1 border-brand/30 px-2 py-1.5 rounded-md focus:outline outline-brand/70 ${className}`}
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type ? type : "text"}
      {...props}
    />
  )
}

export const TextArea = ({ name, id, value, onChange, placeholder, className, ...props }) => {
  return (
    <textarea
      className={`bg-white dark:bg-gray-900 border-1 border-brand/30 px-2 py-1.5 rounded-md focus:outline outline-brand/70 ${className}`}
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...props}
    ></textarea>
  )
}

