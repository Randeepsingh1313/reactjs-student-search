import React, { useState, useEffect } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { baseUrl, fetchApi } from "../utils/fetchApi";
import TagsInput from "./tag";

const List = () => {
  const [listData, setListData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [open, setOpen] = useState([]);

  // Call API
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchApi(baseUrl);

      if (!data.ok) {
        console.log(`${data.status}`);
      }
      setListData(data?.data);
    };
    fetchData();
  }, []);

  // Toggle button
  const toggleOpen = (id) => {

    if (open.includes(id)) {
      setOpen(open.filter((sid) => sid !== id));
    } else {
      let newOpen = [...open];
      newOpen.push(id);
      setOpen(newOpen);
    }
  };

  // func. for handling search by name functionality
  const searchItems = (searchValue) => {

    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = listData?.students?.filter((student, index) => {
        return Object.values(student.firstName)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(listData);
    }
  };

  return (
    <>
      <div className="container flex flex-col justify-center items-center m-auto scroll-smooth hover:scroll-auto">
        <div className="flex flex-col start justify-center items-start rounded-lg shadow-2xl m-12 p-0 ">
          <input
            className="sm:w-96 w-80 h-10 flex flex-row justify-center items-start mt-12 ml-12 border rounded-full shadow-sm outline-none p-6 text-black hover:shadow-lg"
            onChange={(e) => searchItems(e.target.value)}
            placeholder="Search By Name"
          />
          <input
            className="sm:w-96 w-80 h-10 flex flex-row flex-baseline items-center justify-center mt-2 ml-12 border rounded-full shadow-sm outline-none p-6 text-black hover:shadow-lg"
            onChange={(e) => searchItems(e.target.value)}
            placeholder="Search By Tag"
          />

          {searchInput.length > 1
            ? filteredResults?.map(function (student, index) {
                return (
                  <div key={student.id} className="w-100 p-0 flex flex-col items-start justify-start md:flex-row m-10 align-top">

                  <img
                    className="flex flex-col items-center justify-center rounded-full align-text-top bg-slate-100 static ring ring-blue-300 hover:ring-blue-500"
                    bg="white"
                    src={student.pic}
                    width={120}
                    height={120}
                    borderRadius={100}
                    alt="Cover photo of Students"
                  />

                  <div className="flex flex-col items-start justify-center mx-20 align-text-top">
                    <p className="text-5xl font-bold font-raleway tracking-wide">
                      {student.firstName} {student.lastName}
                    </p>
                    <p className="tracking-wide">Email: {student.email}</p>
                    <p className="tracking-wide ">Company: {student.company}</p>
                    <p className="tracking-wide">Skill: {student.skill}</p>

                    <p className="tracking-wide ">
                      Average:{" "}
                      {student.grades.reduce((sum, curr) => sum + Number(curr), 0) / student.grades.length}{" "}
                      %
                    </p>
                    <TagsInput></TagsInput>
                  </div>

                  {open.includes(student.id) ? (
                    <ul className="flex flex-col items-start justify-start align-text-top">
                      {student.grades.map((grade, index) => (
                        <li key={grade.id}>
                          Test {index + 1}: {grade}%
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  
                  <button
                    className="flex flex-col items-start grow justify-end align-text-top button"
                    onClick={() => toggleOpen(student.id)}>
                    {open.includes(student.id) ? (<AiOutlineMinus />) : (<AiOutlinePlus />)}
                  </button>

                </div>
                );
              })
            : listData?.students?.map((student, index) => (
                <div className="w-100 p-0 flex flex-col items-start justify-start md:flex-row m-10 align-top">

                  <img
                    className="flex flex-col items-center justify-center rounded-full align-text-top bg-slate-100 static ring ring-blue-300 hover:ring-blue-500"
                    bg="white"
                    src={student.pic}
                    width={120}
                    height={120}
                    borderRadius={100}
                    alt="Cover photo of Students"
                  />

                  <div className="flex flex-col items-start justify-center mx-20 align-text-top">
                    <p className="text-5xl font-bold font-raleway tracking-wide">
                      {student.firstName} {student.lastName}
                    </p>
                    <p className="tracking-wide">Email: {student.email}</p>
                    <p className="tracking-wide ">Company: {student.company}</p>
                    <p className="tracking-wide">Skill: {student.skill}</p>

                    <p className="tracking-wide ">
                      Average:{" "}
                      {student.grades.reduce((sum, curr) => sum + Number(curr), 0) / student.grades.length}{" "}
                      %
                    </p>
                    <TagsInput></TagsInput>
                  </div>

                  {open.includes(student.id) ? (
                    <ul className="flex flex-col items-start justify-start align-text-top">
                      {student.grades.map((grade, index) => (
                        <li key={grade.id}>
                          Test {index + 1}: {grade}%
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  
                  <button
                    className="flex flex-col items-start grow justify-end align-text-top button"
                    onClick={() => toggleOpen(student.id)}>
                    {open.includes(student.id) ? (<AiOutlineMinus />) : (<AiOutlinePlus />)}
                  </button>

                </div>
              ))}
        </div>
      </div>
    </>
  );
};
export default List;
