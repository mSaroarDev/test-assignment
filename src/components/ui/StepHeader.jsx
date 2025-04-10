"use client";

const StepHeader = ({
  stepTree, 
  currStep, 
  setCurrStep,
  filledStep
}) => {

  return (
    <>
      <div className="flex flex-row lg:flex-col gap-5 mt-5">
        {stepTree.map((step, index) => (
          <div 
          onClick={() => step.id <= filledStep ? setCurrStep(step.id) : null}
          key={index} className={`flex flex-wrap items-center gap-2 ${step.id <= filledStep ? "cursor-pointer" : "cursor-default" }`}>
          <div className={`min-w-10 h-10 rounded-md ${
            step.id === currStep ? "bg-brand/70 text-white" : 
            step.id <= filledStep ? "bg-brand text-white" : 
            "bg-gray-200 dark:bg-gray-800 text-slate-400"
          } grid place-items-center`}>
            {step.icon}
          </div>
          <div>
            <h2 className="text-sm lg:text-base font-semibold">{step.title}</h2>
            <p className="hidden lg:block text-sm text-gray-500">{step.desc}</p>
          </div>
        </div>
        ))}
      </div>
    </>
  );
};

export default StepHeader;