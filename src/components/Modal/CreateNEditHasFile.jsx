import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Select,
  Space,
  Switch,
  Upload,
} from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import request from "../../utils/request";
import TextArea from "antd/es/input/TextArea";

const CreateNEditHasFile = ({
  show,
  setShow,
  isEdit,
  setIsEdit,
  item,
  setItem,
  apicontext,
  apiEdit,
  apiCreate,
  dataForm,
  titleEdit,
  titleCreate,
  setKeyRender,
  fileName,
}) => {
  const [fileList, setFileList] = useState([]);
  const { RangePicker } = DatePicker;
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const formData = new FormData();
    // Append form fields
    Object.keys(values).forEach((key) => {
      if (key !== fileName) {
        // Don't append avatar as it's handled separately
        formData.append(key, values[key]);
      }
    });

    // Append files
    fileList.forEach((file) => {
      if (file.originFileObj) {
        formData.append(fileName, file.originFileObj);
      }
    });

    try {
      isEdit
        ? await request.post(apiEdit, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
        : await request.post(apiCreate, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
      apicontext.success({
        message: "Thành công",
        description: isEdit ? "Chỉnh sửa thành công" : "Thêm mới thành công",
      });
    } catch (error) {
      apicontext.error({
        message: "Thất bại",
        description: isEdit ? "Chỉnh sửa thất bại" : "Thêm mới thất bại!",
      });
    } finally {
      setShow(false);
      setIsEdit(false);
      setItem(undefined);
      setFileList([]);
      setKeyRender(Math.random());
      form.resetFields();
    }
  };

  const handleCancel = () => {
    setShow(false);
    setIsEdit(false);
    form.resetFields();
    setFileList([]);
  };

  //Start Upload img
  const handleChange = ({ fileList: newFileList }) => {
    // console.log("newFilist: ", newFileList);
    setFileList(newFileList);
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  //End Upload img

  // const fieldForm = [
  //   {
  //     type: "input",
  //     field: "name",
  //     label: "Tên người dùng",
  //     rule: [{ required: true, message: "Trường tên người dùng là bắt buộc" }],
  //   },
  //   {
  //     type: "inputNumber",
  //     field: "inputNumber",
  //     label: "Input Number",
  //     rule: [{ required: true, message: "Trường Input Number là bắt buộc" }],
  //   },
  //   {
  //     type: "input",
  //     field: "email",
  //     label: "Tên đăng nhập (Email)",
  //     rule: [{ required: true, message: "Trường email là bắt buộc" }],
  //     defaultValue: "1251212@gmail.com",
  //   },
  //   {
  //     type: "select",
  //     field: "role_name",
  //     label: "Vai trò",
  //     rule: [{ required: true, message: "Trường vai trò là bắt buộc" }],
  //     options: [
  //       {
  //         value: "admin",
  //         label: "Admin",
  //       },
  //       {
  //         value: "customer",
  //         label: "Customer",
  //       },
  //     ],
  //   },
  //   {
  //     type: "checkBox",
  //     field: "checkBox",
  //     label: "CheckBox",
  //     rule: [{ required: true, message: "Trường email là bắt buộc" }],
  //     options: ["Apple", "Pear", "Orange"],
  //     defaultValue: ["Apple"],
  //   },
  //   {
  //     type: "color",
  //     field: "color",
  //     label: "Color Picker",
  //     rule: [{ required: true, message: "Trường color là bắt buộc" }],
  //     size: "small",
  //     defaultValue: ["#1677ff"],
  //   },
  //   {
  //     type: "date",
  //     field: "Date",
  //     label: "Date Picker",
  //     rule: [{ required: true, message: "Trường Date là bắt buộc" }],
  //     defaultValue: "2015/01/01",
  //     dateFormat: "YYYY/MM/DD",
  //   },
  //   {
  //     type: "dateRange",
  //     field: "dateRange",
  //     label: "Date Ranger",
  //     rule: [{ required: true, message: "Trường Date Ranger là bắt buộc" }],
  //     defaultValue: ["2015/01/01", "2026/12/11"],
  //     dateFormat: "YYYY/MM/DD",
  //   },
  //   {
  //     type: "radio",
  //     field: "radio",
  //     label: "Radio",
  //     rule: [{ required: true, message: "Trường Radio là bắt buộc" }],

  //     options: [
  //       {
  //         value: 1,
  //         label: "A",
  //       },
  //       {
  //         value: 2,
  //         label: "B",
  //       },
  //       {
  //         value: 3,
  //         label: "C",
  //       },
  //       {
  //         value: 4,
  //         label: "D",
  //       },
  //     ],
  //   },
  //   {
  //     type: "switch",
  //     field: "switch",
  //     label: "Switch ",
  //     rule: [{ required: true, message: "Trường Switch là bắt buộc" }],
  //     defaultValue: false,
  //     // size: "small",
  //   },
  //   {
  //     type: "upload",
  //     field: "upload",
  //     label: "Upload ",
  //     rule: [{ required: true, message: "Trường Upload là bắt buộc" }],
  //     fileList: [
  //       {
  //         uid: "-1", // Đảm bảo giá trị uid là duy nhất cho mỗi tệp
  //         name: "example.jpg", // Tên tệp
  //         status: "done", // Trạng thái tệp
  //         url: `http://localhost:8000/storage/avatars/1722619400.jpg`, // Đường dẫn công khai
  //       },
  //     ],
  //     // size: "small",
  //   },
  // ];

  const renderInput = (item) => {
    if (item.type === "input") {
      return (
        <Input defaultValue={item.defaultValue} disabled={item.disabled} />
      );
    } else if (item.type === "inputNumber") {
      return (
        <InputNumber
          min={item?.min}
          max={item?.max}
          defaultValue={item?.defaultValue}
          disabled={item.disabled}
          className="w-full"
        />
      );
    } else if (item.type === "textArea") {
      return (
        <TextArea
          placeholder={item.placeholder}
          allowClear
          style={{ height: 120, resize: "none" }}
        />
      );
    } else if (item.type === "checkBox") {
      return (
        <>
          <Checkbox.Group options={item.options} />
        </>
      );
    } else if (item.type === "color") {
      return (
        <ColorPicker
          showText
          defaultValue={item.defaultValue}
          disabled={item.disabled}
          size={item.size}
        />
      );
    } else if (item.type === "date") {
      return (
        <DatePicker
          className="w-full"
          defaultValue={dayjs(item.defaultValue, item.dateFormat)}
          format={item.dateFormat}
          disabled={item.disabled}
        />
      );
    } else if (item.type === "dateRange") {
      return (
        <RangePicker
          disabled={item.disabled}
          defaultValue={item.defaultValue.map((x) => dayjs(x, item.dateFormat))}
          format={"YYYY/MM/DD"}
        />
      );
    } else if (item.type === "radio") {
      return (
        <Radio.Group value={item.defaultValue}>
          {item.options.map((x) => (
            <Radio value={x.value}>{x.label}</Radio>
          ))}
        </Radio.Group>
      );
    } else if (item.type === "select") {
      return (
        <Select
          showSearch
          placeholder={item.placeholder}
          optionFilterProp="label"
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          mode={item.mode}
          disabled={item.disabled}
          //option la 1 cap array value-label
          options={item.options}
        />
      );
    } else if (item.type === "switch") {
      return (
        <Switch
          defaultChecked={item.defaultValue}
          disabled={item.disabled}
          size={item.size}
        />
        // <Switch size="small" defaultChecked />
      );
    } else if (item.type === "upload") {
      return (
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={handleChange}
          customRequest={({ file, onSuccess }) => {
            setFileList([file]); // Update fileList with the new file
            onSuccess(file);
          }}
        >
          {fileList?.length >= 1 ? null : uploadButton}
        </Upload>
      );
    }
  };
  useEffect(() => {
    item && isEdit && form.setFieldsValue(item);
    isEdit && item
      ? setFileList([
          {
            uid: -1, // Đảm bảo giá trị uid là duy nhất cho mỗi tệp
            name: "example.jpg", // Tên tệp
            status: "done", // Trạng thái tệp
            url: `http://localhost:8000${item?.image}`, // Đường dẫn công khai
          },
        ])
      : setFileList([]);
  }, [item, isEdit]);

  return (
    <>
      <Modal
        title={isEdit ? titleEdit : titleCreate}
        open={show}
        onCancel={handleCancel}
        footer={null} // Using null instead of an empty array
      >
        <Form
          form={form}
          onFinish={onFinish}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
        >
          {dataForm?.map((item) => {
            return (
              <Form.Item
                initialValue={item.initialValue}
                name={item.field}
                label={item.label}
                rules={item.rule}
              >
                {renderInput(item)}
              </Form.Item>
            );
          })}

          <Form.Item className="text-end">
            <Space>
              <Button onClick={handleCancel}>Hủy</Button>
              <Button htmlType="submit" type="primary">
                Đồng ý
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateNEditHasFile;
