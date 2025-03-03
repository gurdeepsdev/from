"use client";

import { useState } from "react";
import {
  Share2,
  Plus,
  MoreVertical,
  ChevronDown,
  Download,
  Settings,
  MoreHorizontal,
  Save,
  CircleHelp,
  Calendar,
  X,
  ChevronRight
} from "lucide-react";
import { FaApple, FaAndroid } from "react-icons/fa";
import { MdOutlineSettings ,MdOutlineDownload} from "react-icons/md";

// import { Button } from "@/components/ui/button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

export default function AnalyticsDashboard() {
  const [singleSource, setSingleSource] = useState(false);

  const [startDate, setStartDate] = useState(new Date("2024-12-01"));
  const [endDate, setEndDate] = useState(new Date("2024-12-31"));

  const [single, setSingle] = useState("Single Source of Trust");
  const [view, setView] = useState("View Type");

  const handleChange = (e) => {
    setSingle(e.target.innerText);
  };

  const handleChange1 = (e) => {
    setView(e.target.innerText);
  };

  const data = [
    {
      source: "mobiquickgcg_int",
      uniqueUsers: "4,575",
      eventCount: "4,596",
      revenue: "N/A",
      eventUniqueUsers: "173",
    },
    {
      source: "fozenadmeus_int",
      uniqueUsers: "3,975",
      eventCount: "3,978",
      revenue: "N/A",
      eventUniqueUsers: "155",
    },
    {
      source: "pictrickmj4_int",
      uniqueUsers: "1,890",
      eventCount: "1,891",
      revenue: "N/A",
      eventUniqueUsers: "69",
    },
    {
      source: "offersinfinite_int",
      uniqueUsers: "1,356",
      eventCount: "1,359",
      revenue: "N/A",
      eventUniqueUsers: "56",
    },
    {
      source: "semblymobay_int",
      uniqueUsers: "1,074",
      eventCount: "1,077",
      revenue: "N/A",
      eventUniqueUsers: "40",
    },
  ];

  return (
    <div className="min-h-screen bg-white p-6">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 border px-4 py-2 rounded ">
            <span className="text-sm font-medium">App</span>
            <div className="flex space-x-1 gap-3">
            <div className="relative flex items-center justify-center w-6  h-6 rounded-lg shadow">

              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-28%20at%204.53.57%E2%80%AFPM.jpg-srQ9u0H9vEy9Xm4NUKSOjoGD99gHvm.jpeg"
                alt="App Icon 1"
                className="w-6 h-6 rounded"
              />
                        <FaApple className="text-gray-500 bg-white px-1 py-1 text-xl absolute top-1 left-4 rounded-full shadow-lg" />
</div>
<div className="relative flex items-center justify-center w-6  h-6 rounded-lg shadow">

              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-28%20at%204.53.57%E2%80%AFPM.jpg-srQ9u0H9vEy9Xm4NUKSOjoGD99gHvm.jpeg"
                alt="App Icon 2"
                className="w-6 h-6 rounded"
              />
                                      <FaAndroid className="bg-white px-1 py-1 text-gray-500  text-xl absolute top-1 left-4 rounded-full shadow-lg" />

              </div>

            </div>
          </div>

          <div className="flex items-center gap-2 border px-4 py-2 rounded">
            <span className="text-gray-500  "><CircleHelp size={18}/></span>
            <span
      contentEditable
      suppressContentEditableWarning={true}
      className="text-sm font-medium text-gray-500   cursor-text"
      onBlur={handleChange} // Updates state when editing is done
    >
      {single}
    </span>            <button
              onClick={() => setSingleSource(!singleSource)}
              className={`w-12 h-6 rounded-full transition-colors ${
                singleSource ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                  singleSource ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center gap-2 border px-4 py-2 rounded">
          <span className="text-gray-500  "><CircleHelp size={18}/></span>

            <span 
              contentEditable
              suppressContentEditableWarning={true}
              onBlur={handleChange1} // Updates state when editing is done

            className="text-sm font-medium text-gray-500">{view}</span>
            <button variant="outline" className="text-sm text-[#220D4E]">
              Unified 
            </button>
          </div>

          <div className="flex items-center gap-2 border px-4 py-2 rounded">
            <span className="text-sm font-medium text-gray-500"> <Calendar size={18}/></span>
         
            <span className="text-sm font-medium text-gray-500">Attribution dates</span>
            <button variant="outline" className="text-sm text-[#220D4E]">
              Dec 1, 2024 - Dec 31, 2024 
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
        <button variant="outline" size="icon">
            <Save className="h-8 w-8 border border-gray-500 px-1 py-2 text-gray-500  rounded stroke-slate-500" />
          </button>
          <button variant="outline" size="icon">
            <Share2 className="h-5 w-4 fill-gray-500 text-gray-500 text-sm" />
          </button>
          <button variant="outline" size="icon">
            <Plus className="h-8 w-8 border px-2 py-2 text-white bg-blue-500 rounded" />
          </button>
          <button variant="outline" size="icon">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex items-center gap-2 border px-4 py-2 rounded">
          <span className="text-sm text-gray-500">Media source</span>
          <button variant="outline" className="text-sm text-[#220D4E]">
            postknighcof_int 
          </button>
          <span className="text-blue-500 text-sm bg-[#EDF4FD] rounded-lg">+40 </span>
          <span className="text-sm font-medium text-gray-500"> <X size={18}/></span>

        </div>

        <div className="flex items-center gap-2 border px-4 py-2 rounded">
          <span className="text-sm text-gray-500">Campaign</span>
          <button variant="outline" className="text-sm text-[#220D4E]">
            All 
          </button>
        </div>

        <div className="flex items-center gap-2 border px-4 py-2 rounded">
          <span className="text-sm text-gray-500">Geo</span>
          <button variant="outline" className="text-sm text-[#220D4E]">
            All 
          </button>
          
        </div>
        <Plus className="h-8 w-8  px-2 py-2 text-blue-600" />

      </div>

      {/* Table */}
      {/* <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Media source
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Event unique users
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Event count
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Event revenue ($)
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Event unique users
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr className="bg-blue-50">
              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                Totals
              </td>
              <td className="px-6 py-4 text-sm text-right text-gray-900">
                16,752
              </td>
              <td className="px-6 py-4 text-sm text-right text-gray-900">
                16,793
              </td>
              <td className="px-6 py-4 text-sm text-right text-gray-500">N/A</td>
              <td className="px-6 py-4 text-sm text-right text-gray-900">661</td>
            </tr>
            {data.map((row, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {row.source}
                </td>
                <td className="px-6 py-4 text-sm text-right text-gray-900">
                  {row.uniqueUsers}
                </td>
                <td className="px-6 py-4 text-sm text-right text-gray-900">
                  {row.eventCount}
                </td>
                <td className="px-6 py-4 text-sm text-right text-gray-500">
                  {row.revenue}
                </td>
                <td className="px-6 py-4 text-sm text-right text-gray-900">
                  {row.eventUniqueUsers}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
      <div className="overflow-auto w-full ">
      <div className="border-collapse border border-gray-300 flex justify-between items-center p-4">
  {/* Left Side */}
  <p className="flex text-sm gap-2 justify-center items-center text-[#220D4E]">
  Group by
  <span className="border px-2 py-1 rounded text-[#220D4E]">Media Source</span>
  <img src="/Arrow.svg" alt="Arrow" className="h-3 w-4 text-gray-500" />
  <span className="border px-2 py-1 rounded flex items-center gap-1 text-[#220D4E]">
  Campaign 
  <span className="text-sm text-gray-500">
    <X size={18} />
  </span>
</span>

</p>

  {/* Right Side */}
  <p className="flex gap-4 text-gray-500">
    <span><MdOutlineDownload size={24} /></span>
    <span><MdOutlineSettings size={24} /></span>
    <span><MoreVertical /></span>
  </p>
</div>


<table className="min-w-full border-collapse border border-gray-300">
  {/* Table Header */}
  <thead>
    {/* Row for "Classic Attribution" ABOVE the headings */}
    {/* <tr>
      <td colSpan="5" className="border-b text-center p-2 font-semibold text-[#220D4E]">
        Classic Attribution
      </td>
    </tr> */}

    {/* Header Row */}
    <tr>
      <td className="flex border-l p-6 gap-2">
        <span className="text-[#220D4E]">Media Source</span>    
        <span className="pt-2">
          <img src="/Arrow.svg" className="h-3 w-4 text-gray-500" />
        </span>
        <span className="text-[#220D4E]">Campaign</span>
      </td>
      <td className="border-l p-2 text-[#220D4E] text-right">Event Unique Users</td>
      <td className="p-2 text-[#220D4E] text-right">Event Count</td>
      <td className="p-2 text-[#220D4E] text-right ">Event Revenue ($)</td>
      <td className="border-l border-r p-2 text-[#220D4E] text-right">Event Unique Users</td>
    </tr>
  </thead>

  {/* Table Body */}
  <tbody>
    <tr className="bg-[#EDF4FD] font-semibold">
      <td className="border p-2 m-2 text-blue-600">Totals</td>
      <td className=" p-4 text-blue-600 text-right">16,752</td>
      <td className=" p-4 text-blue-600 text-right">16,793</td>
      <td className=" p-4 text-blue-200 text-right">N/A</td>
      <td className="border p-4 text-blue-600 text-right">661</td>
    </tr>

    {/* Sample Rows */}
    {[
      {
        name: (
          <div className="flex items-center gap-2">
            <ChevronRight size={14} className="text-[#220D4E] font-bold" />
            <span>mobiquickgcg_int</span>
          </div>
        ),
        users: 4575,
        count: 4596,
        revenue: "N/A",
        unique: 173,
      },
      {
        name: (
          <div className="flex items-center gap-2">
            <ChevronRight size={14} className="text-[#220D4E]" />
            <span>mobiquickgcg_int</span>
          </div>
        ),
        users: 3975,
        count: 3978,
        revenue: "N/A",
        unique: 155,
      },
      {
        name: (
          <div className="flex items-center gap-2">
            <ChevronRight size={14} className="text-[#220D4E]" />
            <span>mobiquickgcg_int</span>
          </div>
        ),
        users: 1890,
        count: 1891,
        revenue: "N/A",
        unique: 69,
      },
      {
        name: (
          <div className="flex items-center gap-2">
            <ChevronRight size={14} className="text-[#220D4E]" />
            <span>mobiquickgcg_int</span>
          </div>
        ),
        users: 1356,
        count: 1359,
        revenue: "N/A",
        unique: 56,
      },
    ].map((row, index) => (
      <tr key={index} className="hover:bg-gray-50">
        <td className="border p-4 text-sm text-[#220D4E]">{row.name}</td>
        <td className="border-b p-4 text-sm text-[#220D4E] text-right">{row.users}</td>
        <td className="border-b p-4 text-sm text-[#220D4E] text-right">{row.count}</td>
        <td className="border-b p-4 text-sm text-gray-400 text-right">{row.revenue}</td>
        <td className="border p-4 text-sm text-[#220D4E] text-right">{row.unique}</td>
      </tr>
    ))}
  </tbody>
</table>


    </div>
    </div>
  );
}
