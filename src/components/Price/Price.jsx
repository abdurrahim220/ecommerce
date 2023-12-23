
import Input from "../Input/Input";


const Price = ({ handleChange }) => {

  return (
    <>
    
        <h1>Price</h1>

        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="test2" />
          <span className=""></span>All
        </label>

        <Input
          handleChange={handleChange}
          value="500-1000"
          title="$500-1000"
          name="test2"
        />

        <Input
          handleChange={handleChange}
          value="1000-1500"
          title="$1000-1500"
          name="test2"
        />

        <Input
          handleChange={handleChange}
          value="1500-2000"
          title="$1500 - $2000"
          name="test2"
        />

        <Input
          handleChange={handleChange}
          value="2000-10000"
          title="Over $2000"
          name="test2"
        />
    
    </>
  );
};

export default Price;