import React, { useState } from 'react';
import 'antd/dist/antd.css';
import {
  Form,
  Input,
  Radio,
  Button,
  Checkbox,
} from 'antd';


const FormSizeDemo = (props) => {
  const [componentSize, setComponentSize] = useState('default');
  const [id, setId] = useState(0);
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const [phone, setPhone] = useState('');
  const [key, setKey] = useState("");

  const changeFullName = (event) => {
     setFullName(event.target.value);
  }
  const changeGender = (event) => {
     setGender(event.target.value)
  }
  const changeBirthday = (event) =>{
     setBirthday(event.target.value)
  }
  const changePhone = (event) => {
     setPhone(event.target.value);
  }
  const changeKey = (event) =>{
     setKey(event.target.value)
  }
  const getKey = (event) =>{
     event.preventDefault();
     props.remove(key);
  }

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const transferData = (event) => {
      
     event.preventDefault();
     const val = {
        id,
        fullName,
        gender,
        birthday,
        phone,
     }
     props.func(val);
     clearState();
  };
  const clearState = () => {
     setId(0);
     setFullName('');
     setGender('');
     setBirthday('');
     setPhone('');
     setKey('');

  }

  return (
    <>
      <h1>Student's Information</h1>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <Form.Item label="Student" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Full Name">
          <Input onChange={changeFullName}/>
        </Form.Item>
        <Form.Item label="Gender">
            <Input onChange={changeGender} placeholder="male or female"/>
        </Form.Item>
        
        <Form.Item label="Date of Birth">
            <Input onChange={changeBirthday} />
        </Form.Item>
        <Form.Item label="Phone Number">
            <Input onChange={changePhone}/>
         </Form.Item>
         <Form.Item label="Add Student" >
            <Button onClick={transferData}>Add</Button>
         </Form.Item>
         <Form.Item label="Enter Key to delete">
           <Input onChange={changeKey} />
        </Form.Item>
         <Form.Item label="Remove Student" >
            <Button onClick={getKey}>Remove</Button>
         </Form.Item>
      </Form>
    </>
  );
};

export default FormSizeDemo;