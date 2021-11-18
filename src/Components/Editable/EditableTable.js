import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import jsonData from '../data/data.json'
import FormSizeDemo from '../InputInfo/FormSizeDemo'
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';




const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EditableTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(jsonData);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      fullName: '',
      gender: '',
      birthday: '',
      phone: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const deleteRows = (dataStudent) => {
      const updateStudentData = [...data];
      for(let x of updateStudentData){
            updateStudentData.pop(x);
            setData(updateStudentData)
         }
      }
   const addRows = (dataStudent) => {
      const totalStudents = data.length;
      dataStudent.id = totalStudents + 1;
      const updatedStudentData = [...data];
      updatedStudentData.push(dataStudent);
      setData(updatedStudentData)
   }
   const removeRows = (dataStudent) => {
      const updateStudentData = [...data];
      for (let x of updateStudentData){
         if(String(x.id) === dataStudent){
            updateStudentData.pop(x);
            setData(updateStudentData)
         }
      } 
   }
  const columns = [
     {
      title: 'Id', 
      dataIndex: 'id',
      width: '15%',
      editable: true,
     },
    {
      
      title: 'Full Name',
      dataIndex: 'fullName',
      width: '15%',
      editable: true,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      width: '15%',
      editable: true,
    },
    {
      title: 'birthday',
      dataIndex: 'birthday',
      width: '15%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      with: '15%',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
    {
       title: 'Delete',
      //  render: () =>{
      //     return (
      //    <Typography.Link  onClick={deleteRows}>
      //       Delete
      //    </Typography.Link>
      //     )
      //  }
       render: (_, record) =>
       data.length >= 1 ? (
         <Popconfirm title="Sure to delete?" onConfirm={deleteRows}>
           <a>Delete</a>
         </Popconfirm>
       ) : null,
      },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
     <>
         <FormSizeDemo func={addRows} remove={removeRows}/>
         <Form form={form} component={false}>
            <Table
            components={{
               body: {
                  cell: EditableCell,
               },
            }}
            bordered
            dataSource={data}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{
               onChange: cancel,
            }}
            />
         </Form>
      </>
  );
};
export default EditableTable;
