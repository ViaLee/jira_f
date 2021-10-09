import React from "react";

const FormItem = (props) => {
  const { handleChange, value, name, label, children } = props;
  // 修改值
  // 显示label,children
  const onChange = (val) => {
    handleChange(name, val);
  };
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      {React.isValidElement(children)
        ? React.cloneElement(children, { onChange, value })
        : ""}
    </div>
  );
};

FormItem.displayName = "formItem";

function Input({ onChange, value }) {
  return (
    <input
      className="input"
      onChange={(e) => onChange && onChange(e.target.value)}
      value={value}
    />
  );
}

Input.displayName = "input";

class Form extends React.Component {
  state = {
    formData: {},
  };

  // static FormItem = ({ children }) => {
  //   return children;
  // };

  submitForm = (fn) => {
    fn({ ...this.state.formData });
  };

  resetForm = () => {
    const { formData } = this.state;
    Object.keys(formData).forEach((i) => {
      formData[i] = "";
    });
    this.setState({
      formData,
    });
  };

  setValue = (key, val) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [key]: val,
      },
    });
  };

  render() {
    const { children } = this.props;
    // 判断类型，过滤掉无效item
    const renderChildren = [];
    // children.forEach((child) => {   // ERROR:Cannot read properties of undefined (reading 'forEach')
    React.Children.forEach(children, (child) => {
      if (child.type.displayName === "formItem") {
        const { name } = child.props;
        const Child = React.cloneElement(
          child,
          {
            key: name,
            handleChange: this.setValue,
            value: this.state.formData[name] || "",
          },
          child.props.children
        );
        renderChildren.push(Child);
      }
    });
    return renderChildren;
  }
}
Form.displayName = "form";

Form.whyDidYouRender = true;

export default Form;

export { FormItem, Input };
