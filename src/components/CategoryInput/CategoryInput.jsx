import React from "react";

const CategoryInput = ({handleChange}) => {
  return (
    <>
      <h1>Category</h1>
        <label >
          <input onChange={handleChange} type="radio" value="" name="test" />
          <span className="checkmark"></span>All
        </label>

        <label >
          <input onChange={handleChange} type="radio" value="SmartWatch" name="test" />
          <span className=""></span>SmartWatch
        </label>

        <label >
          <input onChange={handleChange} type="radio" value="WirelessEarbuds" name="test" />
          <span className=""></span>WirelessEarbuds
        </label>

        <label >
          <input onChange={handleChange} type="radio" value="BluetoothSpeakers" name="test" />
          <span className=""></span>BluetoothSpeakers
        </label>

        <label >
          <input onChange={handleChange} type="radio" value="Headphones" name="test" />
          <span className=""></span>Headphones
        </label>

      </>
 
  );
};

export default CategoryInput;