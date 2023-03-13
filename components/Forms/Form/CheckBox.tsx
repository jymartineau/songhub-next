
import classnames from "classnames";

const Checkbox = ({ className, ...rest }:{className?:string}) => {
  return (
    <input
      type="checkbox"
      className={classnames(className, "text-white")}
      {...rest}
    />
  );
};

export default Checkbox