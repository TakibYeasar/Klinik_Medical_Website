"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import {
  getPaginationRowModel,
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import { decryptKey } from "../../../lib/utils";

const DataTable = ({ columns, data }) => {
  const encryptedKey =
    typeof window !== "undefined"
      ? window.localStorage.getItem("accessKey")
      : null;

  useEffect(() => {
    const accessKey = encryptedKey && decryptKey(encryptedKey);

    if (accessKey !== process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      window.location.href = "/";
    }
  }, [encryptedKey]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handlePreviousPage = async () => {
    if (table.getCanPreviousPage()) {
      try {
        await axios.post("/api/pagination/previous", {
          // Add necessary data for pagination if needed
        });
        table.previousPage();
      } catch (error) {
        console.error("Error fetching previous page:", error);
      }
    }
  };

  const handleNextPage = async () => {
    if (table.getCanNextPage()) {
      try {
        await axios.post("/api/pagination/next", {
          // Add necessary data for pagination if needed
        });
        table.nextPage();
      } catch (error) {
        console.error("Error fetching next page:", error);
      }
    }
  };

  return (
    <div className="data-table">
      <div className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="p-2 text-left">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-b"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-2">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="h-24 text-center">
                  No results.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between p-4">
        <button
          onClick={handlePreviousPage}
          disabled={!table.getCanPreviousPage()}
          className="border border-gray-400 text-gray-600 bg-white hover:bg-gray-200 disabled:opacity-50 p-2 rounded"
        >
          <Image
            src="/assets/icons/arrow.svg"
            width={24}
            height={24}
            alt="Previous"
          />
        </button>
        <button
          onClick={handleNextPage}
          disabled={!table.getCanNextPage()}
          className="border border-gray-400 text-gray-600 bg-white hover:bg-gray-200 disabled:opacity-50 p-2 rounded"
        >
          <Image
            src="/assets/icons/arrow.svg"
            width={24}
            height={24}
            alt="Next"
            className="rotate-180"
          />
        </button>
      </div>
    </div>
  );
};

export default DataTable;
