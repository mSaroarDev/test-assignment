import ApplicationForm from "./ApplicationForm";
import DataItems from "./Datatable";

const ApplyPage = () => {
    return (
        <main className="p-10">
          <h2 className="font-semibold text-xl">Application Form</h2>
          <p>Fill all the required fields mark with <span className="text-red-500">*</span></p>
          <ApplicationForm />
        </main>
    );
};

export default ApplyPage;