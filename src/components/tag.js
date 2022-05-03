// TagsInput.jsx
import { useState, useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import List from './list'

const TagsInput = () => {

  const [tags, setTags] = useState([]);

  // Adding Tags
  const addTags = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      setTags([...tags, e.target.value]);
      e.target.value = "";
    }
  };
  // Removing Tags
  const removeTags = (index) => {
    setTags([...tags.filter((tag) => tags.indexOf(tag) !== index)]);
  };
  return (
    <div className="flex flex-col justify-center items-start h-52">
      <ul className="m-8 grid grid-row-3 grid-flow-col gap-1">
        {tags.map((tag, index) => (
          <li key={index} className="flex flex-row items-start justify-start">
            <span
              cursor="pointer"
              onClick={() => removeTags(index)}
              className="p-4 border rounded-lg shadow-sm outline-none bg-slate-100"
            >
              {tag}
            </span>
          </li>
        ))}
      </ul>

      <input
        className="w-42 flex flex-row items-center justify-center border rounded-full shadow-sm outline-none p-2 text-black hover:shadow-lg"
        onKeyUp={(event) => addTags(event)}
        placeholder="Add Tag"
      />
    </div>
  );
};

export default TagsInput;
