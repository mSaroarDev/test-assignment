"use client";
import { useDataTableStyles } from "@/assets/styles/DatatableStyles";
import { useScreenDetector } from "@/components/hooks/useScreenDetector";
import RenderSerialNo from "@/components/ui/RenderSerialNo";
import { useState } from "react";
import DataTable from "react-data-table-component";

const DataItems = () => {
  const { customStyles } = useDataTableStyles();
  const { isMobile, isTablet } = useScreenDetector();

  const columns = [
    {
      name: "Full Name",
      cell: (row, index) => (
        <div className="flex items-center gap-2">
          <RenderSerialNo value={index + 1} />
          <b>{row?.personalInformation?.fullName}</b>
        </div>
      )
    },
    {
      name: "Username",
      selector: (row) => row?.accountInformation?.username,
    },
    {
      name: "Email",
      selector: (row) => row?.personalInformation?.email,
    },
    {
      name: "Phone",
      selector: (row) => row?.personalInformation?.phone,
    },
    {
      name: "Street Address",
      selector: (row) => row?.addressDetails?.streetAddress,
    },
    {
      name: "City",
      selector: (row) => row?.addressDetails?.city,
    },
    {
      name: "Zip Code",
      width: "100px",
      center: "true",
      selector: (row) => row?.addressDetails?.zipCode,
    },
  ]

  const mobileColumns = [
    {
      name: "Full Name",
      cell: (row, index) => (
        <div className="flex items-center gap-2">
          <RenderSerialNo value={index + 1} />
          <div>
            <b>{row?.personalInformation?.fullName}</b>
            <p>@{row?.accountInformation?.username}</p>
          </div>
        </div>
      )
    },
    {
      name: "Username & EMail",
      selector: (row) => row?.personalInformation?.email,
      cell: (row) => (
        <div className="flex flex-col gap-1">
          <p>{row?.personalInformation?.email}</p>
          <p>{row?.personalInformation?.phone}</p>
        </div>
      )
    },
  ]

  const items = localStorage.getItem("items");
  const [data, setData] = useState(items ? JSON.parse(items) : []);

  return (
    <>
      <DataTable
        columns={isMobile ? mobileColumns : isTablet ? mobileColumns : columns}
        data={data || []}
        noDataComponent="No Data Found"
        customStyles={customStyles}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 20, 30]}
        paginationComponentOptions={{
          rowsPerPageText: "Rows per page",
          rangeSeparatorText: "of",
          noRowsPerPage: false,
        }}
      />
    </>
  );
};

export default DataItems;